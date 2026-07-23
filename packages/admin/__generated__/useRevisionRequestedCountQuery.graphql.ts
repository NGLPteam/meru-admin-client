/**
 * @generated SignedSource<<932193ee4de1e183240f4e11c6d8b44a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type useRevisionRequestedCountQuery$variables = {
  userIds: ReadonlyArray<string>;
};
export type useRevisionRequestedCountQuery$data = {
  readonly submissions: {
    readonly pageInfo: {
      readonly totalCount: number;
    };
  };
};
export type useRevisionRequestedCountQuery = {
  response: useRevisionRequestedCountQuery$data;
  variables: useRevisionRequestedCountQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userIds"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Literal",
            "name": "inState",
            "value": [
              "REVISION_REQUESTED"
            ]
          },
          {
            "kind": "Variable",
            "name": "userIds",
            "variableName": "userIds"
          }
        ],
        "kind": "ObjectValue",
        "name": "filters"
      },
      {
        "kind": "Literal",
        "name": "perPage",
        "value": 1
      }
    ],
    "concreteType": "SubmissionConnection",
    "kind": "LinkedField",
    "name": "submissions",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PageInfo",
        "kind": "LinkedField",
        "name": "pageInfo",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useRevisionRequestedCountQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useRevisionRequestedCountQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0063b2c8338ada1701810b67a90e9ecf",
    "id": null,
    "metadata": {},
    "name": "useRevisionRequestedCountQuery",
    "operationKind": "query",
    "text": "query useRevisionRequestedCountQuery(\n  $userIds: [ID!]!\n) {\n  submissions(filters: {inState: [REVISION_REQUESTED], userIds: $userIds}, perPage: 1) {\n    pageInfo {\n      totalCount\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bd1b4a6026f9e1491ca3fb09541e1689";

export default node;
