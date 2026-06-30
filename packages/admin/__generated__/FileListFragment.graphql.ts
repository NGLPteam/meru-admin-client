/**
 * @generated SignedSource<<f26abc7c4b21f7fbb7adf854e2612a75>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type AssetKind = "archive" | "audio" | "document" | "image" | "pdf" | "unknown" | "video" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type FileListFragment$data = {
  readonly nodes: ReadonlyArray<{
    readonly downloadUrl: string | null | undefined;
    readonly id: string;
    readonly kind: AssetKind;
    readonly name: string;
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"AssetThumbnailColumnFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ModelListPageFragment">;
  readonly " $fragmentType": "FileListFragment";
};
export type FileListFragment$key = {
  readonly " $data"?: FileListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FileListFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FileListFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "nodes",
      "plural": true,
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
          "name": "slug",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "kind",
          "storageKey": null
        },
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
          "name": "downloadUrl",
          "storageKey": null
        },
        {
          "kind": "InlineDataFragmentSpread",
          "name": "AssetThumbnailColumnFragment",
          "selections": [
            {
              "alias": "thumbnail",
              "args": null,
              "concreteType": "ImageAttachment",
              "kind": "LinkedField",
              "name": "preview",
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
                  "alias": "image",
                  "args": null,
                  "concreteType": "ImageSize",
                  "kind": "LinkedField",
                  "name": "thumb",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "ImageDerivative",
                      "kind": "LinkedField",
                      "name": "png",
                      "plural": false,
                      "selections": [
                        {
                          "args": null,
                          "kind": "FragmentSpread",
                          "name": "ImageFragment"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "url",
                          "storageKey": null
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
          "argumentDefinitions": []
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
  "type": "AssetConnection",
  "abstractKey": null
};

(node as any).hash = "b1d41a5158b4b35d09350111989ba1d5";

export default node;
