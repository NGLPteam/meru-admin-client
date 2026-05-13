/**
 * @generated SignedSource<<ad0d4cc578c8a86e597d1aed170f80d5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type usePendingReviewCountQuery$variables = {
  userIds: ReadonlyArray<string>;
};
export type usePendingReviewCountQuery$data = {
  readonly submissionReviews: {
    readonly pageInfo: {
      readonly totalCount: number;
    };
  };
};
export type usePendingReviewCountQuery = {
  response: usePendingReviewCountQuery$data;
  variables: usePendingReviewCountQuery$variables;
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
              "PENDING"
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
    "concreteType": "SubmissionReviewConnection",
    "kind": "LinkedField",
    "name": "submissionReviews",
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
    "name": "usePendingReviewCountQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "usePendingReviewCountQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5d1134737b67a89cfb4c489d69df6e7a",
    "id": null,
    "metadata": {},
    "name": "usePendingReviewCountQuery",
    "operationKind": "query",
    "text": "query usePendingReviewCountQuery(\n  $userIds: [ID!]!\n) {\n  submissionReviews(filters: {inState: [PENDING], userIds: $userIds}, perPage: 1) {\n    pageInfo {\n      totalCount\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fb9269ee0073282a0755c199c7698c43";

export default node;
