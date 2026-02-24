/**
 * @generated SignedSource<<25c2b68e1d9dc41500cd5b4f575aa21e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SchemaKind = "COLLECTION" | "COMMUNITY" | "ITEM" | "%future added value";
export type newSubmissionQuery$variables = {
  schemaKind: SchemaKind;
};
export type newSubmissionQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SchemaSelectFragment">;
};
export type newSubmissionQuery = {
  response: newSubmissionQuery$data;
  variables: newSubmissionQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "schemaKind"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "newSubmissionQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "SchemaSelectFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "newSubmissionQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "kind",
            "variableName": "schemaKind"
          }
        ],
        "concreteType": "SchemaVersionOption",
        "kind": "LinkedField",
        "name": "schemaVersionOptions",
        "plural": true,
        "selections": [
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
            "name": "value",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "SchemaDefinition",
            "kind": "LinkedField",
            "name": "schemaDefinition",
            "plural": false,
            "selections": [
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
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c6d3deeff48fd3577ce979aa8ab61689",
    "id": null,
    "metadata": {},
    "name": "newSubmissionQuery",
    "operationKind": "query",
    "text": "query newSubmissionQuery(\n  $schemaKind: SchemaKind!\n) {\n  ...SchemaSelectFragment\n}\n\nfragment SchemaSelectFragment on Query {\n  schemaVersionOptions(kind: $schemaKind) {\n    label\n    value\n    schemaDefinition {\n      slug\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d5804e429d22879a53aa11594eadd350";

export default node;
