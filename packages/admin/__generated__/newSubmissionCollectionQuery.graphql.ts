/**
 * @generated SignedSource<<b49811ec19710e4916d765d6d0a27032>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type newSubmissionCollectionQuery$variables = {
  slug: string;
};
export type newSubmissionCollectionQuery$data = {
  readonly collection: {
    readonly id: string;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "slug",
        "variableName": "slug"
      }
    ],
    "concreteType": "Collection",
    "kind": "LinkedField",
    "name": "collection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "newSubmissionCollectionQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "newSubmissionCollectionQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "22a44e88d8fc9d6b9610cb3194e3eec2",
    "id": null,
    "metadata": {},
    "name": "newSubmissionCollectionQuery",
    "operationKind": "query",
    "text": "query newSubmissionCollectionQuery(\n  $slug: Slug!\n) {\n  collection(slug: $slug) {\n    id\n    title\n  }\n}\n"
  }
};
})();

(node as any).hash = "16a5e64762efa7d4be6fa4af7559f93b";

export default node;
