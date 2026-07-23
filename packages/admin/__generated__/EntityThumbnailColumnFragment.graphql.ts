/**
 * @generated SignedSource<<bfc9e26986b22d639948d0d643bbe20b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { InlineFragment, ReaderInlineDataFragment } from 'relay-runtime';
export type AttachmentStorage = "CACHE" | "DERIVATIVES" | "REMOTE" | "STORE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type EntityThumbnailColumnFragment$data = {
  readonly __typename: string;
  readonly id?: string;
  readonly logo?: {
    readonly storage: AttachmentStorage | null | undefined;
    readonly thumb: {
      readonly webp: {
        readonly " $fragmentSpreads": FragmentRefs<"ImageFragment">;
      };
    };
  };
  readonly slug?: string;
  readonly thumbnail: {
    readonly storage: AttachmentStorage | null | undefined;
    readonly thumb: {
      readonly webp: {
        readonly " $fragmentSpreads": FragmentRefs<"ImageFragment">;
      };
    };
  };
  readonly title: string;
  readonly " $fragmentType": "EntityThumbnailColumnFragment";
};
export type EntityThumbnailColumnFragment$key = {
  readonly " $data"?: EntityThumbnailColumnFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EntityThumbnailColumnFragment">;
};

const node: ReaderInlineDataFragment = {
  "kind": "InlineDataFragment",
  "name": "EntityThumbnailColumnFragment"
};

(node as any).hash = "b1b5c77810fde34e893bd78b26b80427";

export default node;
