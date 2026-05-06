import React, { useEffect, useMemo } from "react";
import { useFragment, graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import { useForm, useWatch, FormProvider } from "react-hook-form";
import { useNotify } from "hooks";
import { useLoadingMutation, useSchemaContext } from "components/api/hooks";
import type {
  SchemaInstanceProviderApplyMutation,
  SchemaInstanceProviderApplyMutation$data as MutationResponse,
  ApplySchemaPropertiesInput,
} from "@/relay/SchemaInstanceProviderApplyMutation.graphql";
import type { SchemaInstanceProviderFragment$key } from "@/relay/SchemaInstanceProviderFragment.graphql";
import Actions from "./Actions";
import Context from "./Context";
import { convertSchemaErrors } from "./convertSchemaErrors";
import type { OnSuccessCallback } from "./types";
import type { SchemaContextState } from "components/api/hooks/types";
import type { Control } from "react-hook-form";

type SchemaErrors = NonNullable<
  MutationResponse["applySchemaProperties"]
>["schemaErrors"];

export default function SchemaInstanceProvider({
  successNotification,
  failureNotification,
  ...props
}: Props) {
  const context = useExtractContext(props);
  const notify = useNotify();
  const { t } = useTranslation();

  // eslint-disable-next-line prettier/prettier
  const [apply] = useLoadingMutation<SchemaInstanceProviderApplyMutation>(
    applyMutation
  );

  const form = useForm({
    defaultValues: context.fieldValues,
    mode: "all",
  });

  const { entityId } = context;

  const { onSuccess, onSaveAndClose, onCancel } = props;

  const { handleSubmit, setError } = form;

  const onSubmit = useMemo(() => {
    return handleSubmit(async function (values, event) {
      if (!entityId) {
        /* eslint-disable no-console */
        console.warn("No entity ID to apply properties to");

        return null;
      }

      const input: ApplySchemaPropertiesInput = {
        entityId,
        propertyValues: values,
      };

      apply({
        variables: { input },
        onCompleted: (response) => {
          if (response && response.applySchemaProperties) {
            const { entity, schemaErrors } = response.applySchemaProperties;

            if (entity) {
              // First, notify
              if (successNotification) {
                notify.success(t(successNotification));
              }

              console.dir(entity);

              if (typeof onSuccess === "function") {
                onSuccess({ values });
              }

              if (
                event?.target.dataset.close &&
                typeof onSaveAndClose === "function"
              ) {
                onSaveAndClose();
              }
            } else if (schemaErrors.length > 0) {
              /* eslint-disable no-console */
              console.error(schemaErrors);

              if (failureNotification) {
                notify.error(t(failureNotification));
              }

              const errors = convertSchemaErrors<SchemaErrors>(schemaErrors);

              for (const { path, error } of errors) {
                setError(path, error);
              }
            }
          }
        },
      });
    });
  }, [
    apply,
    entityId,
    handleSubmit,
    onSuccess,
    onSaveAndClose,
    setError,
    successNotification,
    failureNotification,
    notify,
    t,
  ]);

  return (
    <Context.Provider value={context}>
      <form onSubmit={onSubmit}>
        <FormProvider {...form}>
          {props.watchInConsole && <Watcher control={form.control} />}
          {props.children}
          <Actions
            onCancel={onCancel}
            onSaveAndClose={onSaveAndClose ? onSubmit : undefined}
          />
        </FormProvider>
      </form>
    </Context.Provider>
  );
}

interface Props {
  children: React.ReactNode;
  context: SchemaInstanceProviderFragment$key;
  onSuccess?: OnSuccessCallback;
  onSaveAndClose?: () => void;
  onCancel?: () => void;
  /**
   * If set, the form will populate a toast notification with this message on success. The
   * value will be passed through localization first.
   */
  successNotification?: string;
  /**
   * If set, the form will populate a toast notification with this message on failure. The
   * value will be passed through localization first.
   */
  failureNotification?: string;
  /**
   * Setting this to true will activate a monitor that will log changes to the form
   * in the browser console.
   */
  watchInConsole?: boolean;
}

function useExtractContext(props: Props): SchemaContextState {
  const raw = useFragment(fragment, props.context);

  return useSchemaContext(raw);
}

function Watcher({ control }: { control: Control }) {
  const formState = useWatch({ control });

  useEffect(
    function watchValues() {
      /* eslint-disable no-console */
      console.dir({ value: formState });
    },
    [formState],
  );

  return null;
}

const fragment = graphql`
  fragment SchemaInstanceProviderFragment on SchemaInstanceContext {
    ...useSchemaContextFragment
  }
`;

const applyMutation = graphql`
  mutation SchemaInstanceProviderApplyMutation(
    $input: ApplySchemaPropertiesInput!
  ) {
    applySchemaProperties(input: $input) {
      entity {
        ... on Node {
          id
        }
      }

      schemaErrors {
        hint
        message
        metadata
        path
      }
    }
  }
`;
