/**
 * @generated SignedSource<<39406a6bd4fed36a99440cb960d083a8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SchemaPropertyType = "ASSET" | "ASSETS" | "BOOLEAN" | "CONTRIBUTOR" | "CONTRIBUTORS" | "CONTROLLED_VOCABULARIES" | "CONTROLLED_VOCABULARY" | "DATE" | "EMAIL" | "ENTITIES" | "ENTITY" | "FLOAT" | "FULL_TEXT" | "GROUP" | "INTEGER" | "MARKDOWN" | "MULTISELECT" | "SELECT" | "STRING" | "TAGS" | "TIMESTAMP" | "UNKNOWN" | "URL" | "VARIABLE_DATE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SchemaFieldsDisplayFragment$data = {
  readonly schemaInstanceContext: {
    readonly fieldValues: any;
  };
  readonly schemaProperties: ReadonlyArray<{
    readonly __typename: string;
    readonly fullPath?: string;
    readonly isWide?: boolean;
    readonly label?: string;
    readonly legend?: string | null | undefined;
    readonly properties?: ReadonlyArray<{
      readonly fullPath: string;
      readonly isWide: boolean;
      readonly label: string;
      readonly type: SchemaPropertyType;
    }>;
    readonly type?: SchemaPropertyType;
  }>;
  readonly " $fragmentType": "SchemaFieldsDisplayFragment";
};
export type SchemaFieldsDisplayFragment$key = {
  readonly " $data"?: SchemaFieldsDisplayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SchemaFieldsDisplayFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fullPath",
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "label",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "type",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isWide",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SchemaFieldsDisplayFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SchemaInstanceContext",
      "kind": "LinkedField",
      "name": "schemaInstanceContext",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "fieldValues",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
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
          "selections": (v1/*: any*/),
          "type": "ScalarProperty",
          "abstractKey": "__isScalarProperty"
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
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
              "concreteType": null,
              "kind": "LinkedField",
              "name": "properties",
              "plural": true,
              "selections": (v1/*: any*/),
              "storageKey": null
            }
          ],
          "type": "GroupProperty",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SchemaInstance",
  "abstractKey": "__isSchemaInstance"
};
})();

(node as any).hash = "68b45956ffb2e18c8b70badc594823b5";

export default node;
