import { ComponentType } from "react";
import {
  PreloadedQuery,
  GraphQLTaggedNode,
  useLazyLoadQuery,
  graphql,
} from "react-relay";
import { OperationType } from "relay-runtime";
import { QueryTransitionWrapper } from "@wdp/lib/api/components";
import { ModelNames } from "helpers";
import SubmissionLayout from "components/composed/submission/SubmissionLayout";
import { useRouteSlug } from "hooks";
import ErrorPage from "next/error";
import { LoadingCircle } from "components/atomic";
import ModelListPageSkeleton from "components/composed/model/ModelListPageSkeleton";
import type {
  LayoutManageSubmissionQuery as LayoutQuery,
  LayoutManageSubmissionQuery$data,
} from "@/relay/LayoutManageSubmissionQuery.graphql";

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
    useIdVar,
  } = props;

  if (!query) {
    return (
      <SubmissionLayout data={submission} mode="review">
        <PageComponent {...pageComponentProps} />
      </SubmissionLayout>
    );
  }

  const variables = useIdVar ? { submissionIds: [submission.id] } : { slug };

  return (
    <SubmissionLayout data={submission} mode="review">
      <QueryTransitionWrapper<T>
        query={query}
        variables={variables}
        loadingFallback={<LoadingCircle />}
        refetchTags={refetchTags}
      >
        {({ queryRef }) =>
          queryRef ? (
            <PageComponent
              {...pageComponentProps}
              submission={submission}
              queryRef={queryRef}
            />
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
  useIdVar?: boolean;
};

type PageProps<T extends OperationType> = {
  queryRef?: PreloadedQuery<T>;
  submission?: LayoutManageSubmissionQuery$data["submission"];
};

export const submissionQuery = graphql`
  query LayoutManageSubmissionQuery($slug: Slug!) {
    submission(slug: $slug) {
      id
      currentStatus {
        mutableState
      }
      canRequestReview {
        value
      }
      ...SubmissionLayoutFragment
    }
  }
`;
