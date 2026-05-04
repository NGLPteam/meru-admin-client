/**
 * @generated SignedSource<<476f112d5d408f0a29faae40d31522a9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type settingsSubmissionsSlugCollectionsPagesQuery$variables = {
  slug: string;
};
export type settingsSubmissionsSlugCollectionsPagesQuery$data = {
  readonly collection: {
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"CollectionSubmissionSettingsFragment">;
  } | null | undefined;
};
export type settingsSubmissionsSlugCollectionsPagesQuery = {
  response: settingsSubmissionsSlugCollectionsPagesQuery$data;
  variables: settingsSubmissionsSlugCollectionsPagesQuery$variables;
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
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "settingsSubmissionsSlugCollectionsPagesQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "CollectionSubmissionSettingsFragment"
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
    "name": "settingsSubmissionsSlugCollectionsPagesQuery",
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
            "alias": "collectionId",
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
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
                "concreteType": "SchemaVersion",
                "kind": "LinkedField",
                "name": "submittableVersions",
                "plural": true,
                "selections": (v4/*: any*/),
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "SubmissionTarget",
            "kind": "LinkedField",
            "name": "submissionTarget",
            "plural": false,
            "selections": [
              {
                "alias": "targetId",
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "internal",
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
                "selections": (v4/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "entity",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isEntity"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isNode"
                      }
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": "submissionTargetId",
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "state",
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6ab04101fd4ccb0dc50e87a303ed6bbd",
    "id": null,
    "metadata": {},
    "name": "settingsSubmissionsSlugCollectionsPagesQuery",
    "operationKind": "query",
    "text": "query settingsSubmissionsSlugCollectionsPagesQuery(\n  $slug: Slug!\n) {\n  collection(slug: $slug) {\n    slug\n    ...CollectionSubmissionSettingsFragment\n    id\n  }\n}\n\nfragment CollectionSubmissionSettingsFragment on Collection {\n  collectionId: id\n  schemaVersion {\n    submittableVersions {\n      id\n      name\n    }\n    id\n  }\n  submissionTarget {\n    ...SubmissionTargetConfigureFormFragment\n    ...SubmissionTargetStateToggleFragment\n    id\n  }\n}\n\nfragment SubmissionTargetConfigureFormFragment on SubmissionTarget {\n  targetId: id\n  depositMode\n  agreementRequired\n  agreementContent\n  description {\n    instructions\n    internal\n  }\n  schemaVersions {\n    id\n    name\n  }\n  depositTargets {\n    entity {\n      __typename\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n      __isEntity: __typename\n      title\n      id\n    }\n    id\n  }\n}\n\nfragment SubmissionTargetStateToggleFragment on SubmissionTarget {\n  submissionTargetId: id\n  state\n}\n"
  }
};
})();

(node as any).hash = "1326f15af8286c23d300edf32f5e1555";

export default node;
