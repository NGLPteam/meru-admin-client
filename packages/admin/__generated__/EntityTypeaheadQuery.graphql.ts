/**
 * @generated SignedSource<<db9d9f81fde8282b99ef872b215169d6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type EntityDescendantScopeFilter = "ALL" | "ANY_ENTITY" | "ANY_LINK" | "COLLECTION" | "COLLECTION_OR_LINK" | "ITEM" | "ITEM_OR_LINK" | "LINKED_COLLECTION" | "LINKED_ITEM" | "%future added value";
export type EntityTypeaheadQuery$variables = {
  query: string;
  schema?: ReadonlyArray<string> | null | undefined;
  scope: EntityDescendantScopeFilter;
};
export type EntityTypeaheadQuery$data = {
  readonly search: {
    readonly results: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly entity: {
            readonly __typename?: string;
            readonly id?: string;
          };
          readonly slug: string;
          readonly title: string;
        };
      }>;
    };
  };
};
export type EntityTypeaheadQuery = {
  response: EntityTypeaheadQuery$data;
  variables: EntityTypeaheadQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "query"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "schema"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "scope"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "visibility",
    "value": "ALL"
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "access",
    "value": "UPDATE"
  },
  {
    "kind": "Literal",
    "name": "order",
    "value": "TITLE_ASCENDING"
  },
  {
    "kind": "Literal",
    "name": "page",
    "value": 1
  },
  {
    "kind": "Literal",
    "name": "perPage",
    "value": 25
  },
  {
    "kind": "Variable",
    "name": "prefix",
    "variableName": "query"
  },
  {
    "kind": "Variable",
    "name": "schema",
    "variableName": "schema"
  },
  {
    "kind": "Variable",
    "name": "scope",
    "variableName": "scope"
  }
],
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
  "name": "slug",
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
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EntityTypeaheadQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SearchScope",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "SearchResultConnection",
            "kind": "LinkedField",
            "name": "results",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SearchResultEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SearchResult",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "entity",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v5/*: any*/),
                              (v6/*: any*/)
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
            ],
            "storageKey": null
          }
        ],
        "storageKey": "search(visibility:\"ALL\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EntityTypeaheadQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SearchScope",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "SearchResultConnection",
            "kind": "LinkedField",
            "name": "results",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SearchResultEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SearchResult",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "entity",
                        "plural": false,
                        "selections": [
                          (v6/*: any*/),
                          (v5/*: any*/),
                          {
                            "kind": "TypeDiscriminator",
                            "abstractKey": "__isNode"
                          }
                        ],
                        "storageKey": null
                      },
                      (v5/*: any*/)
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
        "storageKey": "search(visibility:\"ALL\")"
      }
    ]
  },
  "params": {
    "cacheID": "3c9c6add5575445982416396e9203003",
    "id": null,
    "metadata": {},
    "name": "EntityTypeaheadQuery",
    "operationKind": "query",
    "text": "query EntityTypeaheadQuery(\n  $query: String!\n  $schema: [String!]\n  $scope: EntityDescendantScopeFilter!\n) {\n  search(visibility: ALL) {\n    results(access: UPDATE, prefix: $query, page: 1, perPage: 25, order: TITLE_ASCENDING, schema: $schema, scope: $scope) {\n      edges {\n        node {\n          title\n          slug\n          entity {\n            __typename\n            ... on Node {\n              __isNode: __typename\n              id\n              __typename\n            }\n            id\n          }\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "37a0f64a586be00e4daed1aa4fd83fda";

export default node;
