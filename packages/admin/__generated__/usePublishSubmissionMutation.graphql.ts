/**
 * @generated SignedSource<<be2b6b63a19c7a9e1371404189691a0f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SubmissionState = "APPROVED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REVISION_REQUESTED" | "SUBMITTED" | "UNDER_REVIEW" | "%future added value";
export type SubmissionPublishInput = {
  clientMutationId?: string | null | undefined;
  submissionId: string;
};
export type usePublishSubmissionMutation$variables = {
  input: SubmissionPublishInput;
};
export type usePublishSubmissionMutation$data = {
  readonly submissionPublish: {
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
export type usePublishSubmissionMutation = {
  response: usePublishSubmissionMutation$data;
  variables: usePublishSubmissionMutation$variables;
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
    "concreteType": "SubmissionPublishPayload",
    "kind": "LinkedField",
    "name": "submissionPublish",
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
    "name": "usePublishSubmissionMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "usePublishSubmissionMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "cf1d780262c1611f0daeaf17fa9c8b95",
    "id": null,
    "metadata": {},
    "name": "usePublishSubmissionMutation",
    "operationKind": "mutation",
    "text": "mutation usePublishSubmissionMutation(\n  $input: SubmissionPublishInput!\n) {\n  submissionPublish(input: $input) {\n    submission {\n      id\n      state\n    }\n    attributeErrors {\n      messages\n      path\n      type\n    }\n    globalErrors {\n      message\n      type\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4da551414ab95ef1712801b057ecad51";

export default node;
