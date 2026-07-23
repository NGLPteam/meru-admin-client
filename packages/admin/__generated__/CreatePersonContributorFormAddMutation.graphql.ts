/**
 * @generated SignedSource<<9f47f89119c87912c405f0eaac9d725c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpsertContributionInput = {
  clientMutationId?: string | null | undefined;
  contributableId: string;
  contributorId: string;
  innerPosition?: number | null | undefined;
  metadata?: ContributionMetadataInput | null | undefined;
  outerPosition?: number | null | undefined;
  roleId?: string | null | undefined;
};
export type ContributionMetadataInput = {
  affiliation?: string | null | undefined;
  displayName?: string | null | undefined;
  location?: string | null | undefined;
  title?: string | null | undefined;
};
export type CreatePersonContributorFormAddMutation$variables = {
  input: UpsertContributionInput;
};
export type CreatePersonContributorFormAddMutation$data = {
  readonly upsertContribution: {
    readonly attributeErrors: ReadonlyArray<{
      readonly messages: ReadonlyArray<string>;
      readonly path: string;
      readonly type: string;
    }>;
    readonly contribution: {
      readonly contributionRole?: {
        readonly id: string;
        readonly label: string;
      };
      readonly id?: string;
      readonly item?: {
        readonly " $fragmentSpreads": FragmentRefs<"SubmissionContributorsFragment">;
      };
      readonly outerPosition?: number | null | undefined;
    } | null | undefined;
    readonly globalErrors: ReadonlyArray<{
      readonly message: string;
      readonly type: string;
    }>;
  } | null | undefined;
};
export type CreatePersonContributorFormAddMutation = {
  response: CreatePersonContributorFormAddMutation$data;
  variables: CreatePersonContributorFormAddMutation$variables;
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
  "kind": "ScalarField",
  "name": "outerPosition",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "ControlledVocabularyItem",
  "kind": "LinkedField",
  "name": "contributionRole",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v4/*: any*/)
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
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
    (v6/*: any*/)
  ],
  "storageKey": null
},
v8 = {
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
    (v6/*: any*/)
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v10 = {
  "kind": "InlineFragment",
  "selections": [
    (v2/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreatePersonContributorFormAddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpsertContributionPayload",
        "kind": "LinkedField",
        "name": "upsertContribution",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "contribution",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Item",
                    "kind": "LinkedField",
                    "name": "item",
                    "plural": false,
                    "selections": [
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "SubmissionContributorsFragment"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "ItemContribution",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v7/*: any*/),
          (v8/*: any*/)
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
    "name": "CreatePersonContributorFormAddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpsertContributionPayload",
        "kind": "LinkedField",
        "name": "upsertContribution",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "contribution",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Item",
                    "kind": "LinkedField",
                    "name": "item",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "order",
                            "value": "OLDEST"
                          },
                          {
                            "kind": "Literal",
                            "name": "page",
                            "value": 1
                          },
                          {
                            "kind": "Literal",
                            "name": "perPage",
                            "value": 50
                          }
                        ],
                        "concreteType": "ItemContributionConnection",
                        "kind": "LinkedField",
                        "name": "contributions",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ItemContribution",
                            "kind": "LinkedField",
                            "name": "nodes",
                            "plural": true,
                            "selections": [
                              (v2/*: any*/),
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ControlledVocabularyItem",
                                "kind": "LinkedField",
                                "name": "contributionRole",
                                "plural": false,
                                "selections": [
                                  (v4/*: any*/),
                                  (v2/*: any*/)
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "contributor",
                                "plural": false,
                                "selections": [
                                  (v9/*: any*/),
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "givenName",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "familyName",
                                        "storageKey": null
                                      }
                                    ],
                                    "type": "PersonContributor",
                                    "abstractKey": null
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "legalName",
                                        "storageKey": null
                                      }
                                    ],
                                    "type": "OrganizationContributor",
                                    "abstractKey": null
                                  },
                                  (v10/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "contributions(order:\"OLDEST\",page:1,perPage:50)"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "ItemContribution",
                "abstractKey": null
              },
              (v10/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/),
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0e3d72405b7c9168ebfde7446aaedee4",
    "id": null,
    "metadata": {},
    "name": "CreatePersonContributorFormAddMutation",
    "operationKind": "mutation",
    "text": "mutation CreatePersonContributorFormAddMutation(\n  $input: UpsertContributionInput!\n) {\n  upsertContribution(input: $input) {\n    contribution {\n      __typename\n      ... on ItemContribution {\n        id\n        outerPosition\n        contributionRole {\n          id\n          label\n        }\n        item {\n          ...SubmissionContributorsFragment\n          id\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    globalErrors {\n      message\n      type\n    }\n    attributeErrors {\n      messages\n      path\n      type\n    }\n  }\n}\n\nfragment SubmissionContributorsFragment on Item {\n  id\n  contributions(page: 1, perPage: 50, order: OLDEST) {\n    nodes {\n      id\n      outerPosition\n      contributionRole {\n        label\n        id\n      }\n      contributor {\n        __typename\n        ... on PersonContributor {\n          givenName\n          familyName\n        }\n        ... on OrganizationContributor {\n          legalName\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f8622868d5a77608fc40047c51566ad5";

export default node;
