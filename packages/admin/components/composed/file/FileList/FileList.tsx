import { graphql } from "react-relay";
import { useTranslation } from "react-i18next";
import {
  useDestroyer,
  useDrawerHelper,
  useMaybeFragment,
  useRouteSlug,
} from "hooks";

import ModelListPage from "components/composed/model/ModelListPage";
import ModelColumns from "components/composed/model/ModelColumns";
import PageHeader from "components/layout/PageHeader";
import { ButtonControlGroup, ButtonControlDrawer } from "components/atomic";
import {
  FileListFragment$data,
  FileListFragment$key,
} from "@/relay/FileListFragment.graphql";
import type { ModelTableActionProps } from "@tanstack/react-table";

type HeaderProps = React.ComponentProps<typeof PageHeader>;

function FileList({ data, headerStyle, hideHeader }: FileListProps) {
  const files = useMaybeFragment<FileListFragment$key>(fragment, data);
  const slug = useRouteSlug();
  const { t } = useTranslation();
  const destroy = useDestroyer();
  const drawerHelper = useDrawerHelper();

  const columns = [
    ModelColumns.AssetThumbnailColumn<FileNode>({}),
    ModelColumns.NameColumn<FileNode>({
      accessorKey: "name",
      enableSorting: false,
    }),
    ModelColumns.StringColumn<FileNode>({
      header: () => <>{t("lists.kind_column")}</>,
      id: "kind",
      cell: ({ getValue }) => {
        const value = getValue<string>();

        return (
          <div className={value === "pdf" ? "t-uppercase" : "t-capitalize"}>
            {value}
          </div>
        );
      },
    }),
  ];

  const actions = {
    handleEdit: ({ row }: ModelTableActionProps<FileNode>) =>
      drawerHelper.open("editFile", {
        drawerSlug: row.original?.slug,
      }),
    handleDownload: ({ row }: ModelTableActionProps<FileNode>) =>
      row.original.downloadUrl ? row.original.downloadUrl : null,
    handleDelete: ({ row }: ModelTableActionProps<FileNode>) => {
      if (!row.original.id) return;
      destroy.file(
        { assetId: row.original.id },
        row.original.name || "glossary.file",
      );
    },
  };

  // TODO: We need an authorization check here.
  // There are currently no allowedActions around assets.
  const buttons = (
    <ButtonControlGroup
      toggleLabel={t("common.options")}
      menuLabel={t("common.options")}
    >
      <ButtonControlDrawer
        icon="plus"
        drawer="addFile"
        drawerQuery={{ drawerSlug: slug || "" }}
        actions="self.assets.create"
      >
        {t("actions.add.file")}
      </ButtonControlDrawer>
    </ButtonControlGroup>
  );

  return (
    <ModelListPage<FileListFragment$data, FileNode>
      modelName="file"
      columns={columns}
      data={files}
      headerStyle={headerStyle}
      hideHeader={hideHeader}
      buttons={buttons}
      actions={actions}
    />
  );
}

interface FileListProps extends Pick<
  HeaderProps,
  "headerStyle" | "hideHeader"
> {
  data?: FileListFragment$key;
}

type FileNode = FileListFragment$data["nodes"][number];

const fragment = graphql`
  fragment FileListFragment on AssetConnection {
    nodes {
      ... on Asset {
        id
        slug
        kind
        name
        downloadUrl
        ...AssetThumbnailColumnFragment
      }
    }
    ...ModelListPageFragment
  }
`;

export default FileList;
