/**
 * @generated SignedSource<<4da29b8fa387abd307dbbc56355b6999>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EntityOrder = "OLDEST" | "POSITION_ASCENDING" | "POSITION_DESCENDING" | "PUBLISHED_ASCENDING" | "PUBLISHED_DESCENDING" | "RECENT" | "SCHEMA_NAME_ASCENDING" | "SCHEMA_NAME_DESCENDING" | "TITLE_ASCENDING" | "TITLE_DESCENDING" | "%future added value";
export type DashboardLayoutQuery$variables = {
  order?: EntityOrder | null | undefined;
  page?: number | null | undefined;
  viewerId: string;
};
export type DashboardLayoutQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"DashboardCollectionsFragment" | "DashboardDepositorFragment" | "DashboardInstallationFragment" | "DashboardItemsFragment">;
};
export type DashboardLayoutQuery = {
  response: DashboardLayoutQuery$data;
  variables: DashboardLayoutQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "order"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "page"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "viewerId"
},
v3 = {
  "kind": "Variable",
  "name": "order",
  "variableName": "order"
},
v4 = {
  "kind": "Variable",
  "name": "page",
  "variableName": "page"
},
v5 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "PageInfo",
    "kind": "LinkedField",
    "name": "pageInfo",
    "plural": false,
    "selections": [
      (v6/*: any*/)
    ],
    "storageKey": null
  }
],
v8 = [
  {
    "kind": "Literal",
    "name": "nodeFilter",
    "value": "ROOTS_AND_LEAVES"
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = {
  "kind": "Literal",
  "name": "perPage",
  "value": 10
},
v11 = [
  {
    "kind": "Literal",
    "name": "access",
    "value": "UPDATE"
  },
  (v3/*: any*/),
  (v4/*: any*/),
  (v10/*: any*/)
],
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v15 = [
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
v16 = {
  "alias": null,
  "args": null,
  "concreteType": "ImageAttachment",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": (v15/*: any*/),
  "storageKey": null
},
v17 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ImageAttachment",
      "kind": "LinkedField",
      "name": "logo",
      "plural": false,
      "selections": (v15/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Community",
  "abstractKey": null
},
v18 = {
  "kind": "TypeDiscriminator",
  "abstractKey": "__isNode"
},
v19 = [
  (v9/*: any*/),
  (v12/*: any*/),
  (v13/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "SchemaVersion",
    "kind": "LinkedField",
    "name": "schemaVersion",
    "plural": false,
    "selections": [
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
        "name": "number",
        "storageKey": null
      },
      (v9/*: any*/)
    ],
    "storageKey": null
  },
  {
    "kind": "InlineFragment",
    "selections": [
      (v14/*: any*/),
      (v16/*: any*/),
      (v17/*: any*/),
      (v18/*: any*/),
      {
        "kind": "TypeDiscriminator",
        "abstractKey": "__isSluggable"
      }
    ],
    "type": "Entity",
    "abstractKey": "__isEntity"
  }
],
v20 = {
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
        (v6/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Paginated",
  "abstractKey": "__isPaginated"
},
v21 = {
  "items": [
    {
      "kind": "Variable",
      "name": "userIds.0",
      "variableName": "viewerId"
    }
  ],
  "kind": "ListValue",
  "name": "userIds"
},
v22 = {
  "kind": "Literal",
  "name": "order",
  "value": "RECENT"
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v24 = {
  "kind": "TypeDiscriminator",
  "abstractKey": "__isEntity"
},
v25 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "entity",
  "plural": false,
  "selections": [
    (v14/*: any*/),
    (v24/*: any*/),
    (v12/*: any*/),
    (v16/*: any*/),
    (v9/*: any*/),
    (v18/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": [
        (v13/*: any*/)
      ],
      "type": "Sluggable",
      "abstractKey": "__isSluggable"
    },
    (v17/*: any*/)
  ],
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "concreteType": "SubmissionTarget",
  "kind": "LinkedField",
  "name": "submissionTarget",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "entity",
      "plural": false,
      "selections": [
        (v14/*: any*/),
        (v24/*: any*/),
        (v12/*: any*/),
        (v9/*: any*/)
      ],
      "storageKey": null
    },
    (v9/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DashboardLayoutQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "DashboardInstallationFragment"
      },
      {
        "args": (v5/*: any*/),
        "kind": "FragmentSpread",
        "name": "DashboardCollectionsFragment"
      },
      {
        "args": (v5/*: any*/),
        "kind": "FragmentSpread",
        "name": "DashboardItemsFragment"
      },
      {
        "args": [
          {
            "kind": "Variable",
            "name": "viewerId",
            "variableName": "viewerId"
          }
        ],
        "kind": "FragmentSpread",
        "name": "DashboardDepositorFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "DashboardLayoutQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CommunityConnection",
        "kind": "LinkedField",
        "name": "communities",
        "plural": false,
        "selections": (v7/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "AnyContributorConnection",
        "kind": "LinkedField",
        "name": "contributors",
        "plural": false,
        "selections": (v7/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "UserConnection",
        "kind": "LinkedField",
        "name": "users",
        "plural": false,
        "selections": (v7/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": "allCollections",
            "args": (v8/*: any*/),
            "concreteType": "CollectionConnection",
            "kind": "LinkedField",
            "name": "collections",
            "plural": false,
            "selections": (v7/*: any*/),
            "storageKey": "collections(nodeFilter:\"ROOTS_AND_LEAVES\")"
          },
          {
            "alias": "allItems",
            "args": (v8/*: any*/),
            "concreteType": "ItemConnection",
            "kind": "LinkedField",
            "name": "items",
            "plural": false,
            "selections": (v7/*: any*/),
            "storageKey": "items(nodeFilter:\"ROOTS_AND_LEAVES\")"
          },
          (v9/*: any*/),
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
                "selections": (v19/*: any*/),
                "storageKey": null
              },
              (v20/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v11/*: any*/),
            "concreteType": "ItemConnection",
            "kind": "LinkedField",
            "name": "items",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Item",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": (v19/*: any*/),
                "storageKey": null
              },
              (v20/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": "mySubmissions",
        "args": [
          {
            "fields": [
              {
                "kind": "Literal",
                "name": "inState",
                "value": [
                  "DRAFT",
                  "SUBMITTED",
                  "UNDER_REVIEW",
                  "REVISION_REQUESTED",
                  "APPROVED"
                ]
              },
              (v21/*: any*/)
            ],
            "kind": "ObjectValue",
            "name": "filters"
          },
          (v22/*: any*/),
          (v10/*: any*/)
        ],
        "concreteType": "SubmissionConnection",
        "kind": "LinkedField",
        "name": "submissions",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Submission",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v9/*: any*/),
              (v13/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "state",
                "storageKey": null
              },
              (v23/*: any*/),
              (v25/*: any*/),
              (v26/*: any*/)
            ],
            "storageKey": null
          },
          (v20/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "myPublications",
        "args": [
          {
            "fields": [
              {
                "kind": "Literal",
                "name": "inState",
                "value": [
                  "PUBLISHED"
                ]
              },
              (v21/*: any*/)
            ],
            "kind": "ObjectValue",
            "name": "filters"
          },
          (v22/*: any*/),
          (v10/*: any*/)
        ],
        "concreteType": "SubmissionConnection",
        "kind": "LinkedField",
        "name": "submissions",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Submission",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v9/*: any*/),
              (v13/*: any*/),
              (v23/*: any*/),
              (v25/*: any*/),
              (v26/*: any*/)
            ],
            "storageKey": null
          },
          (v20/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "55e1fb4e0990f69830f86b8dccc14ab1",
    "id": null,
    "metadata": {},
    "name": "DashboardLayoutQuery",
    "operationKind": "query",
    "text": "query DashboardLayoutQuery(\n  $page: Int\n  $order: EntityOrder\n  $viewerId: ID!\n) {\n  ...DashboardInstallationFragment\n  ...DashboardCollectionsFragment_1KnpCu\n  ...DashboardItemsFragment_1KnpCu\n  ...DashboardDepositorFragment_3KSzcj\n}\n\nfragment DashboardCollectionsFragment_1KnpCu on Query {\n  viewer {\n    collections(access: UPDATE, page: $page, order: $order, perPage: 10) {\n      ...DashboardCollectionsListFragment\n    }\n    id\n  }\n}\n\nfragment DashboardCollectionsListFragment on CollectionConnection {\n  nodes {\n    id\n    title\n    slug\n    schemaVersion {\n      name\n      number\n      id\n    }\n    ...EntityThumbnailColumnFragment\n  }\n  ...ModelPageCountActionsFragment\n  ...ModelPaginationFragment\n}\n\nfragment DashboardDepositorFragment_3KSzcj on Query {\n  mySubmissions: submissions(filters: {userIds: [$viewerId], inState: [DRAFT, SUBMITTED, UNDER_REVIEW, REVISION_REQUESTED, APPROVED]}, perPage: 10, order: RECENT) {\n    ...DashboardDepositorSubmissionsFragment\n  }\n  myPublications: submissions(filters: {userIds: [$viewerId], inState: [PUBLISHED]}, perPage: 10, order: RECENT) {\n    ...DashboardDepositorPublicationsFragment\n  }\n}\n\nfragment DashboardDepositorPublicationsFragment on SubmissionConnection {\n  nodes {\n    id\n    slug\n    updatedAt\n    entity {\n      __typename\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n      ... on Sluggable {\n        __isSluggable: __typename\n        slug\n      }\n      __isEntity: __typename\n      title\n      ...EntityThumbnailColumnFragment\n      id\n    }\n    submissionTarget {\n      entity {\n        __typename\n        __isEntity: __typename\n        title\n        id\n      }\n      id\n    }\n  }\n  ...ModelPageCountActionsFragment\n}\n\nfragment DashboardDepositorSubmissionsFragment on SubmissionConnection {\n  nodes {\n    id\n    slug\n    state\n    updatedAt\n    entity {\n      __typename\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n      ... on Sluggable {\n        __isSluggable: __typename\n        slug\n      }\n      __isEntity: __typename\n      title\n      ...EntityThumbnailColumnFragment\n      id\n    }\n    submissionTarget {\n      entity {\n        __typename\n        __isEntity: __typename\n        title\n        id\n      }\n      id\n    }\n  }\n  ...ModelPageCountActionsFragment\n}\n\nfragment DashboardInstallationFragment on Query {\n  communities {\n    pageInfo {\n      totalCount\n    }\n  }\n  contributors {\n    pageInfo {\n      totalCount\n    }\n  }\n  users {\n    pageInfo {\n      totalCount\n    }\n  }\n  viewer {\n    allCollections: collections(nodeFilter: ROOTS_AND_LEAVES) {\n      pageInfo {\n        totalCount\n      }\n    }\n    allItems: items(nodeFilter: ROOTS_AND_LEAVES) {\n      pageInfo {\n        totalCount\n      }\n    }\n    id\n  }\n}\n\nfragment DashboardItemsFragment_1KnpCu on Query {\n  viewer {\n    items(access: UPDATE, page: $page, order: $order, perPage: 10) {\n      ...DashboardItemsListFragment\n    }\n    id\n  }\n}\n\nfragment DashboardItemsListFragment on ItemConnection {\n  nodes {\n    id\n    title\n    slug\n    schemaVersion {\n      name\n      number\n      id\n    }\n    ...EntityThumbnailColumnFragment\n  }\n  ...ModelPageCountActionsFragment\n  ...ModelPaginationFragment\n}\n\nfragment EntityThumbnailColumnFragment on Entity {\n  __isEntity: __typename\n  __typename\n  title\n  thumbnail {\n    storage\n    thumb: small {\n      webp {\n        ...ImageFragment\n      }\n    }\n  }\n  ... on Community {\n    logo {\n      storage\n      thumb: small {\n        webp {\n          ...ImageFragment\n        }\n      }\n    }\n  }\n  ... on Node {\n    __isNode: __typename\n    id\n  }\n  ... on Sluggable {\n    __isSluggable: __typename\n    slug\n  }\n}\n\nfragment ImageFragment on Image {\n  __isImage: __typename\n  alt\n  url\n  width\n  height\n}\n\nfragment ModelPageCountActionsFragment on Paginated {\n  __isPaginated: __typename\n  pageInfo {\n    page\n    pageCount\n    perPage\n    hasNextPage\n    hasPreviousPage\n    totalCount\n  }\n}\n\nfragment ModelPaginationFragment on Paginated {\n  __isPaginated: __typename\n  pageInfo {\n    page\n    pageCount\n  }\n}\n"
  }
};
})();

(node as any).hash = "71a09268c759964e98a33e817897455b";

export default node;
