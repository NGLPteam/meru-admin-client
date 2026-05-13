import DataList from "components/atomic/DataList";
import { formatSchemaValue, type ScalarProp, type Value } from "./helpers";

export default function ScalarField({
  prop,
  value,
}: {
  prop: ScalarProp;
  value: Value;
}) {
  return (
    <DataList.Item
      label={prop.label}
      value={formatSchemaValue(value, prop.type)}
      wide={!!prop.isWide}
    />
  );
}
