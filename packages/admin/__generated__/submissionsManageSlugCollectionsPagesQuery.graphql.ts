/**
 * @generated SignedSource<<340f6dac436de59f592502ae08f424e4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type submissionsManageSlugCollectionsPagesQuery$variables = {
  slug: string;
};
export type submissionsManageSlugCollectionsPagesQuery$data = {
  readonly collection: {
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"CollectionSubmissionSettingsFragment">;
  } | null | undefined;
  readonly schemaVersionOptions: ReadonlyArray<{
    readonly label: string;
    readonly schemaVersion: {
      readonly id: string;
    };
    readonly value: string;
  }>;
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
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "kind",
      "value": "ITEM"
    }
  ],
  "concreteType": "SchemaVersionOption",
  "kind": "LinkedField",
  "name": "schemaVersionOptions",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "label",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "value",
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
        (v3/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": "schemaVersionOptions(kind:\"ITEM\")"
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
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CollectionSubmissionSettingsFragment"
          }
        ],
        "storageKey": null
      },
      (v4/*: any*/)
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
            "alias": "collectionId",
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
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
      },
      (v4/*: any*/)
    ]
  },
  "params": {
    "cacheID": "2bb1d23827f4610f25a46b48a4cd7bf9",
    "id": null,
    "metadata": {},
    "name": "submissionsManageSlugCollectionsPagesQuery",
    "operationKind": "query",
    "text": "query submissionsManageSlugCollectionsPagesQuery(\n  $slug: Slug!\n) {\n  collection(slug: $slug) {\n    slug\n    ...CollectionSubmissionSettingsFragment\n    id\n  }\n  schemaVersionOptions(kind: ITEM) {\n    label\n    value\n    schemaVersion {\n      id\n    }\n  }\n}\n\nfragment CollectionSubmissionSettingsFragment on Collection {\n  collectionId: id\n  submissionTarget {\n    ...SubmissionTargetConfigureFormFragment\n    ...SubmissionTargetStateToggleFragment\n    id\n  }\n}\n\nfragment SubmissionTargetConfigureFormFragment on SubmissionTarget {\n  targetId: id\n  depositMode\n  agreementRequired\n  agreementContent\n  description {\n    instructions\n    internal\n  }\n  schemaVersions {\n    id\n    name\n  }\n  depositTargets {\n    entity {\n      __typename\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n      __isEntity: __typename\n      title\n      id\n    }\n    id\n  }\n}\n\nfragment SubmissionTargetStateToggleFragment on SubmissionTarget {\n  submissionTargetId: id\n  state\n}\n"
  }
};
})();

(node as any).hash = "79ae194a270ea36aa66bdde9472af42c";

export default node;
