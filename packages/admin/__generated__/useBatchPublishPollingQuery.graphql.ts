/**
 * @generated SignedSource<<2663331e477017571010eb45477e7511>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SubmissionBatchPublicationState = "BATCHED" | "FINISHED" | "PENDING" | "%future added value";
export type useBatchPublishPollingQuery$variables = {
  id: string;
};
export type useBatchPublishPollingQuery$data = {
  readonly node: {
    readonly id?: string;
    readonly state?: SubmissionBatchPublicationState;
  } | null | undefined;
};
export type useBatchPublishPollingQuery = {
  response: useBatchPublishPollingQuery$data;
  variables: useBatchPublishPollingQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useBatchPublishPollingQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "type": "SubmissionBatchPublication",
            "abstractKey": null
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useBatchPublishPollingQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
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
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/)
            ],
            "type": "SubmissionBatchPublication",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "350a9c853da85251d18e4a913fac1e6e",
    "id": null,
    "metadata": {},
    "name": "useBatchPublishPollingQuery",
    "operationKind": "query",
    "text": "query useBatchPublishPollingQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on SubmissionBatchPublication {\n      id\n      state\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "64add48651bd6e1a9282e1b42b5c1065";

export default node;
