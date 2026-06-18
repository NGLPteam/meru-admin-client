import * as React from "react";
import { useTranslation } from "react-i18next";
import { graphql } from "react-relay";
import EntityLinksAddForm from "components/composed/links/EntityLinksAddForm";
import Drawer from "components/layout/Drawer";
import { LazyLoadQueryWrapper } from "@wdp/lib/api/components";
import type { DialogProps } from "reakit/Dialog";

import type { EntityLinksAddDrawerQuery as Query } from "__generated__/EntityLinksAddDrawerQuery.graphql";

export default function EntityLinksAddDrawer({
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
        const entity = data ? (data.item ?? data.collection) : undefined;
        return (
          <Drawer
            header={t("actions.add.link_header")}
            dialog={dialog}
            hideOnClickOutside={false}
          >
            {entity && (
              <EntityLinksAddForm
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
  query EntityLinksAddDrawerQuery($entitySlug: Slug!) {
    item(slug: $entitySlug) {
      ...EntityLinksAddFormFragment
    }
    collection(slug: $entitySlug) {
      ...EntityLinksAddFormFragment
    }
  }
`;
