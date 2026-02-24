/**
 * @generated SignedSource<<19c060f379129b376d8599c9615ea813>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SchemaKind = "COLLECTION" | "COMMUNITY" | "ITEM" | "%future added value";
export type editMySubmissionQuery$variables = {
  schemaKind: SchemaKind;
};
export type editMySubmissionQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SchemaSelectFragment">;
};
export type editMySubmissionQuery = {
  response: editMySubmissionQuery$data;
  variables: editMySubmissionQuery$variables;
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
    "name": "editMySubmissionQuery",
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
    "name": "editMySubmissionQuery",
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
    "cacheID": "3ce7acdb4e5340996310dc88a529599b",
    "id": null,
    "metadata": {},
    "name": "editMySubmissionQuery",
    "operationKind": "query",
    "text": "query editMySubmissionQuery(\n  $schemaKind: SchemaKind!\n) {\n  ...SchemaSelectFragment\n}\n\nfragment SchemaSelectFragment on Query {\n  schemaVersionOptions(kind: $schemaKind) {\n    label\n    value\n    schemaDefinition {\n      slug\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "250b6169828bd4dc219c44aae7f44fd3";

export default node;
