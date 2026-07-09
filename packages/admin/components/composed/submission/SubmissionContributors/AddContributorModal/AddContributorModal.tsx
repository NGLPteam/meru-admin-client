import { useState } from "react";
import { Forms } from "components/api/MutationForm";
import AddContributorForm from "./forms/AddContributorForm";
import CreatePersonContributorForm from "./forms/CreatePersonContributorForm";
import * as Styled from "./AddContributorModal.styles";

type Mode = "existing" | "new";

interface Props {
  itemId: string;
  onClose: () => void;
}

export default function AddContributorModal({ itemId, onClose }: Props) {
  const [mode, setMode] = useState<Mode>("existing");

  return (
    <>
      <Styled.Toggle>
        <Forms.RadioGroup
          name="contributorMode"
          label="forms.fields.contributor_mode_label"
          hideLabel
          options={[
            {
              value: "existing",
              label: "forms.fields.contributor_mode_existing",
            },
            {
              value: "new",
              label: "forms.fields.contributor_mode_new_person",
            },
          ]}
          checked={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
        />
      </Styled.Toggle>
      {mode === "existing" ? (
        <AddContributorForm itemId={itemId} onClose={onClose} />
      ) : (
        <CreatePersonContributorForm itemId={itemId} onClose={onClose} />
      )}
    </>
  );
}
