/**
 * @generated SignedSource<<aacd866bd861b361577569ddc57d42ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SubmissionDepositMode = "DESCENDANT" | "DIRECT" | "%future added value";
export type newSubmissionCollectionQuery$variables = {
  slug: string;
};
export type newSubmissionCollectionQuery$data = {
  readonly collection: {
    readonly id: string;
    readonly submissionTarget: {
      readonly canDeposit: {
        readonly value: boolean;
      };
      readonly canRequestDepositAccess: {
        readonly value: boolean;
      };
      readonly depositMode: SubmissionDepositMode;
      readonly depositTargets: ReadonlyArray<{
        readonly entity: {
          readonly submissionTarget?: {
            readonly id: string;
          } | null | undefined;
          readonly title?: string;
        };
        readonly id: string;
      }>;
      readonly id: string;
      readonly schemaVersions: ReadonlyArray<{
        readonly id: string;
        readonly identifier: string;
        readonly name: string;
      }>;
    } | null | undefined;
    readonly title: string;
  } | null | undefined;
};
export type newSubmissionCollectionQuery = {
  response: newSubmissionCollectionQuery$data;
  variables: newSubmissionCollectionQuery$variables;
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "depositMode",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
],
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "AuthorizationResult",
  "kind": "LinkedField",
  "name": "canDeposit",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "AuthorizationResult",
  "kind": "LinkedField",
  "name": "canRequestDepositAccess",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v8 = {
  "kind": "InlineFragment",
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
        (v2/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Collection",
  "abstractKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "SchemaVersion",
  "kind": "LinkedField",
  "name": "schemaVersions",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "identifier",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "newSubmissionCollectionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Collection",
        "kind": "LinkedField",
        "name": "collection",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
              (v4/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "SubmissionDepositTarget",
                "kind": "LinkedField",
                "name": "depositTargets",
                "plural": true,
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
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": null
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
    "name": "newSubmissionCollectionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Collection",
        "kind": "LinkedField",
        "name": "collection",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
              (v4/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "SubmissionDepositTarget",
                "kind": "LinkedField",
                "name": "depositTargets",
                "plural": true,
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
                      (v8/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6ca54bf545d4dc359f48b35f5d049bce",
    "id": null,
    "metadata": {},
    "name": "newSubmissionCollectionQuery",
    "operationKind": "query",
    "text": "query newSubmissionCollectionQuery(\n  $slug: Slug!\n) {\n  collection(slug: $slug) {\n    id\n    title\n    submissionTarget {\n      id\n      depositMode\n      canDeposit {\n        value\n      }\n      canRequestDepositAccess {\n        value\n      }\n      depositTargets {\n        id\n        entity {\n          __typename\n          ... on Collection {\n            title\n            submissionTarget {\n              id\n            }\n          }\n          id\n        }\n      }\n      schemaVersions {\n        id\n        name\n        identifier\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b890b36d2bd26d5d564cc8984452c910";

export default node;
