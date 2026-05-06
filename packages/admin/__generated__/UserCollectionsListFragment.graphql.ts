/**
 * @generated SignedSource<<3622db8e162dd30e5f936ba704e4a3d4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserCollectionsListFragment$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly collection: {
        readonly id: string;
        readonly slug: string;
        readonly title: string;
        readonly " $fragmentSpreads": FragmentRefs<"EntityThumbnailColumnFragment">;
      };
      readonly id: string;
      readonly role: {
        readonly id: string;
        readonly name: string;
      };
      readonly user: {
        readonly id: string;
        readonly slug: string;
      };
    };
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ModelListPageFragment">;
  readonly " $fragmentType": "UserCollectionsListFragment";
};
export type UserCollectionsListFragment$key = {
  readonly " $data"?: UserCollectionsListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserCollectionsListFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = [
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "ImageFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserCollectionsListFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "UserCollectionAccessGrantEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "UserCollectionAccessGrant",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "Collection",
              "kind": "LinkedField",
              "name": "collection",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                (v1/*: any*/),
                (v2/*: any*/),
                {
                  "kind": "InlineDataFragmentSpread",
                  "name": "EntityThumbnailColumnFragment",
                  "selections": [
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "__typename",
                          "storageKey": null
                        },
                        (v1/*: any*/),
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "ImageAttachment",
                          "kind": "LinkedField",
                          "name": "thumbnail",
                          "plural": false,
                          "selections": (v3/*: any*/),
                          "storageKey": null
                        },
                        {
                          "kind": "InlineFragment",
                          "selections": [
                            {
                              "alias": null,
                              "args": null,
                              "concreteType": "ImageAttachment",
                              "kind": "LinkedField",
                              "name": "logo",
                              "plural": false,
                              "selections": (v3/*: any*/),
                              "storageKey": null
                            }
                          ],
                          "type": "Community",
                          "abstractKey": null
                        },
                        {
                          "kind": "InlineFragment",
                          "selections": [
                            (v0/*: any*/)
                          ],
                          "type": "Node",
                          "abstractKey": "__isNode"
                        },
                        {
                          "kind": "InlineFragment",
                          "selections": [
                            (v2/*: any*/)
                          ],
                          "type": "Sluggable",
                          "abstractKey": "__isSluggable"
                        }
                      ],
                      "type": "Entity",
                      "abstractKey": "__isEntity"
                    }
                  ],
                  "args": null,
                  "argumentDefinitions": []
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Role",
              "kind": "LinkedField",
              "name": "role",
              "plural": false,
              "selections": [
                (v0/*: any*/),
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
              "concreteType": "User",
              "kind": "LinkedField",
              "name": "user",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                (v2/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ModelListPageFragment"
    }
  ],
  "type": "UserCollectionAccessGrantConnection",
  "abstractKey": null
};
})();

(node as any).hash = "538238b00827fa9ae8551ecbda9da1b8";

export default node;
