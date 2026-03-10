import { ComponentType } from "react";
import {
  PreloadedQuery,
  GraphQLTaggedNode,
  useLazyLoadQuery,
} from "react-relay";
import { OperationType } from "relay-runtime";
import { QueryTransitionWrapper } from "@wdp/lib/api/components";
import { ModelNames } from "helpers";
import SubmissionLayout from "components/composed/submission/SubmissionLayout";
import { useRouteSlug } from "hooks";
import ErrorPage from "next/error";
import { LoadingCircle } from "components/atomic";
import ModelListPageSkeleton from "components/composed/model/ModelListPageSkeleton";
import type { LayoutSubmissionQuery as LayoutQuery } from "@/relay/LayoutSubmissionQuery.graphql";
import { submissionQuery } from "../../my-submissions/[slug]/_layout";

export default function Layout<T extends OperationType>(props: Props<T>) {
  const slug = useRouteSlug() as string;

  const { submission } = useLazyLoadQuery<LayoutQuery>(
    submissionQuery,
    { slug },
    { fetchPolicy: "store-or-network" },
  );

  if (!slug || !submission) return <ErrorPage statusCode={404} />;

  const {
    PageComponent,
    pageComponentProps,
    query,
    refetchTags,
    showLoadingCircle,
    modelName,
  } = props;

  if (!query) {
    return (
      <SubmissionLayout data={submission}>
        <PageComponent {...pageComponentProps} />
      </SubmissionLayout>
    );
  }

  return (
    <SubmissionLayout data={submission}>
      <QueryTransitionWrapper<T>
        query={query}
        variables={{ slug }}
        loadingFallback={<LoadingCircle />}
        refetchTags={refetchTags}
      >
        {({ queryRef }) =>
          queryRef ? (
            <PageComponent {...pageComponentProps} queryRef={queryRef} />
          ) : showLoadingCircle ? (
            <LoadingCircle className="l-page-loading" />
          ) : (
            <ModelListPageSkeleton
              modelName={modelName}
              headerStyle="secondary"
              hideHeader
            />
          )
        }
      </QueryTransitionWrapper>
    </SubmissionLayout>
  );
}

type Props<T extends OperationType> = {
  pageComponentProps: PageProps<T>;
  PageComponent: ComponentType<PageProps<T>>;
  query?: GraphQLTaggedNode | null;
  refetchTags?: string[];
  showLoadingCircle?: boolean;
  modelName?: Lowercase<ModelNames>;
  defaultQueryVars?: Record<string, string>;
};

type PageProps<T extends OperationType> = {
  queryRef?: PreloadedQuery<T>;
};
