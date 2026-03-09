/**
 * @generated SignedSource<<39dc26f57a2a9dded177f8b630fdac16>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EntityOrder = "OLDEST" | "POSITION_ASCENDING" | "POSITION_DESCENDING" | "PUBLISHED_ASCENDING" | "PUBLISHED_DESCENDING" | "RECENT" | "SCHEMA_NAME_ASCENDING" | "SCHEMA_NAME_DESCENDING" | "TITLE_ASCENDING" | "TITLE_DESCENDING" | "%future added value";
export type SearchPredicateInput = {
  and?: AndOperatorInput | null | undefined;
  dateEquals?: DateEqualsOperatorInput | null | undefined;
  dateGTE?: DateGTEOperatorInput | null | undefined;
  dateLTE?: DateLTEOperatorInput | null | undefined;
  equals?: EqualsOperatorInput | null | undefined;
  inAny?: InAnyOperatorInput | null | undefined;
  matches?: MatchesOperatorInput | null | undefined;
  numericGTE?: NumericGTEOperatorInput | null | undefined;
  numericLTE?: NumericLTEOperatorInput | null | undefined;
  or?: OrOperatorInput | null | undefined;
};
export type AndOperatorInput = {
  left: SearchPredicateInput;
  right: SearchPredicateInput;
};
export type DateEqualsOperatorInput = {
  path: string;
  value: string;
};
export type DateGTEOperatorInput = {
  path: string;
  value: string;
};
export type DateLTEOperatorInput = {
  path: string;
  value: string;
};
export type EqualsOperatorInput = {
  path: string;
  value: any;
};
export type InAnyOperatorInput = {
  path: string;
  value: ReadonlyArray<string>;
};
export type MatchesOperatorInput = {
  path: string;
  value: string;
};
export type NumericGTEOperatorInput = {
  path: string;
  value: number;
};
export type NumericLTEOperatorInput = {
  path: string;
  value: number;
};
export type OrOperatorInput = {
  left: SearchPredicateInput;
  right: SearchPredicateInput;
};
export type collectionsSlugCommunitiesPagesQuery$variables = {
  hasQuery: boolean;
  order?: EntityOrder | null | undefined;
  page: number;
  predicates?: ReadonlyArray<SearchPredicateInput> | null | undefined;
  query?: string | null | undefined;
  schema?: ReadonlyArray<string> | null | undefined;
  slug: string;
};
export type collectionsSlugCommunitiesPagesQuery$data = {
  readonly community: {
    readonly collections: {
      readonly " $fragmentSpreads": FragmentRefs<"CollectionListFragment">;
    };
    readonly search: {
      readonly " $fragmentSpreads": FragmentRefs<"CollectionListSearchFragment">;
    };
  } | null | undefined;
};
export type collectionsSlugCommunitiesPagesQuery = {
  response: collectionsSlugCommunitiesPagesQuery$data;
  variables: collectionsSlugCommunitiesPagesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasQuery"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "order"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "page"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "predicates"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "query"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "schema"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "slug"
},
v7 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v8 = {
  "kind": "Variable",
  "name": "order",
  "variableName": "order"
},
v9 = {
  "kind": "Variable",
  "name": "page",
  "variableName": "page"
},
v10 = {
  "kind": "Literal",
  "name": "perPage",
  "value": 20
},
v11 = [
  (v8/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/)
],
v12 = [
  {
    "kind": "Literal",
    "name": "maxDepth",
    "value": 1
  },
  {
    "kind": "Literal",
    "name": "visibility",
    "value": "ALL"
  }
],
v13 = {
  "kind": "Variable",
  "name": "predicates",
  "variableName": "predicates"
},
v14 = {
  "kind": "Variable",
  "name": "query",
  "variableName": "query"
},
v15 = {
  "kind": "Variable",
  "name": "schema",
  "variableName": "schema"
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "concreteType": "SchemaVersion",
  "kind": "LinkedField",
  "name": "schemaVersion",
  "plural": false,
  "selections": [
    (v20/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "number",
      "storageKey": null
    },
    (v16/*: any*/)
  ],
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "allowedActions",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageAttachment",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "storage",
      "storageKey": null
    },
    {
      "alias": "thumb",
      "args": null,
      "concreteType": "ImageSize",
      "kind": "LinkedField",
      "name": "small",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ImageDerivative",
          "kind": "LinkedField",
          "name": "webp",
          "plural": false,
          "selections": [
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "alt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "url",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "width",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "height",
                  "storageKey": null
                }
              ],
              "type": "Image",
              "abstractKey": "__isImage"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v25 = {
  "kind": "TypeDiscriminator",
  "abstractKey": "__isNode"
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v27 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "VariablePrecisionDate",
      "kind": "LinkedField",
      "name": "published",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "precision",
          "storageKey": null
        },
        (v26/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "ReferencesGlobalEntityDates",
  "abstractKey": "__isReferencesGlobalEntityDates"
},
v28 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PageInfo",
      "kind": "LinkedField",
      "name": "pageInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "page",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "pageCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "perPage",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "hasNextPage",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "hasPreviousPage",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Paginated",
  "abstractKey": "__isPaginated"
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "searchPath",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label",
  "storageKey": null
},
v31 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    }
  ],
  "type": "ScalarProperty",
  "abstractKey": "__isScalarProperty"
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "searchOperators",
  "storageKey": null
},
v34 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SelectOption",
      "kind": "LinkedField",
      "name": "options",
      "plural": true,
      "selections": [
        (v30/*: any*/),
        (v26/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "SelectProperty",
  "abstractKey": null
},
v35 = [
  (v17/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "collectionsSlugCommunitiesPagesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v7/*: any*/),
        "concreteType": "Community",
        "kind": "LinkedField",
        "name": "community",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v11/*: any*/),
            "concreteType": "CollectionConnection",
            "kind": "LinkedField",
            "name": "collections",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "CollectionListFragment"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v12/*: any*/),
            "concreteType": "SearchScope",
            "kind": "LinkedField",
            "name": "search",
            "plural": false,
            "selections": [
              {
                "args": [
                  {
                    "kind": "Variable",
                    "name": "hasQuery",
                    "variableName": "hasQuery"
                  },
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/)
                ],
                "kind": "FragmentSpread",
                "name": "CollectionListSearchFragment"
              }
            ],
            "storageKey": "search(maxDepth:1,visibility:\"ALL\")"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v6/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v0/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Operation",
    "name": "collectionsSlugCommunitiesPagesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v7/*: any*/),
        "concreteType": "Community",
        "kind": "LinkedField",
        "name": "community",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v11/*: any*/),
            "concreteType": "CollectionConnection",
            "kind": "LinkedField",
            "name": "collections",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Collection",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  (v21/*: any*/),
                  (v22/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v23/*: any*/),
                      (v24/*: any*/),
                      (v25/*: any*/),
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isSluggable"
                      }
                    ],
                    "type": "Entity",
                    "abstractKey": "__isEntity"
                  },
                  (v27/*: any*/)
                ],
                "storageKey": null
              },
              (v28/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v12/*: any*/),
            "concreteType": "SearchScope",
            "kind": "LinkedField",
            "name": "search",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SearchableCoreProperty",
                "kind": "LinkedField",
                "name": "coreProperties",
                "plural": true,
                "selections": [
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v29/*: any*/),
                      (v30/*: any*/),
                      (v31/*: any*/),
                      (v32/*: any*/),
                      (v33/*: any*/),
                      (v34/*: any*/)
                    ],
                    "type": "SearchableProperty",
                    "abstractKey": "__isSearchableProperty"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": "schemas",
                "args": null,
                "concreteType": "SchemaVersion",
                "kind": "LinkedField",
                "name": "availableSchemaVersions",
                "plural": true,
                "selections": [
                  (v20/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SchemaDefinition",
                    "kind": "LinkedField",
                    "name": "schemaDefinition",
                    "plural": false,
                    "selections": [
                      (v19/*: any*/),
                      (v16/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "searchableProperties",
                    "plural": true,
                    "selections": [
                      (v23/*: any*/),
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isSearchableProperty"
                      },
                      (v29/*: any*/),
                      (v30/*: any*/),
                      (v31/*: any*/),
                      (v32/*: any*/),
                      (v33/*: any*/),
                      (v34/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v16/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "kind",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "condition": "hasQuery",
                "kind": "Condition",
                "passingValue": true,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "access",
                        "value": "UPDATE"
                      },
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "scope",
                        "value": "COLLECTION"
                      }
                    ],
                    "concreteType": "SearchResultConnection",
                    "kind": "LinkedField",
                    "name": "results",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "SearchResult",
                        "kind": "LinkedField",
                        "name": "nodes",
                        "plural": true,
                        "selections": [
                          (v19/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "entity",
                            "plural": false,
                            "selections": [
                              (v23/*: any*/),
                              {
                                "kind": "TypeDiscriminator",
                                "abstractKey": "__isEntity"
                              },
                              (v18/*: any*/),
                              (v21/*: any*/),
                              (v22/*: any*/),
                              (v24/*: any*/),
                              (v16/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v19/*: any*/)
                                ],
                                "type": "Sluggable",
                                "abstractKey": "__isSluggable"
                              },
                              (v25/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": (v35/*: any*/),
                                "type": "Collection",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v35/*: any*/),
                                "type": "Item",
                                "abstractKey": null
                              },
                              (v27/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v16/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v28/*: any*/)
                    ],
                    "storageKey": null
                  }
                ]
              }
            ],
            "storageKey": "search(maxDepth:1,visibility:\"ALL\")"
          },
          (v16/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "895e6dc427b8bb94d0f7ba8782507ad1",
    "id": null,
    "metadata": {},
    "name": "collectionsSlugCommunitiesPagesQuery",
    "operationKind": "query",
    "text": "query collectionsSlugCommunitiesPagesQuery(\n  $order: EntityOrder\n  $page: Int!\n  $slug: Slug!\n  $predicates: [SearchPredicateInput!]\n  $query: String\n  $hasQuery: Boolean!\n  $schema: [String!]\n) {\n  community(slug: $slug) {\n    collections(order: $order, page: $page, perPage: 20) {\n      ...CollectionListFragment\n    }\n    search(visibility: ALL, maxDepth: 1) {\n      ...CollectionListSearchFragment_1V70IR\n    }\n    id\n  }\n}\n\nfragment CollectionListFragment on CollectionConnection {\n  nodes {\n    id\n    createdAt\n    title\n    slug\n    schemaVersion {\n      name\n      number\n      id\n    }\n    allowedActions\n    ...EntityThumbnailColumnFragment\n    ...PublishedDateColumnFragment\n  }\n  ...ModelListPageFragment\n}\n\nfragment CollectionListSearchFragment_1V70IR on SearchScope {\n  results(access: UPDATE, query: $query, page: $page, perPage: 20, predicates: $predicates, order: $order, scope: COLLECTION, schema: $schema) @include(if: $hasQuery) {\n    nodes {\n      slug\n      entity {\n        __typename\n        ... on Sluggable {\n          __isSluggable: __typename\n          slug\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n        __isEntity: __typename\n        title\n        schemaVersion {\n          name\n          number\n          id\n        }\n        ... on Collection {\n          createdAt\n        }\n        ... on Item {\n          createdAt\n        }\n        allowedActions\n        ...PublishedDateColumnFragment\n        ...EntityThumbnailColumnFragment\n        id\n      }\n      id\n    }\n    ...ModelListPageFragment\n  }\n  ...ModelListPageSearchFragment\n}\n\nfragment CurrentSearchFiltersFragment on SearchScope {\n  coreProperties {\n    ... on SearchableProperty {\n      __isSearchableProperty: __typename\n      searchPath\n      label\n    }\n  }\n  schemas: availableSchemaVersions {\n    name\n    schemaDefinition {\n      slug\n      id\n    }\n    searchableProperties {\n      __typename\n      __isSearchableProperty: __typename\n      searchPath\n      label\n    }\n    id\n  }\n}\n\nfragment EntityThumbnailColumnFragment on Entity {\n  __isEntity: __typename\n  __typename\n  title\n  thumbnail {\n    storage\n    thumb: small {\n      webp {\n        ...ImageFragment\n      }\n    }\n  }\n  ... on Node {\n    __isNode: __typename\n    id\n  }\n  ... on Sluggable {\n    __isSluggable: __typename\n    slug\n  }\n}\n\nfragment ImageFragment on Image {\n  __isImage: __typename\n  alt\n  url\n  width\n  height\n}\n\nfragment ModelListPageFragment on Paginated {\n  __isPaginated: __typename\n  ...ModelPageCountActionsFragment\n  ...ModelPaginationFragment\n}\n\nfragment ModelListPageSearchFragment on SearchScope {\n  ...CurrentSearchFiltersFragment\n  ...SearchWithFiltersFragment\n}\n\nfragment ModelPageCountActionsFragment on Paginated {\n  __isPaginated: __typename\n  pageInfo {\n    page\n    pageCount\n    perPage\n    hasNextPage\n    hasPreviousPage\n    totalCount\n  }\n}\n\nfragment ModelPaginationFragment on Paginated {\n  __isPaginated: __typename\n  pageInfo {\n    page\n    pageCount\n  }\n}\n\nfragment PrecisionDateFragment on VariablePrecisionDate {\n  precision\n  value\n}\n\nfragment PublishedDateColumnFragment on ReferencesGlobalEntityDates {\n  __isReferencesGlobalEntityDates: __typename\n  published {\n    ...PrecisionDateFragment\n  }\n}\n\nfragment SearchFilterBooleanFragment on SearchableProperty {\n  __isSearchableProperty: __typename\n  label\n  description\n  searchPath\n  searchOperators\n}\n\nfragment SearchFilterDrawerFragment on SearchScope {\n  ...SearchFilterFormFragment\n}\n\nfragment SearchFilterFormFragment on SearchScope {\n  coreProperties {\n    ... on SearchableProperty {\n      __isSearchableProperty: __typename\n      searchPath\n    }\n    ...SearchFilterFragment\n  }\n  schemas: availableSchemaVersions {\n    searchableProperties {\n      __typename\n      __isSearchableProperty: __typename\n      searchPath\n      label\n      ...SearchFilterFragment\n    }\n    id\n  }\n  ...SearchSchemaFilterFragment\n}\n\nfragment SearchFilterFragment on SearchableProperty {\n  __isSearchableProperty: __typename\n  ... on ScalarProperty {\n    __isScalarProperty: __typename\n    type\n  }\n  ...SearchFilterInputFragment\n  ...SearchFilterSelectFragment\n  ...SearchFilterBooleanFragment\n}\n\nfragment SearchFilterInputFragment on SearchableProperty {\n  __isSearchableProperty: __typename\n  label\n  description\n  searchPath\n  searchOperators\n}\n\nfragment SearchFilterSelectFragment on SearchableProperty {\n  __isSearchableProperty: __typename\n  label\n  description\n  searchPath\n  searchOperators\n  ... on SelectProperty {\n    options {\n      label\n      value\n    }\n  }\n}\n\nfragment SearchSchemaFilterFragment on SearchScope {\n  schemas: availableSchemaVersions {\n    name\n    kind\n    schemaDefinition {\n      slug\n      id\n    }\n    id\n  }\n}\n\nfragment SearchWithFiltersFragment on SearchScope {\n  ...SearchFilterDrawerFragment\n}\n"
  }
};
})();

(node as any).hash = "ec9fa0f873b08038e7c4fc2c6eb68b45";

export default node;
