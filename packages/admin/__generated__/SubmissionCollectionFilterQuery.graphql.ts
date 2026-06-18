/**
 * @generated SignedSource<<169684581b85a86f85cb21c849f7c0b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SubmissionCollectionFilterQuery$variables = Record<PropertyKey, never>;
export type SubmissionCollectionFilterQuery$data = {
  readonly submissionTargets: {
    readonly nodes: ReadonlyArray<{
      readonly entity: {
        readonly title?: string;
      };
      readonly id: string;
    }>;
  };
};
export type SubmissionCollectionFilterQuery = {
  response: SubmissionCollectionFilterQuery$data;
  variables: SubmissionCollectionFilterQuery$variables;
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
    "name": "SubmissionCollectionFilterQuery",
    "selections": [
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
                  (v1/*: any*/)
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
    "name": "SubmissionCollectionFilterQuery",
    "selections": [
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
                  (v1/*: any*/),
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
    "cacheID": "aeee00e2765c07bdac57145860083acb",
    "id": null,
    "metadata": {},
    "name": "SubmissionCollectionFilterQuery",
    "operationKind": "query",
    "text": "query SubmissionCollectionFilterQuery {\n  submissionTargets {\n    nodes {\n      id\n      entity {\n        __typename\n        ... on Collection {\n          title\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "809b5c15d667c394b9a8877eff5b1aed";

export default node;
