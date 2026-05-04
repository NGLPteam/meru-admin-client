import { useState, useEffect, useMemo, useRef } from "react";
import { useId } from "react";

interface Params {
  initialVisible?: boolean;
  onBlur?: () => void;
}

export default function useDisclosureState({
  initialVisible = false,
  onBlur,
}: Params) {
  const [visible, setVisible] = useState(initialVisible);
  const toggleVisible = () => setVisible(!visible);

  const id = useId();

  // Must initiate with null for use with @castiron Maybe types.
  const disclosureRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function handleBlur(
    event: React.FocusEvent<HTMLButtonElement | HTMLDivElement>,
  ) {
    if (!contentRef.current || !disclosureRef.current) return;
    if (
      contentRef.current.contains(event.relatedTarget) ||
      disclosureRef.current.contains(event.relatedTarget)
    )
      return;
    // state can optionally be controlled externally
    typeof onBlur === "function" ? onBlur() : setVisible(false);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "Escape") return;
    typeof onBlur === "function" ? onBlur() : setVisible(false);
    if (disclosureRef.current) disclosureRef.current.focus();
  }

  const disclosureProps = {
    ref: disclosureRef,
    type: "button",
    "aria-expanded": visible,
    "aria-controls": id,
    onClick: toggleVisible,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
  };
  const contentProps = {
    ref: contentRef,
    id,
    visible,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
  };

  const state = useMemo(
    () => ({
      visible,
      disclosureProps,
      contentProps,
    }),
    [visible, id], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    setVisible(initialVisible);
  }, [initialVisible]);

  return state;
}
