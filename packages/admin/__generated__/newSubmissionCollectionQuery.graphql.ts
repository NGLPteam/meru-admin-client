/**
 * @generated SignedSource<<10cc88c413f0ea04add37f02db4e11d0>>
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
    readonly submissionTarget: {
      readonly id: string;
    } | null | undefined;
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
  "concreteType": "SubmissionTarget",
  "kind": "LinkedField",
  "name": "submissionTarget",
  "plural": false,
  "selections": [
    (v2/*: any*/)
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
          (v3/*: any*/)
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
          (v3/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8df7008fd73eba0e6f9c921d0164621a",
    "id": null,
    "metadata": {},
    "name": "newSubmissionCollectionQuery",
    "operationKind": "query",
    "text": "query newSubmissionCollectionQuery(\n  $slug: Slug!\n) {\n  collection(slug: $slug) {\n    submissionTarget {\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a418815112cc853d7e7041004c81df1c";

export default node;
