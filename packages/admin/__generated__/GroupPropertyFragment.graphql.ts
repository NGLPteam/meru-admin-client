/**
 * @generated SignedSource<<89117cbb31bcabee1656423922651f19>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GroupPropertyFragment$data = {
  readonly legend: string | null | undefined;
  readonly path: string;
  readonly properties: ReadonlyArray<{
    readonly submittable: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"SchemaPropertyFragment">;
  }>;
  readonly " $fragmentType": "GroupPropertyFragment";
};
export type GroupPropertyFragment$key = {
  readonly " $data"?: GroupPropertyFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"GroupPropertyFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GroupPropertyFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "legend",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "path",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "properties",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "submittable",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SchemaPropertyFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "GroupProperty",
  "abstractKey": null
};

(node as any).hash = "4045b0e1f34c7ff0f7da1ef65ccba3ad";

export default node;
