/**
 * @generated SignedSource<<3f4f33eddb0257875d22689555e0df37>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectionSubmissionSettingsFragment$data = {
  readonly collectionId: string;
  readonly submissionTarget: {
    readonly " $fragmentSpreads": FragmentRefs<"SubmissionTargetConfigureFormFragment" | "SubmissionTargetStateToggleFragment">;
  } | null | undefined;
  readonly " $fragmentType": "CollectionSubmissionSettingsFragment";
};
export type CollectionSubmissionSettingsFragment$key = {
  readonly " $data"?: CollectionSubmissionSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectionSubmissionSettingsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectionSubmissionSettingsFragment",
  "selections": [
    {
      "alias": "collectionId",
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SubmissionTarget",
      "kind": "LinkedField",
      "name": "submissionTarget",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SubmissionTargetConfigureFormFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SubmissionTargetStateToggleFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Collection",
  "abstractKey": null
};

(node as any).hash = "61193f3cbbd77726f321dc00bc8ead9e";

export default node;
