import * as React from "react";
import { useTranslation } from "react-i18next";
import { graphql } from "react-relay";
import EntityPermalinksAddForm from "components/composed/permalinks/EntityPermalinksAddForm";
import Drawer from "components/layout/Drawer";
import { LazyLoadQueryWrapper } from "@wdp/lib/api/components";
import type { DialogProps } from "reakit/Dialog";

import type { EntityPermalinksAddDrawerQuery as Query } from "__generated__/EntityPermalinksAddDrawerQuery.graphql";

export default function EntityPermalinksAddDrawer({
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
            header={t("actions.add.permalink_header")}
            dialog={dialog}
            hideOnClickOutside={false}
          >
            {entity && (
              <EntityPermalinksAddForm
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
  query EntityPermalinksAddDrawerQuery($entitySlug: Slug!) {
    item(slug: $entitySlug) {
      ...EntityPermalinksAddFormFragment
    }
    collection(slug: $entitySlug) {
      ...EntityPermalinksAddFormFragment
    }
    community(slug: $entitySlug) {
      ...EntityPermalinksAddFormFragment
    }
  }
`;
