/**
 * @generated SignedSource<<272ce5e3c6a0b738175014fca002b747>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SubmissionFilterDrawerQuery$variables = Record<PropertyKey, never>;
export type SubmissionFilterDrawerQuery$data = {
  readonly schemaVersionOptions: ReadonlyArray<{
    readonly schemaVersion: {
      readonly id: string;
      readonly name: string;
    };
    readonly value: string;
  }>;
  readonly submissionTargets: {
    readonly nodes: ReadonlyArray<{
      readonly entity: {
        readonly title?: string;
      };
      readonly id: string;
    }>;
  };
};
export type SubmissionFilterDrawerQuery = {
  response: SubmissionFilterDrawerQuery$data;
  variables: SubmissionFilterDrawerQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "kind",
      "value": "ITEM"
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
      "name": "value",
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
        (v0/*: any*/),
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
  "storageKey": "schemaVersionOptions(kind:\"ITEM\")"
},
v2 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "Collection",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SubmissionFilterDrawerQuery",
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "SubmissionTargetConnection",
        "kind": "LinkedField",
        "name": "submissionTargets",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SubmissionTarget",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "entity",
                "plural": false,
                "selections": [
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SubmissionFilterDrawerQuery",
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "SubmissionTargetConnection",
        "kind": "LinkedField",
        "name": "submissionTargets",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SubmissionTarget",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "entity",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  (v0/*: any*/)
                ],
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
    "cacheID": "c59803ea2985a7186ba9f1ca3ada3d9a",
    "id": null,
    "metadata": {},
    "name": "SubmissionFilterDrawerQuery",
    "operationKind": "query",
    "text": "query SubmissionFilterDrawerQuery {\n  schemaVersionOptions(kind: ITEM) {\n    value\n    schemaVersion {\n      id\n      name\n    }\n  }\n  submissionTargets {\n    nodes {\n      id\n      entity {\n        __typename\n        ... on Collection {\n          title\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f0fb13d8448c48b89ea1fcc0b7cf8108";

export default node;
