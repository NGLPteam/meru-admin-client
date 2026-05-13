import { useMemo, Fragment, cloneElement } from "react";
import join from "url-join";
import { useViewerContext } from "contexts";
import { useDestroyer } from "hooks";
import i18next from "i18next";
import {
  ButtonControlGroup,
  ButtonControl,
  ButtonControlConfirm,
  ButtonControlDownload,
} from "components/atomic/buttons";
import IconFactory from "components/factories/IconFactory";
import { ButtonControlView } from "components/atomic/buttons/ButtonControl";
import EntityPurgeModal from "components/composed/entity/EntityPurgeModal";
import type {
  ColumnDef,
  ModelTableActionProps,
  Row,
} from "@tanstack/react-table";
type IconFactoryProps = React.ComponentProps<typeof IconFactory>;

type ActionConfig<D extends Record<string, unknown>> =
  | {
      handleClick: ({ row }: { row: Row<D> }) => void;
      modalConfirm?: boolean;
      modalLabel?: ({ row }: { row: Row<D> }) => string;
      modalBody?: ({ row }: { row: Row<D> }) => React.ReactNode;
      handleHide?: ({ row }: { row: Row<D> }) => boolean;
      handleLink?: ({ row }: { row: Row<D> }) => string | void;
    }
  | {
      props: ({
        row,
      }: {
        row: Row<D>;
      }) => React.ComponentProps<typeof EntityPurgeModal>;
    };

type ActionKeys =
  | "download"
  | "edit"
  | "delete"
  | "purge"
  | "view"
  | "enable"
  | "disable"
  | "publish";

// Change the sort order of action buttons here
const ACTION_ORDER = [
  "download",
  "view",
  "publish",
  "edit",
  "enable",
  "disable",
  "delete",
  "purge",
];

interface ActionDefinition {
  label: string;
  icon?: IconFactoryProps["icon"];
  action?: string;
  iconRotate?: number;
  modalLabel?: string;
  modalBody?: React.ReactNode;
}

type ActionDefinitions = {
  [K in ActionKeys]: ActionDefinition;
};

type ActionConfigurations<D extends Record<string, unknown>> = {
  [K in ActionKeys]?: ActionConfig<D>;
};

const availableActions: ActionDefinitions = {
  download: {
    label: i18next.t("common.download"),
    iconRotate: 180,
  },
  edit: {
    label: i18next.t("common.edit"),
    icon: "edit",
    action: "self.update",
  },
  delete: {
    label: i18next.t("common.delete"),
    icon: "delete",
    action: "self.delete",
    modalLabel: i18next.t("messages.delete.confirm_label"),
    modalBody: (
      <p className="t-copy-sm">{i18next.t("messages.delete.confirm_body")}</p>
    ),
  },
  purge: {
    label: i18next.t("common.delete"),
  },
  view: {
    label: i18next.t("common.view"),
  },
  enable: {
    label: i18next.t("common.enable"),
    action: "self.edit",
    modalLabel: i18next.t("messages.enable.confirm_label"),
    modalBody: (
      <p className="t-copy-sm">{i18next.t("messages.enable.confirm_body")}</p>
    ),
  },
  disable: {
    label: i18next.t("common.disable"),
    action: "self.delete",
    modalLabel: i18next.t("messages.disable.confirm_label"),
    modalBody: (
      <p className="t-copy-sm">{i18next.t("messages.disable.confirm_body")}</p>
    ),
  },
  publish: {
    label: i18next.t("nav.publish"),
    modalLabel: i18next.t("actions.submissions.publish_confirm_label"),
  },
};

function getButtonControlChildren<D extends Record<string, unknown>>(
  row: Row<D>,
  action: ActionKeys,
  actionConfig?: ActionConfig<D>,
  disableDelete?: boolean,
) {
  const actionDefinition = availableActions[action];

  if (actionConfig && "props" in actionConfig) {
    const purgeProps = actionConfig.props({ row });
    return (
      <EntityPurgeModal key="purge" {...purgeProps} disabled={disableDelete} />
    );
  }

  if (actionConfig?.handleHide && actionConfig?.handleHide({ row }))
    return <Fragment key={action}></Fragment>;

  const dynamicModalLabel = actionConfig?.modalLabel
    ? actionConfig.modalLabel({ row })
    : actionDefinition.modalLabel;
  const dynamicModalBody = actionConfig?.modalBody
    ? actionConfig.modalBody({ row })
    : (actionDefinition.modalBody ?? null);

  const buttonControl = actionConfig?.modalConfirm ? (
    <ButtonControlConfirm
      key={action}
      aria-label={actionDefinition.label}
      icon={actionDefinition.icon}
      iconRotate={actionDefinition.iconRotate || 0}
      {...(actionConfig?.handleClick && {
        onClick: (hideDialog: () => void) => {
          actionConfig.handleClick({ row });
          if (hideDialog) hideDialog();
        },
      })}
      modalLabel={dynamicModalLabel}
      modalBody={dynamicModalBody}
      disabled={disableDelete && action === "delete"}
    >
      {actionDefinition.icon ? null : actionDefinition.label}
    </ButtonControlConfirm>
  ) : action === "download" && actionConfig?.handleLink ? (
    <ButtonControlDownload
      key={action}
      aria-label={actionDefinition.label}
      {...(actionConfig?.handleLink && {
        href: actionConfig.handleLink({ row }),
      })}
    ></ButtonControlDownload>
  ) : action === "view" &&
    actionConfig?.handleLink &&
    process.env.NEXT_PUBLIC_FE_URL ? (
    <ButtonControlView
      key={action}
      aria-label={actionDefinition.label}
      href={join(
        process.env.NEXT_PUBLIC_FE_URL,
        actionConfig.handleLink({
          row,
        }) as string,
      )}
    />
  ) : (
    <ButtonControl
      key={action}
      aria-label={actionDefinition.label}
      icon={actionDefinition.icon}
      iconRotate={actionDefinition.iconRotate || 0}
      {...(actionConfig?.handleClick && {
        onClick: () => actionConfig.handleClick({ row }),
      })}
    >
      {actionDefinition.icon ? null : actionDefinition.label}
    </ButtonControl>
  );

  const allowedActions = row?.original?.allowedActions as string[] | undefined;

  if (!allowedActions) return buttonControl;

  return cloneElement(buttonControl, {
    actions: actionDefinition.action,
    allowedActions,
  });
}

function renderActions<D extends Record<string, unknown>>(
  row: Row<D>,
  configuration: ActionConfigurations<D>,
  disableDelete: boolean,
) {
  const keys = Object.keys(configuration) as Array<ActionKeys>;

  const buttons = keys
    .sort((actionA, actionB) => {
      return ACTION_ORDER.indexOf(actionA) - ACTION_ORDER.indexOf(actionB);
    })
    .filter((action) => {
      // Filter out any actions that are not configured
      const actionConfig = configuration[action];
      return actionConfig ? action : null;
    })
    .map((action) => {
      // Map actions to button props
      const actionConfig = configuration[action];
      return getButtonControlChildren<D>(
        row,
        action,
        actionConfig,
        disableDelete,
      );
    });

  return buttons ? (
    <ButtonControlGroup
      toggleLabel={i18next.t("common.options")}
      menuLabel={"Options list"}
      breakpoint={70}
      desktopMax={10}
    >
      {buttons}
    </ButtonControlGroup>
  ) : null;
}

export interface Actions<T extends Record<string, unknown>> {
  handleEdit?: (props: ModelTableActionProps<T>) => void;
  handleDelete?: (props: ModelTableActionProps<T>) => void;
  hideDelete?: (props: ModelTableActionProps<T>) => boolean;
  purgeProps?: (
    props: ModelTableActionProps<T>,
  ) => React.ComponentProps<typeof EntityPurgeModal>;
  handleDownload?: (props: ModelTableActionProps<T>) => void;
  handleView?: (props: ModelTableActionProps<T>) => void;
  handleEnable?: (props: ModelTableActionProps<T>) => void;
  hideEnable?: (props: ModelTableActionProps<T>) => boolean;
  handleDisable?: (props: ModelTableActionProps<T>) => void;
  hideDisable?: (props: ModelTableActionProps<T>) => boolean;
  handlePublish?: (props: ModelTableActionProps<T>) => void;
  publishModalBody?: (props: ModelTableActionProps<T>) => React.ReactNode;
  actionsFilter?: (
    actions: Record<string, unknown>,
    row: Row<T>,
  ) => Record<string, unknown>;
}

function useRowActions<D extends Record<string, unknown>>(
  columns: ColumnDef<D>[],
  actions: Actions<D>,
) {
  const { globalAdmin } = useViewerContext();

  const { inFlight: disableDelete } = useDestroyer();

  const purgeAction =
    globalAdmin && actions.purgeProps && actions.handleDelete
      ? {
          purge: { props: actions.purgeProps },
        }
      : undefined;

  const deleteAction = actions.handleDelete
    ? {
        delete: {
          handleClick: actions.handleDelete,
          modalConfirm: true,
          handleHide: actions.hideDelete,
        },
      }
    : undefined;

  const renderedDelete = purgeAction ?? deleteAction;

  // Setup actions
  const rowActions = useMemo(
    () => ({
      ...(actions.handleEdit && { edit: { handleClick: actions.handleEdit } }),
      ...renderedDelete,
      ...(actions.handleDownload && {
        download: {
          handleLink: actions.handleDownload,
          handleClick: () => null,
        },
      }),
      ...(actions.handleView && {
        view: { handleLink: actions.handleView, handleClick: () => null },
      }),
      ...(actions.handleEnable && {
        enable: {
          handleClick: actions.handleEnable,
          handleHide: actions.hideEnable,
          modalConfirm: true,
        },
      }),
      ...(actions.handleDisable && {
        disable: {
          handleClick: actions.handleDisable,
          handleHide: actions.hideDisable,
          modalConfirm: true,
        },
      }),
      ...(actions.handlePublish && {
        publish: {
          handleClick: actions.handlePublish,
          modalConfirm: true,
          modalBody: actions.publishModalBody,
        },
      }),
    }),
    [actions, renderedDelete],
  );

  const actionColumn = {
    header: () => <span className="a-hidden">Actions</span>,
    id: "actions",
    cell: ({ row }: { row: Row<D> }) => {
      const finalActions = actions?.actionsFilter
        ? actions.actionsFilter(rowActions, row)
        : rowActions;
      return renderActions<D>(row, finalActions, disableDelete);
    },
    meta: {
      cellType: "actions",
      columnAlign: "right",
    },
  };

  return [...columns, actionColumn];
}

useRowActions.pluginName = "useRowActions";

export default useRowActions;
