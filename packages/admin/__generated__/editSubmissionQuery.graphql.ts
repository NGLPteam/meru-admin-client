/**
 * @generated SignedSource<<fc5cad25a47fc5a8237ca076c61391ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SchemaKind = "COLLECTION" | "COMMUNITY" | "ITEM" | "%future added value";
export type editSubmissionQuery$variables = {
  schemaKind: SchemaKind;
};
export type editSubmissionQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SchemaSelectFragment">;
};
export type editSubmissionQuery = {
  response: editSubmissionQuery$data;
  variables: editSubmissionQuery$variables;
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
    "name": "editSubmissionQuery",
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
    "name": "editSubmissionQuery",
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
    "cacheID": "e31ad615cbd3505703d3bee6e356cea0",
    "id": null,
    "metadata": {},
    "name": "editSubmissionQuery",
    "operationKind": "query",
    "text": "query editSubmissionQuery(\n  $schemaKind: SchemaKind!\n) {\n  ...SchemaSelectFragment\n}\n\nfragment SchemaSelectFragment on Query {\n  schemaVersionOptions(kind: $schemaKind) {\n    label\n    value\n    schemaDefinition {\n      slug\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "73f595b283a78b9707acffeb35653fee";

export default node;
