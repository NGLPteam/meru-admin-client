/**
 * @generated SignedSource<<9a22ebc6cfef75532056a097b7a33b6a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SubmissionTargetState = "CLOSED" | "OPEN" | "%future added value";
export type SubmissionTargetCloseInput = {
  clientMutationId?: string | null | undefined;
  submissionTargetId: string;
};
export type SubmissionTargetStateToggleCloseMutation$variables = {
  input: SubmissionTargetCloseInput;
};
export type SubmissionTargetStateToggleCloseMutation$data = {
  readonly submissionTargetClose: {
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
export type SubmissionTargetStateToggleCloseMutation = {
  response: SubmissionTargetStateToggleCloseMutation$data;
  variables: SubmissionTargetStateToggleCloseMutation$variables;
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
    "concreteType": "SubmissionTargetClosePayload",
    "kind": "LinkedField",
    "name": "submissionTargetClose",
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
    "name": "SubmissionTargetStateToggleCloseMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SubmissionTargetStateToggleCloseMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a3821cb340616092dd25ffff34fc5338",
    "id": null,
    "metadata": {},
    "name": "SubmissionTargetStateToggleCloseMutation",
    "operationKind": "mutation",
    "text": "mutation SubmissionTargetStateToggleCloseMutation(\n  $input: SubmissionTargetCloseInput!\n) {\n  submissionTargetClose(input: $input) {\n    submissionTarget {\n      id\n      state\n    }\n    globalErrors {\n      message\n      type\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2e44798ee5fcc2bdd54381714bef65f0";

export default node;
