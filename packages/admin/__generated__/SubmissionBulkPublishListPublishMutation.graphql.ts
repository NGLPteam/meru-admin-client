/**
 * @generated SignedSource<<44a2382049201c556bcc0fceafca0f8a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SubmissionState = "APPROVED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REVISION_REQUESTED" | "SUBMITTED" | "UNDER_REVIEW" | "%future added value";
export type SubmissionChangeStateInput = {
  clientMutationId?: string | null | undefined;
  submissionId: string;
  toState: SubmissionState;
};
export type SubmissionBulkPublishListPublishMutation$variables = {
  input: SubmissionChangeStateInput;
};
export type SubmissionBulkPublishListPublishMutation$data = {
  readonly submissionChangeState: {
    readonly attributeErrors: ReadonlyArray<{
      readonly messages: ReadonlyArray<string>;
      readonly path: string;
      readonly type: string;
    }>;
    readonly globalErrors: ReadonlyArray<{
      readonly message: string;
      readonly type: string;
    }>;
    readonly submission: {
      readonly id: string;
      readonly state: SubmissionState;
    } | null | undefined;
  } | null | undefined;
};
export type SubmissionBulkPublishListPublishMutation = {
  response: SubmissionBulkPublishListPublishMutation$data;
  variables: SubmissionBulkPublishListPublishMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
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
        "concreteType": "MutationAttributeError",
        "kind": "LinkedField",
        "name": "attributeErrors",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "messages",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "path",
            "storageKey": null
          },
          (v1/*: any*/)
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
          (v1/*: any*/)
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
    "name": "SubmissionBulkPublishListPublishMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SubmissionBulkPublishListPublishMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "cdd8689f62d80a9395e1ef0efb393b0e",
    "id": null,
    "metadata": {},
    "name": "SubmissionBulkPublishListPublishMutation",
    "operationKind": "mutation",
    "text": "mutation SubmissionBulkPublishListPublishMutation(\n  $input: SubmissionChangeStateInput!\n) {\n  submissionChangeState(input: $input) {\n    submission {\n      id\n      state\n    }\n    attributeErrors {\n      messages\n      path\n      type\n    }\n    globalErrors {\n      message\n      type\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d0dc1fe7d80d7452da6a741a0b2c0dad";

export default node;
