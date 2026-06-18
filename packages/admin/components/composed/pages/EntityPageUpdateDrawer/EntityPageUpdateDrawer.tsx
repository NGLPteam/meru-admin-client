import * as React from "react";
import { useTranslation } from "react-i18next";
import { graphql } from "react-relay";
import EntityPageUpdateForm from "components/composed/pages/EntityPageUpdateForm";
import Drawer from "components/layout/Drawer";
import { LazyLoadQueryWrapper } from "@wdp/lib/api/components";
import type { DialogProps } from "reakit/Dialog";

import type { EntityPageUpdateDrawerQuery as Query } from "__generated__/EntityPageUpdateDrawerQuery.graphql";

export default function EntityPageUpdateDrawer({
  dialog,
  params,
}: {
  dialog: DialogProps;
  params: Record<string, string>;
}) {
  const { t } = useTranslation();

  const { drawerSlug, drawerPageSlug } = params;

  return (
    <LazyLoadQueryWrapper<Query>
      query={query}
      variables={{ entitySlug: drawerSlug, pageSlug: drawerPageSlug }}
      fetchPolicy="store-and-network"
    >
      {({ data }) => {
        const entity = data
          ? (data.item ?? data.collection ?? data.community)
          : undefined;
        return (
          <Drawer
            header={t("actions.edit.page_header")}
            dialog={dialog}
            hideOnClickOutside={false}
          >
            {entity && (
              <EntityPageUpdateForm
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
  query EntityPageUpdateDrawerQuery($entitySlug: Slug!, $pageSlug: String!) {
    item(slug: $entitySlug) {
      ...EntityPageUpdateFormFragment
    }
    collection(slug: $entitySlug) {
      ...EntityPageUpdateFormFragment
    }
    community(slug: $entitySlug) {
      ...EntityPageUpdateFormFragment
    }
  }
`;
