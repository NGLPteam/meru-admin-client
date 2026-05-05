/**
 * @generated SignedSource<<fa9770770431791a134adcce7ae1c6bd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SchemaFormFieldsFragment$data = {
  readonly properties: ReadonlyArray<{
    readonly __typename: string;
    readonly properties?: ReadonlyArray<{
      readonly submittable: boolean;
    }>;
    readonly submittable?: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"SchemaInstancePropertyFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"SchemaFormFieldsContextFragment" | "SchemaSelectorDataFragment">;
  readonly " $fragmentType": "SchemaFormFieldsFragment";
};
export type SchemaFormFieldsFragment$key = {
  readonly " $data"?: SchemaFormFieldsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SchemaFormFieldsFragment">;
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
  "name": "SchemaFormFieldsFragment",
  "selections": [
    {
      "alias": "properties",
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "schemaProperties",
      "plural": true,
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
            }
          ],
          "type": "GroupProperty",
          "abstractKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SchemaInstancePropertyFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SchemaSelectorDataFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SchemaFormFieldsContextFragment"
    }
  ],
  "type": "SchemaInstance",
  "abstractKey": "__isSchemaInstance"
};
})();

(node as any).hash = "da0ec4823767c85ab4a68421d1e87e1a";

export default node;
