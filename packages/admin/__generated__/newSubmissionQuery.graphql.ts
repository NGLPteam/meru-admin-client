/**
 * @generated SignedSource<<f1537bf22b38c23f7c8c261c3e53048c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type newSubmissionQuery$variables = Record<PropertyKey, never>;
export type newSubmissionQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CanSubmitCheckFragment">;
};
export type newSubmissionQuery = {
  response: newSubmissionQuery$data;
  variables: newSubmissionQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "newSubmissionQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "CanSubmitCheckFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "newSubmissionQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GlobalConfiguration",
        "kind": "LinkedField",
        "name": "globalConfiguration",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "DepositingSettings",
            "kind": "LinkedField",
            "name": "depositing",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "agreement",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "filters",
            "value": {
              "inState": [
                "OPEN"
              ]
            }
          }
        ],
        "concreteType": "SubmissionTargetConnection",
        "kind": "LinkedField",
        "name": "submissionTargets",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SubmissionTarget",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "depositMode",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AuthorizationResult",
                "kind": "LinkedField",
                "name": "canDeposit",
                "plural": false,
                "selections": (v1/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AuthorizationResult",
                "kind": "LinkedField",
                "name": "canRequestDepositAccess",
                "plural": false,
                "selections": (v1/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "entity",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v0/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "slug",
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "type": "Collection",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SubmissionDepositTarget",
                "kind": "LinkedField",
                "name": "depositTargets",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "entity",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
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
                              (v0/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "Collection",
                        "abstractKey": null
                      },
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "agreementRequired",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "agreementContent",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SubmissionTargetDescription",
                "kind": "LinkedField",
                "name": "description",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "instructions",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SchemaVersion",
                "kind": "LinkedField",
                "name": "schemaVersions",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "submissionTargets(filters:{\"inState\":[\"OPEN\"]})"
      }
    ]
  },
  "params": {
    "cacheID": "db1d6b40552bf05ae6cc936f6627dc6f",
    "id": null,
    "metadata": {},
    "name": "newSubmissionQuery",
    "operationKind": "query",
    "text": "query newSubmissionQuery {\n  ...CanSubmitCheckFragment\n}\n\nfragment CanSubmitCheckFragment on Query {\n  globalConfiguration {\n    depositing {\n      agreement\n    }\n    id\n  }\n  submissionTargets(filters: {inState: [OPEN]}) {\n    nodes {\n      id\n      depositMode\n      canDeposit {\n        value\n      }\n      canRequestDepositAccess {\n        value\n      }\n      entity {\n        __typename\n        ... on Collection {\n          id\n          slug\n          title\n        }\n        id\n      }\n      depositTargets {\n        id\n        entity {\n          __typename\n          ... on Collection {\n            title\n            submissionTarget {\n              id\n            }\n          }\n          id\n        }\n      }\n      agreementRequired\n      agreementContent\n      description {\n        instructions\n      }\n      schemaVersions {\n        id\n        name\n        identifier\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d8a07432ce104de98c14ea859e27b6d5";

export default node;
