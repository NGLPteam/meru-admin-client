/**
 * @generated SignedSource<<df470decf1b95374bf0c3d473260efc6>>
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
export type SubmissionTargetConfigureFormOpenMutation$variables = {
  input: SubmissionTargetOpenInput;
};
export type SubmissionTargetConfigureFormOpenMutation$data = {
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
export type SubmissionTargetConfigureFormOpenMutation = {
  response: SubmissionTargetConfigureFormOpenMutation$data;
  variables: SubmissionTargetConfigureFormOpenMutation$variables;
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
    "name": "SubmissionTargetConfigureFormOpenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SubmissionTargetConfigureFormOpenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "47d12fe045adca1f1c55b8f00f3be78e",
    "id": null,
    "metadata": {},
    "name": "SubmissionTargetConfigureFormOpenMutation",
    "operationKind": "mutation",
    "text": "mutation SubmissionTargetConfigureFormOpenMutation(\n  $input: SubmissionTargetOpenInput!\n) {\n  submissionTargetOpen(input: $input) {\n    submissionTarget {\n      id\n      state\n    }\n    globalErrors {\n      message\n      type\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c16e793abec0edd288fda85920dbe304";

export default node;
