import { useCallback, type CSSProperties } from "react";
import { useRouter } from "next/router";
import { graphql } from "react-relay";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import MutationForm, {
  useRenderForm,
  useToVariables,
  Forms,
  useOnSuccess,
} from "components/api/MutationForm";
import { ButtonControl } from "components/atomic";
import { Fieldset } from "components/forms";
import { RouteHelper } from "routes";
import { useRouteSlug } from "hooks";
import useIsMobile from "hooks/useIsMobile";
import {
  MOCK_SUBMISSIONS,
  type SubmissionNode,
} from "components/composed/submission/SubmissionList/mockData";
import type { SchemaSelectFragment$key } from "@/relay/SchemaSelectFragment.graphql";
import type {
  SubmissionCreateFormMutation,
  CreateItemInput,
} from "@/relay/SubmissionCreateFormMutation.graphql";
import type { Control, UseFormRegister } from "react-hook-form";

type Fields = Omit<CreateItemInput, "clientMutationId"> & {
  contributors: { contributorId: string }[];
  files: { file: string; caption: string }[];
};

type Props = {
  data: SchemaSelectFragment$key;
};

export default function SubmissionEditForm({ data }: Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const slug = useRouteSlug();

  const routePrefix = router.pathname.startsWith("/my-submissions")
    ? "my-submissions"
    : "submissions";
  const detailRoute = `${routePrefix}.detail.details`;

  const submission: SubmissionNode | undefined = MOCK_SUBMISSIONS.find(
    (s) => s.slug === slug,
  );

  const redirectToDetail = useCallback(() => {
    const route = RouteHelper.findRouteByName(detailRoute);
    if (route) {
      router.push({
        pathname: route.path,
        query: { slug },
      });
    }
  }, [router, detailRoute, slug]);

  const onSuccess = useOnSuccess<SubmissionCreateFormMutation, Fields>(() => {
    redirectToDetail();
  }, [redirectToDetail]);

  const toVariables = useToVariables<SubmissionCreateFormMutation, Fields>(
    (data) => ({
      input: {
        title: data.title,
        subtitle: data.subtitle,
        parentId: data.parentId,
        schemaVersionSlug: data.schemaVersionSlug,
        visibility: data.visibility,
        summary: data.summary,
        thumbnail: data.thumbnail,
        heroImage: data.heroImage,
        published: data.published,
      },
    }),
    [],
  );

  const defaultValues = {
    title: submission?.title ?? "",
    visibility: "VISIBLE" as Fields["visibility"],
    contributors: [] as Fields["contributors"],
    files: [] as Fields["files"],
  };

  const renderForm = useRenderForm<Fields>(
    ({ form: { register, control } }) => (
      <Forms.Grid>
        <Forms.Input
          label="forms.fields.title"
          required
          isWide
          {...register("title")}
        />
        <Forms.Input
          label="forms.fields.subtitle"
          isWide
          {...register("subtitle")}
        />
        <Forms.CollectionTypeahead
          control={control}
          name="parentId"
          label="forms.fields.collection"
          required
        />
        <Forms.SchemaSelect
          label="forms.schema.label"
          data={data}
          required
          {...register("schemaVersionSlug")}
        />
        <div
          className="t-copy-sm a-color-light"
          style={
            {
              flexBasis: "var(--form-grid-item-width-wide)",
              paddingBlock: "var(--form-grid-row-gap)",
            } as CSSProperties
          }
        >
          {t("forms.fields.schema_fields_placeholder")}
        </div>
        <Forms.FileImageUpload
          label="forms.fields.thumbnail"
          name="thumbnail"
        />
        <Forms.FileImageUpload
          label="forms.fields.hero_image"
          name="heroImage"
          description="forms.fields.hero_image_description"
        />
        <Forms.Textarea
          label="forms.fields.summary"
          {...register("summary")}
          isWide
        />
        <ContributorsFieldArray control={control} />
        <FilesFieldArray control={control} register={register} />
      </Forms.Grid>
    ),
    [],
  );

  return (
    <MutationForm<SubmissionCreateFormMutation, Fields>
      mutation={mutation}
      onSuccess={onSuccess}
      onCancel={redirectToDetail}
      successNotification="messages.update.submission_success"
      name="createItem"
      refetchTags={["items"]}
      toVariables={toVariables}
      defaultValues={defaultValues}
    >
      {renderForm}
    </MutationForm>
  );
}

function ContributorsFieldArray({ control }: { control: Control<Fields> }) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contributors",
  });

  return (
    <Fieldset label={t("glossary.contributor_other")}>
      {fields.map((field, index) => (
        <Fieldset.Fields key={field.id}>
          <Fieldset.Field>
            <Forms.ContributorTypeahead
              control={control}
              name={`contributors.${index}.contributorId`}
              label="forms.fields.contributor"
            />
          </Fieldset.Field>
          <Fieldset.Actions>
            <ButtonControl
              type="button"
              aria-label={t("common.delete")}
              onClick={() => remove(index)}
              icon="delete"
              size={!isMobile ? "large" : undefined}
            >
              {isMobile ? t("common.delete") : null}
            </ButtonControl>
          </Fieldset.Actions>
        </Fieldset.Fields>
      ))}
      <ButtonControl
        type="button"
        onClick={() => append({ contributorId: "" })}
        icon="plus"
        size={!isMobile ? "large" : undefined}
      >
        {t("actions.add.contributor_row")}
      </ButtonControl>
    </Fieldset>
  );
}

function FilesFieldArray({
  control,
  register,
}: {
  control: Control<Fields>;
  register: UseFormRegister<Fields>;
}) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "files",
  });

  return (
    <Fieldset label={t("glossary.file_other")}>
      {fields.map((field, index) => (
        <Fieldset.Fields key={field.id}>
          <Fieldset.Field>
            <Forms.FileImageUpload
              label="forms.fields.attachment"
              name={`files.${index}.file`}
            />
          </Fieldset.Field>
          <Fieldset.Field>
            <Forms.Input
              label="forms.fields.caption"
              {...register(`files.${index}.caption`)}
            />
          </Fieldset.Field>
          <Fieldset.Actions>
            <ButtonControl
              type="button"
              aria-label={t("common.delete")}
              onClick={() => remove(index)}
              icon="delete"
              size={!isMobile ? "large" : undefined}
            >
              {isMobile ? t("common.delete") : null}
            </ButtonControl>
          </Fieldset.Actions>
        </Fieldset.Fields>
      ))}
      <ButtonControl
        type="button"
        onClick={() => append({ file: "", caption: "" })}
        icon="plus"
        size={!isMobile ? "large" : undefined}
      >
        {t("actions.add.file_row")}
      </ButtonControl>
    </Fieldset>
  );
}

const mutation = graphql`
  mutation SubmissionEditFormMutation($input: CreateItemInput!) {
    createItem(input: $input) {
      item {
        title
        slug
      }
      ...MutationForm_mutationErrors
    }
  }
`;
