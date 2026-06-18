import * as React from "react";
import { useTranslation } from "react-i18next";
import { graphql } from "react-relay";
import EntityAnnouncementAddForm from "components/composed/announcements/EntityAnnouncementAddForm";
import Drawer from "components/layout/Drawer";
import { LazyLoadQueryWrapper } from "@wdp/lib/api/components";
import type { DialogProps } from "reakit/Dialog";

import type { EntityAnnouncementAddDrawerQuery as Query } from "__generated__/EntityAnnouncementAddDrawerQuery.graphql";

export default function EntityAnnouncementAddDrawer({
  dialog,
  params,
}: {
  dialog: DialogProps;
  params: Record<string, string>;
}) {
  const { t } = useTranslation();

  const { drawerSlug } = params;

  return (
    <LazyLoadQueryWrapper<Query>
      query={query}
      variables={{ entitySlug: drawerSlug }}
    >
      {({ data }) => {
        const entity = data
          ? (data.item ?? data.collection ?? data.community)
          : undefined;
        return (
          <Drawer
            header={t("actions.add.announcement_header")}
            dialog={dialog}
            hideOnClickOutside={false}
          >
            {entity && (
              <EntityAnnouncementAddForm
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
  query EntityAnnouncementAddDrawerQuery($entitySlug: Slug!) {
    item(slug: $entitySlug) {
      ...EntityAnnouncementAddFormFragment
    }
    collection(slug: $entitySlug) {
      ...EntityAnnouncementAddFormFragment
    }
    community(slug: $entitySlug) {
      ...EntityAnnouncementAddFormFragment
    }
  }
`;
