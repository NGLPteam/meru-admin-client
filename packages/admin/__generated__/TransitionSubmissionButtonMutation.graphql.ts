/**
 * @generated SignedSource<<39d434ea9b7f8db5a987a7437f7a4abd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmissionState = "APPROVED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REVISION_REQUESTED" | "SUBMITTED" | "UNDER_REVIEW" | "%future added value";
export type SubmissionChangeStateInput = {
  clientMutationId?: string | null | undefined;
  submissionId: string;
  toState: SubmissionState;
};
export type TransitionSubmissionButtonMutation$variables = {
  input: SubmissionChangeStateInput;
};
export type TransitionSubmissionButtonMutation$data = {
  readonly submissionChangeState: {
    readonly submission: {
      readonly " $fragmentSpreads": FragmentRefs<"SubmissionLayoutFragment">;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"MutationForm_mutationErrors">;
  } | null | undefined;
};
export type TransitionSubmissionButtonMutation = {
  response: TransitionSubmissionButtonMutation$data;
  variables: TransitionSubmissionButtonMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MutationAttributeError",
      "kind": "LinkedField",
      "name": "attributeErrors",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "path",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "messages",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MutationGlobalError",
      "kind": "LinkedField",
      "name": "globalErrors",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "message",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "StandardMutationPayload",
  "abstractKey": "__isStandardMutationPayload"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
],
v5 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AuthorizationResult",
    "kind": "LinkedField",
    "name": "canTransition",
    "plural": false,
    "selections": (v4/*: any*/),
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
    "name": "TransitionSubmissionButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SubmissionChangeStatePayload",
        "kind": "LinkedField",
        "name": "submissionChangeState",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
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
          },
          {
            "kind": "InlineDataFragmentSpread",
            "name": "MutationForm_mutationErrors",
            "selections": [
              (v2/*: any*/)
            ],
            "args": null,
            "argumentDefinitions": []
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TransitionSubmissionButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SubmissionChangeStatePayload",
        "kind": "LinkedField",
        "name": "submissionChangeState",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Submission",
            "kind": "LinkedField",
            "name": "submission",
            "plural": false,
            "selections": [
              (v3/*: any*/),
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
                "selections": (v4/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AuthorizationResult",
                "kind": "LinkedField",
                "name": "canRequestReview",
                "plural": false,
                "selections": (v4/*: any*/),
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
                    "name": "slug",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "223e02a664c5159761929cd3184e734f",
    "id": null,
    "metadata": {},
    "name": "TransitionSubmissionButtonMutation",
    "operationKind": "mutation",
    "text": "mutation TransitionSubmissionButtonMutation(\n  $input: SubmissionChangeStateInput!\n) {\n  submissionChangeState(input: $input) {\n    submission {\n      ...SubmissionLayoutFragment\n      id\n    }\n    ...MutationForm_mutationErrors\n  }\n}\n\nfragment MutationForm_mutationErrors on StandardMutationPayload {\n  __isStandardMutationPayload: __typename\n  attributeErrors {\n    path\n    type\n    messages\n  }\n  globalErrors {\n    message\n  }\n}\n\nfragment SubmissionLayoutFragment on Submission {\n  id\n  state\n  currentStatus {\n    canTransition {\n      value\n    }\n    lockedState\n    mutableState\n    fromState\n    toState\n  }\n  availableTransitions {\n    canTransition {\n      value\n    }\n    lockedState\n    mutableState\n    fromState\n    toState\n  }\n  canReview {\n    value\n  }\n  canRequestReview {\n    value\n  }\n  entity {\n    __typename\n    __isEntity: __typename\n    slug\n    title\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "652d5af5471d2a6483a1a42cc1a29582";

export default node;
