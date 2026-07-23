/**
 * @generated SignedSource<<06573f2fee88e91bfe2428dfff15b6a6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SubmissionBatchPublishInput = {
  clientMutationId?: string | null | undefined;
  submissionIds: ReadonlyArray<string>;
  submissionTargetId: string;
};
export type useBatchPublishSubmissionsMutation$variables = {
  input: SubmissionBatchPublishInput;
};
export type useBatchPublishSubmissionsMutation$data = {
  readonly submissionBatchPublish: {
    readonly attributeErrors: ReadonlyArray<{
      readonly messages: ReadonlyArray<string>;
      readonly path: string;
      readonly type: string;
    }>;
    readonly globalErrors: ReadonlyArray<{
      readonly message: string;
      readonly type: string;
    }>;
    readonly submissionBatchPublication: {
      readonly id: string;
      readonly publicationsCount: number;
    } | null | undefined;
    readonly submissionTarget: {
      readonly entity: {
        readonly title: string;
      };
      readonly id: string;
    } | null | undefined;
  } | null | undefined;
};
export type useBatchPublishSubmissionsMutation = {
  response: useBatchPublishSubmissionsMutation$data;
  variables: useBatchPublishSubmissionsMutation$variables;
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
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "SubmissionBatchPublication",
  "kind": "LinkedField",
  "name": "submissionBatchPublication",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "publicationsCount",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v6 = {
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
    (v5/*: any*/)
  ],
  "storageKey": null
},
v7 = {
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
    (v5/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useBatchPublishSubmissionsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SubmissionBatchPublishPayload",
        "kind": "LinkedField",
        "name": "submissionBatchPublish",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "SubmissionTarget",
            "kind": "LinkedField",
            "name": "submissionTarget",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "entity",
                "plural": false,
                "selections": [
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/),
          (v7/*: any*/)
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
    "name": "useBatchPublishSubmissionsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SubmissionBatchPublishPayload",
        "kind": "LinkedField",
        "name": "submissionBatchPublish",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "SubmissionTarget",
            "kind": "LinkedField",
            "name": "submissionTarget",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
                  (v4/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/),
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "06ee2df69b09676e2196ff96c30d4c81",
    "id": null,
    "metadata": {},
    "name": "useBatchPublishSubmissionsMutation",
    "operationKind": "mutation",
    "text": "mutation useBatchPublishSubmissionsMutation(\n  $input: SubmissionBatchPublishInput!\n) {\n  submissionBatchPublish(input: $input) {\n    submissionBatchPublication {\n      id\n      publicationsCount\n    }\n    submissionTarget {\n      id\n      entity {\n        __typename\n        __isEntity: __typename\n        title\n        id\n      }\n    }\n    attributeErrors {\n      messages\n      path\n      type\n    }\n    globalErrors {\n      message\n      type\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bd1143aa6df05bfa20d4e3985ab920c6";

export default node;
