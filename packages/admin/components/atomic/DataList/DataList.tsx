import DataListItem from "./DataListItem";
import * as Styled from "./DataList.styles";

function DataList({
  children,
  boxed = false,
}: {
  children: React.ReactNode;
  boxed?: boolean;
}) {
  return <Styled.List $boxed={boxed}>{children}</Styled.List>;
}

DataList.Item = DataListItem;

export default DataList;
