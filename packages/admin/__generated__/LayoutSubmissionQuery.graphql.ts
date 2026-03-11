/**
 * @generated SignedSource<<cd8ba4cd6f26f1f6c3383b1af977cee3>>
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
    readonly id: string;
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
v4 = [
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
            "concreteType": "SubmissionStatus",
            "kind": "LinkedField",
            "name": "currentStatus",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "SubmissionStatus",
            "kind": "LinkedField",
            "name": "availableTransitions",
            "plural": true,
            "selections": (v4/*: any*/),
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
    "cacheID": "51e1deb6f8c6de386b0b6e27eb1a2ef0",
    "id": null,
    "metadata": {},
    "name": "LayoutSubmissionQuery",
    "operationKind": "query",
    "text": "query LayoutSubmissionQuery(\n  $slug: Slug!\n) {\n  submission(slug: $slug) {\n    id\n    ...SubmissionLayoutFragment\n  }\n}\n\nfragment SubmissionLayoutFragment on Submission {\n  id\n  state\n  currentStatus {\n    canTransition {\n      value\n    }\n    lockedState\n    mutableState\n    fromState\n    toState\n  }\n  availableTransitions {\n    canTransition {\n      value\n    }\n    lockedState\n    mutableState\n    fromState\n    toState\n  }\n  canReview {\n    value\n  }\n  entity {\n    __typename\n    __isEntity: __typename\n    title\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a05946859defe055d8c1ab6b863deaca";

export default node;
