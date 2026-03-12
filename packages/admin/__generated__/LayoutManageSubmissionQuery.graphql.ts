/**
 * @generated SignedSource<<03a4aa8f8ac97f9db6829ab4d2885534>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LayoutManageSubmissionQuery$variables = {
  slug: string;
};
export type LayoutManageSubmissionQuery$data = {
  readonly submission: {
    readonly canRequestReview: {
      readonly value: boolean;
    };
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"SubmissionLayoutFragment">;
  } | null | undefined;
};
export type LayoutManageSubmissionQuery = {
  response: LayoutManageSubmissionQuery$data;
  variables: LayoutManageSubmissionQuery$variables;
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
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
],
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "AuthorizationResult",
  "kind": "LinkedField",
  "name": "canRequestReview",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AuthorizationResult",
    "kind": "LinkedField",
    "name": "canTransition",
    "plural": false,
    "selections": (v3/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "lockedState",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "mutableState",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "fromState",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "toState",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LayoutManageSubmissionQuery",
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
          (v4/*: any*/),
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
    "name": "LayoutManageSubmissionQuery",
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
          (v4/*: any*/),
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
            "concreteType": "SubmissionStatus",
            "kind": "LinkedField",
            "name": "currentStatus",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "SubmissionStatus",
            "kind": "LinkedField",
            "name": "availableTransitions",
            "plural": true,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthorizationResult",
            "kind": "LinkedField",
            "name": "canReview",
            "plural": false,
            "selections": (v3/*: any*/),
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
    "cacheID": "b18e8d6c077374015775f3db5a89f0c7",
    "id": null,
    "metadata": {},
    "name": "LayoutManageSubmissionQuery",
    "operationKind": "query",
    "text": "query LayoutManageSubmissionQuery(\n  $slug: Slug!\n) {\n  submission(slug: $slug) {\n    id\n    canRequestReview {\n      value\n    }\n    ...SubmissionLayoutFragment\n  }\n}\n\nfragment SubmissionLayoutFragment on Submission {\n  id\n  state\n  currentStatus {\n    canTransition {\n      value\n    }\n    lockedState\n    mutableState\n    fromState\n    toState\n  }\n  availableTransitions {\n    canTransition {\n      value\n    }\n    lockedState\n    mutableState\n    fromState\n    toState\n  }\n  canReview {\n    value\n  }\n  canRequestReview {\n    value\n  }\n  entity {\n    __typename\n    __isEntity: __typename\n    title\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "f794f9f0ed46034a64e4674efa0efcf2";

export default node;
