import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import { IconFactory } from "components/factories";
import Search from "components/composed/search/Search/Search";
import SubmissionFilterDrawer from "../SubmissionFilterDrawer";
import * as Styled from "./styles";
import type { SubmissionState } from "types/graphql-schema";

interface Props {
  stateOptions: SubmissionState[];
}

export default function SubmissionSearchWithFilters({ stateOptions }: Props) {
  const dialog = useDialogState({ animated: true });

  return (
    <>
      <Search
        filtersButton={
          <DialogDisclosure as={Styled.FiltersButton} {...dialog}>
            <IconFactory icon="settings" title="Search Options" />
          </DialogDisclosure>
        }
      />
      <SubmissionFilterDrawer dialog={dialog} stateOptions={stateOptions} />
    </>
  );
}
