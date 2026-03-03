/**
 * @generated SignedSource<<49ef2d37b280936ed6cd132aedf21b42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type submissionsManageSlugCollectionsPagesQuery$variables = {
  slug: string;
};
export type submissionsManageSlugCollectionsPagesQuery$data = {
  readonly collection: {
    readonly slug: string;
  } | null | undefined;
};
export type submissionsManageSlugCollectionsPagesQuery = {
  response: submissionsManageSlugCollectionsPagesQuery$data;
  variables: submissionsManageSlugCollectionsPagesQuery$variables;
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
  "name": "slug",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "submissionsManageSlugCollectionsPagesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Collection",
        "kind": "LinkedField",
        "name": "collection",
        "plural": false,
        "selections": [
          (v2/*: any*/)
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
    "name": "submissionsManageSlugCollectionsPagesQuery",
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e16f0eb96650aaa2689d040527d55019",
    "id": null,
    "metadata": {},
    "name": "submissionsManageSlugCollectionsPagesQuery",
    "operationKind": "query",
    "text": "query submissionsManageSlugCollectionsPagesQuery(\n  $slug: Slug!\n) {\n  collection(slug: $slug) {\n    slug\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "156b3fc2026f046ece1b797997864e50";

export default node;
