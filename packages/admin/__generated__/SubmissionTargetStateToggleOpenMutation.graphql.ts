/**
 * @generated SignedSource<<797ce4f1d96d365e565d5a5e4f1c5202>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SubmissionTargetState = "CLOSED" | "OPEN" | "%future added value";
export type SubmissionTargetOpenInput = {
  clientMutationId?: string | null | undefined;
  submissionTargetId: string;
};
export type SubmissionTargetStateToggleOpenMutation$variables = {
  input: SubmissionTargetOpenInput;
};
export type SubmissionTargetStateToggleOpenMutation$data = {
  readonly submissionTargetOpen: {
    readonly globalErrors: ReadonlyArray<{
      readonly message: string;
      readonly type: string;
    }>;
    readonly submissionTarget: {
      readonly id: string;
      readonly state: SubmissionTargetState;
    } | null | undefined;
  } | null | undefined;
};
export type SubmissionTargetStateToggleOpenMutation = {
  response: SubmissionTargetStateToggleOpenMutation$data;
  variables: SubmissionTargetStateToggleOpenMutation$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "SubmissionTargetOpenPayload",
    "kind": "LinkedField",
    "name": "submissionTargetOpen",
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "state",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "type",
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
    "name": "SubmissionTargetStateToggleOpenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SubmissionTargetStateToggleOpenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "89d957f4ed5906a6f1461c7bcb8fa801",
    "id": null,
    "metadata": {},
    "name": "SubmissionTargetStateToggleOpenMutation",
    "operationKind": "mutation",
    "text": "mutation SubmissionTargetStateToggleOpenMutation(\n  $input: SubmissionTargetOpenInput!\n) {\n  submissionTargetOpen(input: $input) {\n    submissionTarget {\n      id\n      state\n    }\n    globalErrors {\n      message\n      type\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4ed081a158bec7a542c015fcc619e66d";

export default node;
