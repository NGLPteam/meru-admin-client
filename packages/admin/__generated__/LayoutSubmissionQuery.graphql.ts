/**
 * @generated SignedSource<<fc29f7e02b0185862d234ff7ef4cbe19>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LayoutSubmissionQuery$variables = {
  slug: string;
};
export type LayoutSubmissionQuery$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"SubmissionLayoutFragment">;
  } | null | undefined;
};
export type LayoutSubmissionQuery = {
  response: LayoutSubmissionQuery$data;
  variables: LayoutSubmissionQuery$variables;
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LayoutSubmissionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Submission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SubmissionLayoutFragment"
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
    "name": "LayoutSubmissionQuery",
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
            "kind": "ScalarField",
            "name": "state",
            "storageKey": null
          },
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9bc3ca5271eb71ef3f4261250ac4d322",
    "id": null,
    "metadata": {},
    "name": "LayoutSubmissionQuery",
    "operationKind": "query",
    "text": "query LayoutSubmissionQuery(\n  $slug: Slug!\n) {\n  submission(slug: $slug) {\n    ...SubmissionLayoutFragment\n    id\n  }\n}\n\nfragment SubmissionLayoutFragment on Submission {\n  id\n  state\n  entity {\n    __typename\n    __isEntity: __typename\n    title\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "621b53760fbd790c12f87cdf44b1f8c9";

export default node;
