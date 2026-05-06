/**
 * @generated SignedSource<<48b0c4fd33b0a9d623e18646d1b0562d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DashboardDepositorPublicationsFragment$data = {
  readonly nodes: ReadonlyArray<{
    readonly entity: {
      readonly id?: string;
      readonly slug?: string;
      readonly title: string;
      readonly " $fragmentSpreads": FragmentRefs<"EntityThumbnailColumnFragment">;
    } | null | undefined;
    readonly id: string;
    readonly slug: string;
    readonly submissionTarget: {
      readonly entity: {
        readonly title: string;
      };
    } | null | undefined;
    readonly updatedAt: string;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ModelPageCountActionsFragment">;
  readonly " $fragmentType": "DashboardDepositorPublicationsFragment";
};
export type DashboardDepositorPublicationsFragment$key = {
  readonly " $data"?: DashboardDepositorPublicationsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DashboardDepositorPublicationsFragment">;
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
  "name": "slug",
  "storageKey": null
},
v2 = {
  "kind": "InlineFragment",
  "selections": [
    (v0/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    (v1/*: any*/)
  ],
  "type": "Sluggable",
  "abstractKey": "__isSluggable"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = [
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
  "name": "DashboardDepositorPublicationsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Submission",
      "kind": "LinkedField",
      "name": "nodes",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "updatedAt",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "entity",
          "plural": false,
          "selections": [
            (v2/*: any*/),
            (v3/*: any*/),
            (v4/*: any*/),
            {
              "kind": "InlineDataFragmentSpread",
              "name": "EntityThumbnailColumnFragment",
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                (v4/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "ImageAttachment",
                  "kind": "LinkedField",
                  "name": "thumbnail",
                  "plural": false,
                  "selections": (v5/*: any*/),
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
                      "selections": (v5/*: any*/),
                      "storageKey": null
                    }
                  ],
                  "type": "Community",
                  "abstractKey": null
                },
                (v2/*: any*/),
                (v3/*: any*/)
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
                (v4/*: any*/)
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
      "name": "ModelPageCountActionsFragment"
    }
  ],
  "type": "SubmissionConnection",
  "abstractKey": null
};
})();

(node as any).hash = "da69fe9af6194ebad1a2524a51a1df79";

export default node;
