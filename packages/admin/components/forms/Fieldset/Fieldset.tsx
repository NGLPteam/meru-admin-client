import BaseInputLabel from "../BaseInputLabel";
import * as Styled from "./Fieldset.styles";

const Fieldset = ({ id, label, children, description, style }: Props) => {
  return (
    <Styled.Fieldset id={id} style={style}>
      <BaseInputLabel>{label}</BaseInputLabel>
      {description && <Styled.Description>{description}</Styled.Description>}
      <Styled.FieldsWrapper>{children}</Styled.FieldsWrapper>
    </Styled.Fieldset>
  );
};

type CSSwithVars = React.CSSProperties & Record<`--${string}`, number | string>;

interface Props {
  id?: string;
  label: string;
  children: React.ReactNode;
  description?: React.ReactNode;
  style?: CSSwithVars;
}

export default Fieldset;

Fieldset.Fields = Styled.Fields;
Fieldset.Field = Styled.Field;
Fieldset.Actions = Styled.Actions;
