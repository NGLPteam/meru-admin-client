/**
 * @generated SignedSource<<c521249849798013e7e1112a23ce3943>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ContributorTypeaheadQuery$variables = {
  query: string;
};
export type ContributorTypeaheadQuery$data = {
  readonly contributors: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: "OrganizationContributor";
        readonly id: string;
        readonly legalName: string | null | undefined;
      } | {
        readonly __typename: "PersonContributor";
        readonly familyName: string | null | undefined;
        readonly givenName: string | null | undefined;
        readonly id: string;
      } | {
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        readonly __typename: "%other";
      };
    }>;
  };
};
export type ContributorTypeaheadQuery = {
  response: ContributorTypeaheadQuery$data;
  variables: ContributorTypeaheadQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "query"
  }
],
v1 = [
  {
    "fields": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "needle",
            "variableName": "query"
          },
          {
            "kind": "Literal",
            "name": "strategy",
            "value": "FUZZY"
          }
        ],
        "kind": "ObjectValue",
        "name": "nameSearch"
      }
    ],
    "kind": "ObjectValue",
    "name": "filters"
  },
  {
    "kind": "Literal",
    "name": "order",
    "value": "NAME_ASCENDING"
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
  "name": "givenName",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "familyName",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "legalName",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ContributorTypeaheadQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AnyContributorConnection",
        "kind": "LinkedField",
        "name": "contributors",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AnyContributorEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ],
                    "type": "PersonContributor",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v2/*: any*/),
                      (v6/*: any*/),
                      (v5/*: any*/)
                    ],
                    "type": "OrganizationContributor",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              }
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
    "name": "ContributorTypeaheadQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AnyContributorConnection",
        "kind": "LinkedField",
        "name": "contributors",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AnyContributorEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ],
                    "type": "PersonContributor",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v6/*: any*/),
                      (v5/*: any*/)
                    ],
                    "type": "OrganizationContributor",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v5/*: any*/)
                    ],
                    "type": "Node",
                    "abstractKey": "__isNode"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "684cf6510f04e582b0f590b1268255f6",
    "id": null,
    "metadata": {},
    "name": "ContributorTypeaheadQuery",
    "operationKind": "query",
    "text": "query ContributorTypeaheadQuery(\n  $query: String!\n) {\n  contributors(filters: {nameSearch: {needle: $query, strategy: FUZZY}}, page: 1, perPage: 50, order: NAME_ASCENDING) {\n    edges {\n      node {\n        __typename\n        ... on PersonContributor {\n          __typename\n          givenName\n          familyName\n          id\n        }\n        ... on OrganizationContributor {\n          __typename\n          legalName\n          id\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "925ef7d90320860a576e5766a3ba8d4f";

export default node;
