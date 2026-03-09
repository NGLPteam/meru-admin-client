/**
 * @generated SignedSource<<b554e407b1dec9f179907be11d7d3782>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SubmissionTargetState = "CLOSED" | "OPEN" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SubmissionTargetStateToggleFragment$data = {
  readonly state: SubmissionTargetState;
  readonly submissionTargetId: string;
  readonly " $fragmentType": "SubmissionTargetStateToggleFragment";
};
export type SubmissionTargetStateToggleFragment$key = {
  readonly " $data"?: SubmissionTargetStateToggleFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionTargetStateToggleFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmissionTargetStateToggleFragment",
  "selections": [
    {
      "alias": "submissionTargetId",
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    }
  ],
  "type": "SubmissionTarget",
  "abstractKey": null
};

(node as any).hash = "68c5f24277daee83f219faf1385b4ca3";

export default node;
