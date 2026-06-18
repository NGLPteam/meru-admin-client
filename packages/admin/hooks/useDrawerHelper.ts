import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import omitBy from "lodash/omitBy";
import pickBy from "lodash/pickBy";

import ContributorCreatePersonDrawer from "components/composed/contributor/ContributorCreatePersonDrawer";
import ContributorCreateOrganizationDrawer from "components/composed/contributor/ContributorCreateOrganizationDrawer";
import ItemContributionEditDrawer from "components/composed/contribution/ItemContributionEditDrawer";
import CollectionContributionEditDrawer from "components/composed/contribution/CollectionContributionEditDrawer";
import CommunityCreateDrawer from "components/composed/community/CommunityCreateDrawer";
import CommunityUpdateDrawer from "components/composed/community/CommunityUpdateDrawer";
import CollectionUpdateDrawer from "components/composed/collection/CollectionUpdateDrawer";
import ContributorUpdateDrawer from "components/composed/contributor/ContributorUpdateDrawer";
import ItemUpdateDrawer from "components/composed/item/ItemUpdateDrawer";
import CollectionContributionCreateDrawer from "components/composed/contribution/CollectionContributionCreateDrawer";
import ItemContributionCreateDrawer from "components/composed/contribution/ItemContributionCreateDrawer";
import ContributorContributionCreateDrawer from "components/composed/contribution/ContributorContributionCreateDrawer";
import FileCreateDrawer from "components/composed/file/FileCreateDrawer";
import FileEditDrawer from "components/composed/file/FileEditDrawer";
import RoleGrantAccessDrawer from "components/composed/role/RoleGrantAccessDrawer";
import UserGrantCollectionAccessDrawer from "components/composed/user/UserGrantCollectionAccessDrawer";
import UserGrantItemAccessDrawer from "components/composed/user/UserGrantItemAccessDrawer";
import UserGrantCommunityAccessDrawer from "components/composed/user/UserGrantCommunityAccessDrawer";
import RoleEditAccessDrawer from "components/composed/role/RoleEditAccessDrawer";
import EntityLinksAddDrawer from "components/composed/links/EntityLinksAddDrawer";
import UserProfileUpdateDrawer from "components/composed/user/UserProfileUpdateDrawer";
import ItemAddDrawer from "components/composed/item/ItemAddDrawer";
import CollectionAddDrawer from "components/composed/collection/CollectionAddDrawer";
import EntityOrderingAddDrawer from "components/composed/ordering/EntityOrderingAddDrawer";
import EntityPageAddDrawer from "components/composed/pages/EntityPageAddDrawer";
import EntityPageUpdateDrawer from "components/composed/pages/EntityPageUpdateDrawer";
import UserUpdateDrawer from "components/composed/user/UserUpdateDrawer";
import EntityAnnouncementAddDrawer from "components/composed/announcements/EntityAnnouncementAddDrawer";
import EntityAnnouncementUpdateDrawer from "components/composed/announcements/EntityAnnouncementUpdateDrawer";
import EntityOrderingEditDrawer from "components/composed/ordering/EntityOrderingEditDrawer";
import SearchFilterDrawer from "components/composed/search/SearchFilterDrawer";
import EntityPermalinksAddDrawer from "components/composed/permalinks/EntityPermalinksAddDrawer";
import EntityPermalinksUpdateDrawer from "components/composed/permalinks/EntityPermalinksUpdateDrawer";
import InstancePermalinksAddDrawer from "components/composed/permalinks/InstancePermalinksAddDrawer";
import SubmissionReviewDrawer from "components/composed/submission/SubmissionReviewDrawer";
import SubmissionTargetReviewerAddDrawer from "components/composed/submissionTarget/SubmissionTargetReviewerAddDrawer";

const drawerRegistry = {
  addPerson: ContributorCreatePersonDrawer,
  addOrganization: ContributorCreateOrganizationDrawer,
  addCollectionContribution: CollectionContributionCreateDrawer,
  addItemContribution: ItemContributionCreateDrawer,
  addContributorContribution: ContributorContributionCreateDrawer,
  addFile: FileCreateDrawer,
  editFile: FileEditDrawer,
  editItemContribution: ItemContributionEditDrawer,
  editCollectionContribution: CollectionContributionEditDrawer,
  addCommunity: CommunityCreateDrawer,
  editCommunity: CommunityUpdateDrawer,
  editCollection: CollectionUpdateDrawer,
  editContributor: ContributorUpdateDrawer,
  editItem: ItemUpdateDrawer,
  addRoleAccess: RoleGrantAccessDrawer,
  addUserCollectionAccess: UserGrantCollectionAccessDrawer,
  addUserItemAccess: UserGrantItemAccessDrawer,
  addUserCommunityAccess: UserGrantCommunityAccessDrawer,
  editRoleAccess: RoleEditAccessDrawer,
  addLink: EntityLinksAddDrawer,
  editProfile: UserProfileUpdateDrawer,
  addItem: ItemAddDrawer,
  addCollection: CollectionAddDrawer,
  addOrdering: EntityOrderingAddDrawer,
  addPage: EntityPageAddDrawer,
  editPage: EntityPageUpdateDrawer,
  editUser: UserUpdateDrawer,
  addAnnouncement: EntityAnnouncementAddDrawer,
  editAnnouncement: EntityAnnouncementUpdateDrawer,
  editOrdering: EntityOrderingEditDrawer,
  searchFilters: SearchFilterDrawer,
  addPermalink: EntityPermalinksAddDrawer,
  editPermalink: EntityPermalinksUpdateDrawer,
  addInstancePermalink: InstancePermalinksAddDrawer,
  reviewSubmission: SubmissionReviewDrawer,
  addReviewer: SubmissionTargetReviewerAddDrawer,
};

export function useDrawerHelper() {
  const { pathname, query, push } = useRouter();

  const drawers = drawerRegistry;
  const validTypes = Object.keys(drawers);

  const params = useMemo(
    () =>
      pickBy(
        query,
        (_value, key) =>
          key && typeof key === "string" && key.startsWith("drawer"),
      ),
    [query],
  );

  const href = useCallback(
    (drawer: Drawers, drawerParams?: DrawerParams) => {
      const combinedQuery = { ...query, drawer, ...drawerParams };
      return {
        pathname,
        query: combinedQuery,
      };
    },
    [pathname, query],
  );

  const open = useCallback(
    (drawer: Drawers, drawerParams?: DrawerParams) => {
      const url = href(drawer, drawerParams);
      push(url);
    },
    [push, href],
  );

  const close = useCallback(() => {
    const cleanedQuery = omitBy(query, (_value, key) => {
      return key && typeof key === "string" && key.startsWith("drawer");
    });

    push({ query: { ...cleanedQuery } }, undefined, { shallow: true });
  }, [push, query]);

  const hideOnClickOutside = query?.drawerHideOnClickOutside;

  const type =
    query?.drawer && typeof query.drawer === "string" ? query.drawer : null;

  return {
    open,
    close,
    drawers,
    href,
    type,
    params,
    hideOnClickOutside,
    validTypes,
  };
}

export type DrawerParams = Record<string, string | undefined>;
export type Drawers = keyof typeof drawerRegistry;

export default useDrawerHelper;
