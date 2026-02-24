import { ComponentType } from "react";
import { PreloadedQuery, GraphQLTaggedNode } from "react-relay";
import { OperationType } from "relay-runtime";
import { ModelListProps } from "components/composed/model/ModelList";
import SubmissionLayout from "components/composed/submission/SubmissionLayout";

export default function Layout<T extends OperationType>(props: Props<T>) {
  const { PageComponent, pageComponentProps } = props;

  return (
    <SubmissionLayout>
      <PageComponent {...pageComponentProps} />
    </SubmissionLayout>
  );
}

type Props<T extends OperationType> = {
  pageComponentProps: PageProps<T>;
  PageComponent: ComponentType<PageProps<T>>;
  query?: GraphQLTaggedNode | null;
  refetchTags?: string[];
  showLoadingCircle?: boolean;
  modelName?: ModelListProps<any, any>["modelName"]; // eslint-disable-line @typescript-eslint/no-explicit-any
  defaultQueryVars?: Record<string, string>;
};

type PageProps<T extends OperationType> = {
  queryRef?: PreloadedQuery<T>;
};
