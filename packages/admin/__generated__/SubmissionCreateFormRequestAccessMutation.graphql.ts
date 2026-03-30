/**
 * @generated SignedSource<<f8334b07c8876bed7df5195c1384526f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DepositorRequestCreateInput = {
  clientMutationId?: string | null | undefined;
  message?: string | null | undefined;
  submissionTargetId: string;
};
export type SubmissionCreateFormRequestAccessMutation$variables = {
  input: DepositorRequestCreateInput;
};
export type SubmissionCreateFormRequestAccessMutation$data = {
  readonly depositorRequestCreate: {
    readonly depositorRequest: {
      readonly submissionTarget: {
        readonly canDeposit: {
          readonly value: boolean;
        };
      };
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"MutationForm_mutationErrors">;
  } | null | undefined;
};
export type SubmissionCreateFormRequestAccessMutation = {
  response: SubmissionCreateFormRequestAccessMutation$data;
  variables: SubmissionCreateFormRequestAccessMutation$variables;
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
  "alias": null,
  "args": null,
  "concreteType": "AuthorizationResult",
  "kind": "LinkedField",
  "name": "canDeposit",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "value",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v3 = {
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
v4 = {
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
    "name": "SubmissionCreateFormRequestAccessMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DepositorRequestCreatePayload",
        "kind": "LinkedField",
        "name": "depositorRequestCreate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "DepositorRequest",
            "kind": "LinkedField",
            "name": "depositorRequest",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SubmissionTarget",
                "kind": "LinkedField",
                "name": "submissionTarget",
                "plural": false,
                "selections": [
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "InlineDataFragmentSpread",
            "name": "MutationForm_mutationErrors",
            "selections": [
              (v3/*: any*/)
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
    "name": "SubmissionCreateFormRequestAccessMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DepositorRequestCreatePayload",
        "kind": "LinkedField",
        "name": "depositorRequestCreate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "DepositorRequest",
            "kind": "LinkedField",
            "name": "depositorRequest",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SubmissionTarget",
                "kind": "LinkedField",
                "name": "submissionTarget",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "945ae7dd79c19b74322d9997c60c9bbf",
    "id": null,
    "metadata": {},
    "name": "SubmissionCreateFormRequestAccessMutation",
    "operationKind": "mutation",
    "text": "mutation SubmissionCreateFormRequestAccessMutation(\n  $input: DepositorRequestCreateInput!\n) {\n  depositorRequestCreate(input: $input) {\n    depositorRequest {\n      submissionTarget {\n        canDeposit {\n          value\n        }\n        id\n      }\n      id\n    }\n    ...MutationForm_mutationErrors\n  }\n}\n\nfragment MutationForm_mutationErrors on StandardMutationPayload {\n  __isStandardMutationPayload: __typename\n  attributeErrors {\n    path\n    type\n    messages\n  }\n  globalErrors {\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "1155bab74756cd4099ee424524ee8e96";

export default node;
