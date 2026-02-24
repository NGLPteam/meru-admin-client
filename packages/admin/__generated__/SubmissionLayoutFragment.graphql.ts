/**
 * @generated SignedSource<<12be081833a177b0b3007657eeb20133>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmissionLayoutFragment$data = {
  readonly __typename: "Item";
  readonly slug: string;
  readonly title: string;
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
      "name": "__typename",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "Item",
  "abstractKey": null
};

(node as any).hash = "f5a8320104a4ff90b3599b2a92b6b308";

export default node;
