/**
 * @generated SignedSource<<d8b5394c76dac0743814c39409c93075>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SubmissionReviewState = "APPROVED" | "PENDING" | "REJECTED" | "REVISION_REQUESTED" | "%future added value";
export type SubmissionState = "APPROVED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REVISION_REQUESTED" | "SUBMITTED" | "UNDER_REVIEW" | "%future added value";
export type SubmissionLeaveReviewInput = {
  clientMutationId?: string | null | undefined;
  comment?: string | null | undefined;
  submissionId: string;
  toState: SubmissionReviewState;
};
export type SubmissionReviewFormMutation$variables = {
  input: SubmissionLeaveReviewInput;
};
export type SubmissionReviewFormMutation$data = {
  readonly submissionLeaveReview: {
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
    readonly submissionReview: {
      readonly comment: string | null | undefined;
      readonly id: string;
      readonly state: SubmissionReviewState;
    } | null | undefined;
  } | null | undefined;
};
export type SubmissionReviewFormMutation = {
  response: SubmissionReviewFormMutation$data;
  variables: SubmissionReviewFormMutation$variables;
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
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "SubmissionLeaveReviewPayload",
    "kind": "LinkedField",
    "name": "submissionLeaveReview",
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
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "SubmissionReview",
        "kind": "LinkedField",
        "name": "submissionReview",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "comment",
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
          (v3/*: any*/)
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
          (v3/*: any*/)
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
    "name": "SubmissionReviewFormMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SubmissionReviewFormMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "8899ef98373bd8f7950afe73d550fdc9",
    "id": null,
    "metadata": {},
    "name": "SubmissionReviewFormMutation",
    "operationKind": "mutation",
    "text": "mutation SubmissionReviewFormMutation(\n  $input: SubmissionLeaveReviewInput!\n) {\n  submissionLeaveReview(input: $input) {\n    submission {\n      id\n      state\n    }\n    submissionReview {\n      id\n      state\n      comment\n    }\n    attributeErrors {\n      messages\n      path\n      type\n    }\n    globalErrors {\n      message\n      type\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "44f6cdad1063deaa5afe1f5fa0a2b21a";

export default node;
