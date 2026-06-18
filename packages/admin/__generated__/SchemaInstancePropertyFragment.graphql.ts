/**
 * @generated SignedSource<<bb82630be83ee448ec4c826c52f23e38>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SchemaInstancePropertyFragment$data = {
  readonly __typename: string;
  readonly properties?: ReadonlyArray<{
    readonly submittable: boolean;
  }>;
  readonly submittable?: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"GroupPropertyFragment" | "SchemaPropertyFragment">;
  readonly " $fragmentType": "SchemaInstancePropertyFragment";
};
export type SchemaInstancePropertyFragment$key = {
  readonly " $data"?: SchemaInstancePropertyFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SchemaInstancePropertyFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "submittable",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SchemaInstancePropertyFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v0/*: any*/),
      "type": "ScalarProperty",
      "abstractKey": "__isScalarProperty"
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "properties",
          "plural": true,
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "GroupPropertyFragment"
        }
      ],
      "type": "GroupProperty",
      "abstractKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SchemaPropertyFragment"
    }
  ],
  "type": "SchemaProperty",
  "abstractKey": "__isSchemaProperty"
};
})();

(node as any).hash = "c6056d48f91f8e7330fdfd8e0f331929";

export default node;
