/**
 * @generated SignedSource<<0708438695716110f39bd77a5604b47d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CurrentSubmissionFiltersQuery$variables = Record<PropertyKey, never>;
export type CurrentSubmissionFiltersQuery$data = {
  readonly schemaVersionOptions: ReadonlyArray<{
    readonly schemaVersion: {
      readonly id: string;
      readonly name: string;
    };
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
export type CurrentSubmissionFiltersQuery = {
  response: CurrentSubmissionFiltersQuery$data;
  variables: CurrentSubmissionFiltersQuery$variables;
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
    "name": "CurrentSubmissionFiltersQuery",
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
    "name": "CurrentSubmissionFiltersQuery",
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
    "cacheID": "898611ae96adbf87be1f8f4fa7062e2a",
    "id": null,
    "metadata": {},
    "name": "CurrentSubmissionFiltersQuery",
    "operationKind": "query",
    "text": "query CurrentSubmissionFiltersQuery {\n  schemaVersionOptions(kind: ITEM) {\n    schemaVersion {\n      id\n      name\n    }\n  }\n  submissionTargets {\n    nodes {\n      id\n      entity {\n        __typename\n        ... on Collection {\n          title\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "47d3d8d0a2175e507745765c77a8b352";

export default node;
