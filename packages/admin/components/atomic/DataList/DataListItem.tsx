import * as Styled from "./DataList.styles";

export default function DataListItem({
  label,
  value,
  wide,
}: {
  label: string;
  value?: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <Styled.Item $wide={wide}>
      <Styled.Term>{label}</Styled.Term>
      <Styled.Description>{value || "—"}</Styled.Description>
    </Styled.Item>
  );
}
