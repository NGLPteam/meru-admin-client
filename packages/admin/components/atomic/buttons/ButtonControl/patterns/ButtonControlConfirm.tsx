import { DialogDisclosure, useDialogState } from "reakit/Dialog";
import { ButtonControl, ButtonControlGroup } from "components/atomic";
import Modal from "components/layout/Modal";
import ConfirmModal from "components/layout/ConfirmModal";
import { Authorize } from "components/auth";

type BaseProps = React.ComponentProps<typeof ButtonControl>;
type ModalProps = React.ComponentProps<typeof Modal>;
type GroupProps = React.ComponentProps<typeof ButtonControlGroup>;

/**
 * A button control that opens a modal
 */
const ButtonControlConfirm = ({
  modalLabel,
  modalBody,
  icon,
  children,
  onClick: onConfirm,
  "aria-label": actionLabel,
  $closeDropdown,
  actions,
  allowedActions,
  loading,
  disabled,
}: Props) => {
  const dialog = useDialogState({ visible: false, animated: true });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if ($closeDropdown) {
      $closeDropdown();
    }
    dialog.show();
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm(dialog.hide);
  };

  // We need to check if the user is authorized to view this button before creating the DialogDisclosure
  return (
    <Authorize actions={actions} allowedActions={allowedActions}>
      <>
        <DialogDisclosure
          as={ButtonControl}
          icon={icon}
          onClick={handleClick}
          aria-label={actionLabel}
          disabled={disabled}
          {...dialog}
        >
          {children}
        </DialogDisclosure>
        <Modal label={modalLabel} dialog={dialog} hideOnClickOutside={false}>
          {({ handleClose }) => (
            <ConfirmModal
              modalBody={modalBody}
              onClick={handleConfirm}
              handleClose={handleClose}
              actionLabel={actionLabel}
              loading={loading}
            />
          )}
        </Modal>
      </>
    </Authorize>
  );
};

type Props = Pick<GroupProps, "breakpoint"> &
  Omit<BaseProps, "onClick"> & {
    modalLabel?: ModalProps["label"];
    modalBody?: React.ReactNode;
    onClick?: (hideDialog: () => void) => void;
    loading?: boolean;
  };

export default ButtonControlConfirm;
