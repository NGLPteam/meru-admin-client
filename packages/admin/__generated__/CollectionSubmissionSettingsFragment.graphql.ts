/**
 * @generated SignedSource<<5a29b98012247c58320ecd6120b11d3d>>
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
  readonly schemaVersion: {
    readonly submittableVersions: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
    }>;
  };
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
      "concreteType": "SchemaVersion",
      "kind": "LinkedField",
      "name": "schemaVersion",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SchemaVersion",
          "kind": "LinkedField",
          "name": "submittableVersions",
          "plural": true,
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
              "name": "name",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
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

(node as any).hash = "3e8155fa66ab95b24e1ce69415dfa733";

export default node;
