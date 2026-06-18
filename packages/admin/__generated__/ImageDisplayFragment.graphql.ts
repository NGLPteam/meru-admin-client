/**
 * @generated SignedSource<<9a2352f6e3c74065b726274a7dc08548>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type AttachmentStorage = "CACHE" | "DERIVATIVES" | "REMOTE" | "STORE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ImageDisplayFragment$data = {
  readonly originalFilename: string | null | undefined;
  readonly storage: AttachmentStorage | null | undefined;
  readonly thumb: {
    readonly png: {
      readonly url: string | null | undefined;
      readonly " $fragmentSpreads": FragmentRefs<"ImageFragment">;
    };
  };
  readonly " $fragmentType": "ImageDisplayFragment";
};
export type ImageDisplayFragment$key = {
  readonly " $data"?: ImageDisplayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ImageDisplayFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ImageDisplayFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "originalFilename",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "storage",
      "storageKey": null
    },
    {
      "alias": null,
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
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
            },
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
  ],
  "type": "ImageAttachment",
  "abstractKey": null
};

(node as any).hash = "040c474747d4b542d036bae08b17a2fe";

export default node;
