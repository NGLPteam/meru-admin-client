/**
 * @generated SignedSource<<b6be9eab7d129c613af3bcbf9bffb2a3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LinkTargetTypeaheadQuery$variables = {
  slug: string;
  title?: string | null | undefined;
};
export type LinkTargetTypeaheadQuery$data = {
  readonly collection: {
    readonly linkTargetCandidates: {
      readonly " $fragmentSpreads": FragmentRefs<"LinkTargetTypeaheadFragment">;
    };
  } | null | undefined;
  readonly item: {
    readonly linkTargetCandidates: {
      readonly " $fragmentSpreads": FragmentRefs<"LinkTargetTypeaheadFragment">;
    };
  } | null | undefined;
};
export type LinkTargetTypeaheadQuery = {
  response: LinkTargetTypeaheadQuery$data;
  variables: LinkTargetTypeaheadQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "title"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "title",
    "variableName": "title"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "targetId",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "identifier",
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "NamedAncestor",
    "kind": "LinkedField",
    "name": "namedAncestors",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "ancestor",
        "plural": false,
        "selections": [
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v8 = [
  {
    "alias": null,
    "args": (v2/*: any*/),
    "concreteType": "LinkTargetCandidateConnection",
    "kind": "LinkedField",
    "name": "linkTargetCandidates",
    "plural": false,
    "selections": [
      {
        "kind": "InlineDataFragmentSpread",
        "name": "LinkTargetTypeaheadFragment",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "LinkTargetCandidateEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "LinkTargetCandidate",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "target",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "InlineDataFragmentSpread",
                        "name": "getEntityTitleFragment",
                        "selections": [
                          (v4/*: any*/),
                          (v5/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "SchemaVersion",
                            "kind": "LinkedField",
                            "name": "schemaVersion",
                            "plural": false,
                            "selections": [
                              (v6/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v7/*: any*/),
                            "type": "Collection",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v7/*: any*/),
                            "type": "Item",
                            "abstractKey": null
                          }
                        ],
                        "args": null,
                        "argumentDefinitions": ([]/*: any*/)
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
        "args": null,
        "argumentDefinitions": ([]/*: any*/)
      }
    ],
    "storageKey": null
  }
],
v9 = {
  "kind": "TypeDiscriminator",
  "abstractKey": "__isEntity"
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v11 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "NamedAncestor",
    "kind": "LinkedField",
    "name": "namedAncestors",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "ancestor",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v9/*: any*/),
          (v5/*: any*/),
          (v10/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v12 = [
  {
    "alias": null,
    "args": (v2/*: any*/),
    "concreteType": "LinkTargetCandidateConnection",
    "kind": "LinkedField",
    "name": "linkTargetCandidates",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LinkTargetCandidateEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "LinkTargetCandidate",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "target",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v9/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SchemaVersion",
                    "kind": "LinkedField",
                    "name": "schemaVersion",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v11/*: any*/),
                    "type": "Collection",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v11/*: any*/),
                    "type": "Item",
                    "abstractKey": null
                  },
                  (v10/*: any*/)
                ],
                "storageKey": null
              },
              (v10/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v10/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LinkTargetTypeaheadQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Collection",
        "kind": "LinkedField",
        "name": "collection",
        "plural": false,
        "selections": (v8/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Item",
        "kind": "LinkedField",
        "name": "item",
        "plural": false,
        "selections": (v8/*: any*/),
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
    "name": "LinkTargetTypeaheadQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Collection",
        "kind": "LinkedField",
        "name": "collection",
        "plural": false,
        "selections": (v12/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Item",
        "kind": "LinkedField",
        "name": "item",
        "plural": false,
        "selections": (v12/*: any*/),
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c5ced593d659682217c48f93cce98fed",
    "id": null,
    "metadata": {},
    "name": "LinkTargetTypeaheadQuery",
    "operationKind": "query",
    "text": "query LinkTargetTypeaheadQuery(\n  $slug: Slug!\n  $title: String\n) {\n  collection(slug: $slug) {\n    linkTargetCandidates(title: $title) {\n      ...LinkTargetTypeaheadFragment\n    }\n    id\n  }\n  item(slug: $slug) {\n    linkTargetCandidates(title: $title) {\n      ...LinkTargetTypeaheadFragment\n    }\n    id\n  }\n}\n\nfragment LinkTargetTypeaheadFragment on LinkTargetCandidateConnection {\n  edges {\n    node {\n      targetId\n      target {\n        __typename\n        ...getEntityTitleFragment\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment getEntityTitleFragment on Entity {\n  __isEntity: __typename\n  __typename\n  title\n  schemaVersion {\n    identifier\n    id\n  }\n  ... on Collection {\n    namedAncestors {\n      ancestor {\n        __typename\n        __isEntity: __typename\n        title\n        id\n      }\n    }\n  }\n  ... on Item {\n    namedAncestors {\n      ancestor {\n        __typename\n        __isEntity: __typename\n        title\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bc6184d431bf659991e72f9ac20ffbd7";

export default node;
