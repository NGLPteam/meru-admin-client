import { ComponentType } from "react";
import {
  PreloadedQuery,
  GraphQLTaggedNode,
  // graphql,
  // useLazyLoadQuery,
} from "react-relay";
import { OperationType } from "relay-runtime";
// import { useSearchParams } from "next/navigation";
// import { QueryTransitionWrapper } from "@wdp/lib/api/components";
import { ModelListProps } from "components/composed/model/ModelList";
import { useRouteSlug } from "hooks";
import SubmissionLayout from "components/composed/submission/SubmissionLayout";
import ErrorPage from "next/error";
// import { LoadingCircle } from "components/atomic";
// import ModelListPageSkeleton from "components/composed/model/ModelListPageSkeleton";
// import type { LayoutSubmissionQuery as LayoutQuery } from "@/relay/LayoutSubmissionQuery.graphql";

export default function Layout<T extends OperationType>(props: Props<T>) {
  const slug = useRouteSlug() as string;

  if (!slug) return <ErrorPage statusCode={404} />;

  // TODO: Uncomment when real submission API is available
  // const queryVars = useBaseListQueryVars();
  // const searchParams = useSearchParams();
  //
  // const { item } = useLazyLoadQuery<LayoutQuery>(
  //   submissionQuery,
  //   { slug },
  //   { fetchPolicy: "store-or-network" },
  // );
  //
  // if (!item) return <ErrorPage statusCode={404} />;
  //
  // const searchVars: Record<string, string> = {};
  // searchParams.forEach((value, key) => (searchVars[key] = value));

  const { PageComponent, pageComponentProps } = props;

  return (
    <SubmissionLayout slug={slug}>
      <PageComponent {...pageComponentProps} />
    </SubmissionLayout>
  );

  // TODO: Uncomment when real submission API is available
  // return (
  //   <SubmissionLayout data={item} {...pageComponentProps}>
  //     <QueryTransitionWrapper<T>
  //       query={query}
  //       variables={{
  //         ...defaultQueryVars,
  //         ...searchVars,
  //         ...queryVars,
  //         slug,
  //       }}
  //       loadingFallback={<LoadingCircle />}
  //       refetchTags={refetchTags}
  //     >
  //       {({ queryRef }) =>
  //         queryRef ? (
  //           <PageComponent {...pageComponentProps} queryRef={queryRef} />
  //         ) : showLoadingCircle ? (
  //           <LoadingCircle className="l-page-loading" />
  //         ) : (
  //           <ModelListPageSkeleton
  //             modelName={modelName}
  //             headerStyle="secondary"
  //             hideHeader
  //           />
  //         )
  //       }
  //     </QueryTransitionWrapper>
  //   </SubmissionLayout>
  // );
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

// TODO: Uncomment when real submission API is available
// const submissionQuery = graphql`
//   query LayoutSubmissionQuery($slug: Slug!) {
//     item(slug: $slug) {
//       ...SubmissionLayoutFragment
//     }
//   }
// `;
