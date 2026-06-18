import * as React from "react";
import { useTranslation } from "react-i18next";
import { graphql } from "react-relay";
import EntityAnnouncementUpdateForm from "components/composed/announcements/EntityAnnouncementUpdateForm";
import Drawer from "components/layout/Drawer";
import { LazyLoadQueryWrapper } from "@wdp/lib/api/components";
import EntityAnnouncementDrawerActions from "./EntityAnnouncementDrawerActions";
import type { DialogProps } from "reakit/Dialog";

import type { EntityAnnouncementUpdateDrawerQuery as Query } from "__generated__/EntityAnnouncementUpdateDrawerQuery.graphql";

export default function EntityAnnouncementUpdateDrawer({
  dialog,
  params,
}: {
  dialog: DialogProps;
  params: Record<string, string>;
}) {
  const { t } = useTranslation();

  const { drawerSlug, drawerAnnouncementSlug } = params;

  const onDelete = () => {
    if (dialog?.hide) dialog.hide();
  };

  return (
    <LazyLoadQueryWrapper<Query>
      query={query}
      variables={{
        entitySlug: drawerSlug,
        announcementSlug: drawerAnnouncementSlug,
      }}
    >
      {({ data }) => {
        const entity = data
          ? (data.item ?? data.collection ?? data.community)
          : undefined;
        return (
          <Drawer
            header={t("actions.edit.announcement_header")}
            dialog={dialog}
            hideOnClickOutside={false}
            buttons={
              <EntityAnnouncementDrawerActions
                data={entity}
                onDelete={onDelete}
              />
            }
          >
            {entity && (
              <EntityAnnouncementUpdateForm
                data={entity}
                onSuccess={dialog.hide}
                onCancel={dialog.hide}
              />
            )}
          </Drawer>
        );
      }}
    </LazyLoadQueryWrapper>
  );
}

const query = graphql`
  query EntityAnnouncementUpdateDrawerQuery(
    $entitySlug: Slug!
    $announcementSlug: Slug!
  ) {
    item(slug: $entitySlug) {
      ...EntityAnnouncementDrawerActionsFragment
      ...EntityAnnouncementUpdateFormFragment
    }
    collection(slug: $entitySlug) {
      ...EntityAnnouncementDrawerActionsFragment
      ...EntityAnnouncementUpdateFormFragment
    }
    community(slug: $entitySlug) {
      ...EntityAnnouncementDrawerActionsFragment
      ...EntityAnnouncementUpdateFormFragment
    }
  }
`;
