import { PopoverDisclosure, usePopoverState } from "reakit/Popover";
import { IconFactory } from "components/factories";
import * as Styled from "./HeaderFilterPopover.styles";

interface Props {
  label: string;
  children: React.ReactNode;
}

export default function TableFilterPopover({ label, children }: Props) {
  const popover = usePopoverState({ placement: "bottom-start" });

  return (
    <>
      <PopoverDisclosure
        {...popover}
        as={Styled.FilterIcon}
        aria-label={`Filter by ${label}`}
      >
        <IconFactory icon="filters" aria-hidden="true" />
      </PopoverDisclosure>
      <Styled.Popover {...popover} aria-label={label}>
        <Styled.FilterPopoverContent>{children}</Styled.FilterPopoverContent>
      </Styled.Popover>
    </>
  );
}
