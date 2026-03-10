/**
 * @generated SignedSource<<a871b6edf0f6fc556a690dcd409fe525>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SubmissionReviewDrawerQuery$variables = {
  slug: string;
};
export type SubmissionReviewDrawerQuery$data = {
  readonly submission: {
    readonly entity: {
      readonly id: string;
      readonly title: string;
    } | null | undefined;
    readonly id: string;
  } | null | undefined;
};
export type SubmissionReviewDrawerQuery = {
  response: SubmissionReviewDrawerQuery$data;
  variables: SubmissionReviewDrawerQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
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
  "name": "title",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SubmissionReviewDrawerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Submission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "entity",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SubmissionReviewDrawerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Submission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isEntity"
              },
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b005109ba6a12395203be8c924825c42",
    "id": null,
    "metadata": {},
    "name": "SubmissionReviewDrawerQuery",
    "operationKind": "query",
    "text": "query SubmissionReviewDrawerQuery(\n  $slug: Slug!\n) {\n  submission(slug: $slug) {\n    id\n    entity {\n      __typename\n      __isEntity: __typename\n      id\n      title\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1a78f898a69fe91453ce00bda3517ba4";

export default node;
