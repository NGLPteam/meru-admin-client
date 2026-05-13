import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { GraphQLTaggedNode, readInlineData } from "relay-runtime";
import { graphql } from "react-relay";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";
import { useLoadingMutation } from "components/api/hooks";
import { useNotify, usePageContext } from "hooks";
import {
  DestroyAnnouncementInput,
  RevokeAccessInput,
} from "types/graphql-schema";
import type {
  DestroyCommunityInput,
  useDestroyerDestroyCommunityMutation,
} from "@/relay/useDestroyerDestroyCommunityMutation.graphql";
import type {
  DestroyContributorInput,
  useDestroyerDestroyContributorMutation,
} from "@/relay/useDestroyerDestroyContributorMutation.graphql";
import type {
  DestroyCollectionInput,
  useDestroyerDestroyCollectionMutation,
} from "@/relay/useDestroyerDestroyCollectionMutation.graphql";
import type {
  DestroyItemInput,
  useDestroyerDestroyItemMutation,
} from "@/relay/useDestroyerDestroyItemMutation.graphql";
import type {
  DestroyContributionInput,
  useDestroyerDestroyContributionMutation,
} from "@/relay/useDestroyerDestroyContributionMutation.graphql";
import type {
  DestroyOrderingInput,
  useDestroyerDestroyOrderingMutation,
} from "@/relay/useDestroyerDestroyOrderingMutation.graphql";
import type {
  DestroyEntityLinkInput,
  useDestroyerDestroyEntityLinkMutation,
} from "@/relay/useDestroyerDestroyEntityLinkMutation.graphql";
import type {
  DestroyPageInput,
  useDestroyerDestroyPageMutation,
} from "@/relay/useDestroyerDestroyPageMutation.graphql";
import type {
  PermalinkDestroyInput,
  useDestroyerDestroyPermalinkMutation,
} from "@/relay/useDestroyerDestroyPermalinkMutation.graphql";
import type {
  HarvestSourceDestroyInput,
  useDestroyerDestroyHarvestSourceMutation,
} from "@/relay/useDestroyerDestroyHarvestSourceMutation.graphql";
import type {
  HarvestMappingDestroyInput,
  useDestroyerDestroyHarvestMappingMutation,
} from "@/relay/useDestroyerDestroyHarvestMappingMutation.graphql";
import type {
  HarvestMetadataMappingDestroyInput,
  useDestroyerDestroyHarvestMetadataMappingMutation,
} from "@/relay/useDestroyerDestroyHarvestMetadataMappingMutation.graphql";
import type {
  SubmissionTargetReviewerDestroyInput,
  useDestroyerDestroySubmissionTargetReviewerMutation,
} from "@/relay/useDestroyerDestroySubmissionTargetReviewerMutation.graphql";
import type { useDestroyerFragment$key } from "@/relay/useDestroyerFragment.graphql";
import { useDestroyerRevokeAccessMutation } from "@/relay/useDestroyerRevokeAccessMutation.graphql";
import {
  DestroyAssetInput,
  useDestroyerDestroyAssetMutation,
} from "@/relay/useDestroyerDestroyAssetMutation.graphql";
import { useDestroyerDestroyAnnouncementMutation } from "@/relay/useDestroyerDestroyAnnouncementMutation.graphql";
import {
  EntityPurgeInput,
  useDestroyerEntityPurgeMutation,
} from "@/relay/useDestroyerEntityPurgeMutation.graphql";

type LinkProps = React.ComponentProps<typeof Link>;
type RedirectPath = string | LinkProps["href"];

export function useDestroyer() {
  const notify = useNotify();
  const { t } = useTranslation();
  const router = useRouter();

  const { setTriggeredRefetchTags } = usePageContext();

  const redirect = useCallback(
    (redirectPath?: RedirectPath) => {
      if (redirectPath) router.replace(redirectPath);
    },
    [router],
  );

  const handleResponse = useCallback(
    (
      data: useDestroyerFragment$key | null | undefined,
      name: string,
      refetchTags: string[],
      redirectPath?: RedirectPath,
    ) => {
      if (!data) return;
      const results = readInlineData<useDestroyerFragment$key>(
        destroyFragment as GraphQLTaggedNode,
        data,
      );
      if (results.revoked) {
        notify.success(t("messages.revoke.success", { name }));
        setTriggeredRefetchTags(refetchTags);
        redirect(redirectPath);
      } else if (results.disabled) {
        notify.success(t("messages.disable.success", { name }));
        setTriggeredRefetchTags(refetchTags);
        redirect(redirectPath);
      } else if (results.destroyed) {
        notify.success(t("messages.delete.success", { name }));
        setTriggeredRefetchTags(refetchTags);
        redirect(redirectPath);
      } else if (results.destroyedId) {
        notify.success(t("messages.delete.purge_success", { name }));
        redirect(redirectPath);
      } else if (results.globalErrors && results.globalErrors.length > 0) {
        notify.mutationGlobalError(results.globalErrors);
      } else if ("destroyed" in results && results.destroyed === null) {
        notify.error(t("messages.delete.failure", { name }));
      }
    },
    [notify, t, setTriggeredRefetchTags, redirect],
  );

  /* Destroy a collection */
  const [commitDestroyCollection, collectionInFlight] =
    useLoadingMutation<useDestroyerDestroyCollectionMutation>(
      destroyCollectionMutation,
    );

  const collection = useCallback(
    async (
      input: DestroyCollectionInput,
      label: string,
      redirectPath?: RedirectPath,
    ) => {
      if (collectionInFlight) return;

      const loadingToast = toast.loading(
        t(`messages.delete.loading`, { name: label }),
      );

      commitDestroyCollection({
        variables: { input },
        onCompleted: (response) => {
          toast.dismiss(loadingToast);
          handleResponse(
            response.destroyCollection,
            label,
            ["collections"],
            redirectPath,
          );
        },
      });
    },
    [commitDestroyCollection, handleResponse, collectionInFlight, t],
  );

  /* Destroy a item */
  const [commitDestroyItem, itemInFlight] =
    useLoadingMutation<useDestroyerDestroyItemMutation>(destroyItemMutation);

  const item = useCallback(
    async (
      input: DestroyItemInput,
      label: string,
      redirectPath?: RedirectPath,
    ) => {
      if (itemInFlight) return;

      const loadingToast = toast.loading(
        t(`messages.delete.loading`, { name: label }),
      );

      commitDestroyItem({
        variables: { input },
        onCompleted: (response) => {
          toast.dismiss(loadingToast);
          handleResponse(response.destroyItem, label, ["items"], redirectPath);
        },
      });
    },
    [commitDestroyItem, handleResponse, itemInFlight, t],
  );

  /* Destroy a contribution */
  const [commitDestroyContribution, contributionInFlight] =
    useLoadingMutation<useDestroyerDestroyContributionMutation>(
      destroyContributionMutation,
    );

  const contribution = useCallback(
    async (input: DestroyContributionInput, label: string) => {
      if (contributionInFlight) return;

      const loadingToast = toast.loading(
        t(`messages.delete.loading`, { name: label }),
      );

      commitDestroyContribution({
        variables: { input },
        onCompleted: (response) => {
          toast.dismiss(loadingToast);
          handleResponse(response.destroyContribution, label, [
            "contributions",
          ]);
        },
      });
    },
    [commitDestroyContribution, handleResponse, contributionInFlight, t],
  );

  /* Destroy a community */
  const [commitDestroyCommunity, communityInFlight] =
    useLoadingMutation<useDestroyerDestroyCommunityMutation>(
      destroyCommunityMutation,
    );

  const community = useCallback(
    async (
      input: DestroyCommunityInput,
      label: string,
      redirectPath?: RedirectPath,
    ) => {
      if (communityInFlight) return;

      const loadingToast = toast.loading(
        t(`messages.delete.loading`, { name: label }),
      );

      commitDestroyCommunity({
        variables: { input },
        onCompleted: (response) => {
          toast.dismiss(loadingToast);
          handleResponse(
            response.destroyCommunity,
            label,
            ["communities"],
            redirectPath,
          );
        },
      });
    },
    [commitDestroyCommunity, handleResponse, communityInFlight, t],
  );

  /* Destroy a contributor */
  const [commitDestroyContributor, contributorInFlight] =
    useLoadingMutation<useDestroyerDestroyContributorMutation>(
      destroyContributorMutation,
    );

  const contributor = useCallback(
    async (input: DestroyContributorInput, label: string) => {
      if (contributorInFlight) return;

      const loadingToast = toast.loading(
        t(`messages.delete.loading`, { name: label }),
      );

      commitDestroyContributor({
        variables: { input },
        onCompleted: (response) => {
          toast.dismiss(loadingToast);
          handleResponse(response.destroyContributor, label, ["contributors"]);
        },
      });
    },
    [commitDestroyContributor, handleResponse, contributorInFlight, t],
  );

  /* Destroy a file */
  const [commitDestroyAsset, fileInFlight] =
    useLoadingMutation<useDestroyerDestroyAssetMutation>(destroyFileMutation);

  const file = useCallback(
    async (input: DestroyAssetInput, label: string) => {
      if (fileInFlight) return;

      const loadingToast = toast.loading(
        t(`messages.delete.loading`, { name: label }),
      );

      commitDestroyAsset({
        variables: { input },
        onCompleted: (response) => {
          toast.dismiss(loadingToast);
          handleResponse(response.destroyAsset, label, ["assets"]);
        },
      });
    },
    [commitDestroyAsset, handleResponse, fileInFlight, t],
  );

  /* Disable or destroy an ordering */
  const [commitDisableOrDestroyOrdering, orderingInFlight] =
    useLoadingMutation<useDestroyerDestroyOrderingMutation>(
      destroyOrderingMutation,
    );

  const ordering = useCallback(
    async (input: DestroyOrderingInput, label: string) => {
      if (orderingInFlight) return;

      const loadingToast = toast.loading(
        t(`messages.delete.loading`, { name: label }),
      );

      commitDisableOrDestroyOrdering({
        variables: { input },
        onCompleted: (response) => {
          toast.dismiss(loadingToast);
          handleResponse(response.destroyOrdering, label, ["orderings"]);
        },
      });
    },
    [commitDisableOrDestroyOrdering, handleResponse, orderingInFlight, t],
  );

  /* Revoke access */
  const [commitRevokeAccess, accessInFlight] =
    useLoadingMutation<useDestroyerRevokeAccessMutation>(revokeAccessMutation);

  const access = useCallback(
    async (input: RevokeAccessInput, label: string) => {
      if (accessInFlight) return;

      const loadingToast = toast.loading(
        t(`messages.revoke.loading`, { name: label }),
      );

      commitRevokeAccess({
        variables: { input },
        onCompleted: (response) => {
          toast.dismiss(loadingToast);
          handleResponse(response.revokeAccess, label, ["allAccessGrants"]);
        },
      });
    },
    [commitRevokeAccess, handleResponse, accessInFlight, t],
  );

  /* Destroy a link */
  const [commitDestroyLink, linkInFlight] =
    useLoadingMutation<useDestroyerDestroyEntityLinkMutation>(
      destroyEntityLinkMutation,
    );

  const link = useCallback(
    async (input: DestroyEntityLinkInput, label: string) => {
      if (linkInFlight) return;

      const loadingToast = toast.loading(
        t(`messages.delete.loading`, { name: label }),
      );

      commitDestroyLink({
        variables: { input },
        onCompleted: (response) => {
          toast.dismiss(loadingToast);
          handleResponse(response.destroyEntityLink, label, ["links"]);
        },
      });
    },
    [commitDestroyLink, handleResponse, linkInFlight, t],
  );

  /* Destroy a page */
  const [commitDestroyPage, pageInFlight] =
    useLoadingMutation<useDestroyerDestroyPageMutation>(destroyPageMutation);

  const page = useCallback(
    async (input: DestroyPageInput, label: string) => {
      if (pageInFlight) return;

      const loadingToast = toast.loading(
        t(`messages.delete.loading`, { name: label }),
      );

      commitDestroyPage({
        variables: { input },
        onCompleted: (response) => {
          toast.dismiss(loadingToast);
          handleResponse(response.destroyPage, label, ["pages"]);
        },
      });
    },
    [commitDestroyPage, handleResponse, pageInFlight, t],
  );

  /* Destroy a permalink */
  const [commitDestroyPermalink, permalinkInFlight] =
    useLoadingMutation<useDestroyerDestroyPermalinkMutation>(
      destroyPermalinkMutation,
    );

  const permalink = useCallback(
    async (input: PermalinkDestroyInput, label: string) => {
      if (permalinkInFlight) return;

      const loadingToast = toast.loading(
        t(`messages.delete.loading`, { name: label }),
      );

      commitDestroyPermalink({
        variables: { input },
        onCompleted: (response) => {
          toast.dismiss(loadingToast);
          handleResponse(response.permalinkDestroy, label, ["permalinks"]);
        },
      });
    },
    [commitDestroyPermalink, handleResponse, permalinkInFlight, t],
  );

  /* Destroy an announcement */
  const [commitDestroyAnnouncement, announcementInFlight] =
    useLoadingMutation<useDestroyerDestroyAnnouncementMutation>(
      destroyAnnouncementMutation,
    );

  const announcement = useCallback(
    async (input: DestroyAnnouncementInput, label: string) => {
      if (announcementInFlight) return;

      const loadingToast = toast.loading(
        t(`messages.delete.loading`, { name: label }),
      );

      commitDestroyAnnouncement({
        variables: { input },
        onCompleted: (response) => {
          toast.dismiss(loadingToast);
          handleResponse(response.destroyAnnouncement, label, [
            "announcements",
          ]);
        },
      });
    },
    [commitDestroyAnnouncement, handleResponse, announcementInFlight, t],
  );

  /* Destroy a harvest source */
  const [commitDestroyHarvestSource, harvestSourceInFlight] =
    useLoadingMutation<useDestroyerDestroyHarvestSourceMutation>(
      destroyHarvestSourceMutation,
    );

  const harvestSource = useCallback(
    async (input: HarvestSourceDestroyInput, label: string) => {
      if (harvestSourceInFlight) return;

      const loadingToast = toast.loading(
        t(`messages.delete.loading`, { name: label }),
      );

      commitDestroyHarvestSource({
        variables: { input },
        onCompleted: (response) => {
          toast.dismiss(loadingToast);
          handleResponse(response.harvestSourceDestroy, label, [
            "harvestSources",
          ]);
        },
      });
    },
    [commitDestroyHarvestSource, handleResponse, harvestSourceInFlight, t],
  );

  /* Destroy a harvest mapping */
  const [commitDestroyHarvestMapping, harvestMappingInFlight] =
    useLoadingMutation<useDestroyerDestroyHarvestMappingMutation>(
      destroyHarvestMappingMutation,
    );

  const harvestMapping = useCallback(
    async (input: HarvestMappingDestroyInput) => {
      if (harvestMappingInFlight) return;

      const loadingToast = toast.loading(
        t(`messages.delete.loading`, { name: t("glossary.harvest_mapping") }),
      );

      commitDestroyHarvestMapping({
        variables: { input },
        onCompleted: (response) => {
          toast.dismiss(loadingToast);
          handleResponse(
            response.harvestMappingDestroy,
            t("glossary.harvest_mapping"),
            ["harvestMappings"],
          );
        },
      });
    },
    [commitDestroyHarvestMapping, handleResponse, harvestMappingInFlight, t],
  );

  /* Destroy a harvest metadata mapping */
  const [commitDestroyHarvestMetadataMapping] =
    useLoadingMutation<useDestroyerDestroyHarvestMetadataMappingMutation>(
      destroyHarvestMetadataMappingMutation,
    );

  const harvestMetadataMapping = useCallback(
    async (input: HarvestMetadataMappingDestroyInput) => {
      commitDestroyHarvestMetadataMapping({
        variables: { input },
        onCompleted: (response) =>
          handleResponse(
            response.harvestMetadataMappingDestroy,
            t("glossary.metadata_mapping"),
            ["harvestMetadataMappings"],
          ),
      });
    },
    [commitDestroyHarvestMetadataMapping, handleResponse, t],
  );

  /* Destroy a submission target reviewer */
  const [
    commitDestroySubmissionTargetReviewer,
    submissionTargetReviewerInFlight,
  ] = useLoadingMutation<useDestroyerDestroySubmissionTargetReviewerMutation>(
    destroySubmissionTargetReviewerMutation,
  );

  const submissionTargetReviewer = useCallback(
    async (input: SubmissionTargetReviewerDestroyInput, label: string) => {
      if (submissionTargetReviewerInFlight) return;

      const loadingToast = toast.loading(
        t(`messages.delete.loading`, { name: label }),
      );

      commitDestroySubmissionTargetReviewer({
        variables: { input },
        onCompleted: (response) => {
          toast.dismiss(loadingToast);
          handleResponse(response.submissionTargetReviewerDestroy, label, [
            "reviewers",
          ]);
        },
      });
    },
    [
      commitDestroySubmissionTargetReviewer,
      handleResponse,
      submissionTargetReviewerInFlight,
      t,
    ],
  );

  /* Purge an entity and all its descendants */
  const [commitPurgeEntity, purgeInFlight] =
    useLoadingMutation<useDestroyerEntityPurgeMutation>(entityPurgeMutation);

  const purge = useCallback(
    async (
      input: EntityPurgeInput,
      label: string,
      redirectPath?: RedirectPath,
    ) => {
      if (purgeInFlight) return;

      const loadingToast = toast.loading(
        t(`messages.delete.loading`, { name: label }),
      );

      commitPurgeEntity({
        variables: { input },
        onCompleted: (response) => {
          toast.dismiss(loadingToast);
          handleResponse(response.entityPurge, label, [], redirectPath);
        },
      });
    },
    [commitPurgeEntity, handleResponse, purgeInFlight, t],
  );

  const inFlight =
    collectionInFlight ||
    itemInFlight ||
    communityInFlight ||
    contributorInFlight ||
    contributionInFlight ||
    fileInFlight ||
    orderingInFlight ||
    accessInFlight ||
    linkInFlight ||
    pageInFlight ||
    permalinkInFlight ||
    announcementInFlight ||
    harvestSourceInFlight ||
    harvestMappingInFlight ||
    submissionTargetReviewerInFlight ||
    purgeInFlight;

  return {
    collection,
    item,
    community,
    contributor,
    contribution,
    file,
    ordering,
    access,
    link,
    page,
    permalink,
    announcement,
    harvestSource,
    harvestMapping,
    harvestMetadataMapping,
    submissionTargetReviewer,
    purge,
    inFlight,
  };
}
export default useDestroyer;

const destroyCollectionMutation = graphql`
  mutation useDestroyerDestroyCollectionMutation(
    $input: DestroyCollectionInput!
  ) {
    destroyCollection(input: $input) {
      destroyedId @deleteRecord
      ...useDestroyerFragment
    }
  }
`;

const destroyItemMutation = graphql`
  mutation useDestroyerDestroyItemMutation($input: DestroyItemInput!) {
    destroyItem(input: $input) {
      destroyedId @deleteRecord
      ...useDestroyerFragment
    }
  }
`;

const destroyContributorMutation = graphql`
  mutation useDestroyerDestroyContributorMutation(
    $input: DestroyContributorInput!
  ) {
    destroyContributor(input: $input) {
      destroyedId @deleteRecord
      ...useDestroyerFragment
    }
  }
`;

const destroyContributionMutation = graphql`
  mutation useDestroyerDestroyContributionMutation(
    $input: DestroyContributionInput!
  ) {
    destroyContribution(input: $input) {
      destroyedId @deleteRecord
      ...useDestroyerFragment
    }
  }
`;

const destroyCommunityMutation = graphql`
  mutation useDestroyerDestroyCommunityMutation(
    $input: DestroyCommunityInput!
  ) {
    destroyCommunity(input: $input) {
      destroyedId @deleteRecord
      ...useDestroyerFragment
    }
  }
`;

const destroyFileMutation = graphql`
  mutation useDestroyerDestroyAssetMutation($input: DestroyAssetInput!) {
    destroyAsset(input: $input) {
      destroyedId @deleteRecord
      ...useDestroyerFragment
    }
  }
`;

const destroyOrderingMutation = graphql`
  mutation useDestroyerDestroyOrderingMutation($input: DestroyOrderingInput!) {
    destroyOrdering(input: $input) {
      destroyedId @deleteRecord
      ...useDestroyerFragment
    }
  }
`;

// TODO: Return access id
const revokeAccessMutation = graphql`
  mutation useDestroyerRevokeAccessMutation($input: RevokeAccessInput!) {
    revokeAccess(input: $input) {
      # This return schema does not have a destroyedId
      # destroyedId @deleteRecord
      ...useDestroyerFragment
    }
  }
`;

const destroyEntityLinkMutation = graphql`
  mutation useDestroyerDestroyEntityLinkMutation(
    $input: DestroyEntityLinkInput!
  ) {
    destroyEntityLink(input: $input) {
      destroyedId @deleteRecord
      ...useDestroyerFragment
    }
  }
`;

const destroyPageMutation = graphql`
  mutation useDestroyerDestroyPageMutation($input: DestroyPageInput!) {
    destroyPage(input: $input) {
      destroyedId @deleteRecord
      ...useDestroyerFragment
    }
  }
`;

const destroyPermalinkMutation = graphql`
  mutation useDestroyerDestroyPermalinkMutation(
    $input: PermalinkDestroyInput!
  ) {
    permalinkDestroy(input: $input) {
      destroyedId @deleteRecord
      ...useDestroyerFragment
    }
  }
`;

const destroyAnnouncementMutation = graphql`
  mutation useDestroyerDestroyAnnouncementMutation(
    $input: DestroyAnnouncementInput!
  ) {
    destroyAnnouncement(input: $input) {
      destroyedId @deleteRecord
      ...useDestroyerFragment
    }
  }
`;

const destroyHarvestSourceMutation = graphql`
  mutation useDestroyerDestroyHarvestSourceMutation(
    $input: HarvestSourceDestroyInput!
  ) {
    harvestSourceDestroy(input: $input) {
      destroyedId @deleteRecord
      ...useDestroyerFragment
    }
  }
`;

const destroyHarvestMappingMutation = graphql`
  mutation useDestroyerDestroyHarvestMappingMutation(
    $input: HarvestMappingDestroyInput!
  ) {
    harvestMappingDestroy(input: $input) {
      destroyedId @deleteRecord
      ...useDestroyerFragment
    }
  }
`;

const destroySubmissionTargetReviewerMutation = graphql`
  mutation useDestroyerDestroySubmissionTargetReviewerMutation(
    $input: SubmissionTargetReviewerDestroyInput!
  ) {
    submissionTargetReviewerDestroy(input: $input) {
      destroyedId @deleteRecord
      ...useDestroyerFragment
    }
  }
`;

const destroyHarvestMetadataMappingMutation = graphql`
  mutation useDestroyerDestroyHarvestMetadataMappingMutation(
    $input: HarvestMetadataMappingDestroyInput!
  ) {
    harvestMetadataMappingDestroy(input: $input) {
      destroyedId @deleteRecord
      ...useDestroyerFragment
    }
  }
`;

const entityPurgeMutation = graphql`
  mutation useDestroyerEntityPurgeMutation($input: EntityPurgeInput!) {
    entityPurge(input: $input) {
      destroyedId @deleteRecord
      ...useDestroyerFragment
    }
  }
`;

const destroyFragment = graphql`
  fragment useDestroyerFragment on StandardMutationPayload @inline {
    ... on DestroyMutationPayload {
      destroyedId
      destroyed
      globalErrors {
        message
        type
      }
    }
    ... on RevokeAccessPayload {
      revoked
      globalErrors {
        message
        type
      }
    }
    ... on DestroyOrderingPayload {
      disabled
      globalErrors {
        message
        type
      }
    }
  }
`;
