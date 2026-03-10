/**
 * @generated SignedSource<<672481df01ffe7e5ab06177d2ea45b6b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SubmissionState = "APPROVED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REVISION_REQUESTED" | "SUBMITTED" | "UNDER_REVIEW" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SubmissionLayoutFragment$data = {
  readonly entity: {
    readonly title: string;
  } | null | undefined;
  readonly id: string;
  readonly state: SubmissionState;
  readonly " $fragmentType": "SubmissionLayoutFragment";
};
export type SubmissionLayoutFragment$key = {
  readonly " $data"?: SubmissionLayoutFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionLayoutFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmissionLayoutFragment",
  "selections": [
    {
      "alias": null,
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "entity",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Submission",
  "abstractKey": null
};

(node as any).hash = "64571280cac7a488099c5f567e6d215b";

export default node;
