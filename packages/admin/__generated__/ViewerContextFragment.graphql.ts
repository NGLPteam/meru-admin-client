/**
 * @generated SignedSource<<dad89bda29fc7a810a9051f75298b187>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewerContextFragment$data = {
  readonly viewer: {
    readonly allowedActions: ReadonlyArray<string>;
    readonly avatar: {
      readonly " $fragmentSpreads": FragmentRefs<"AvatarFragment">;
    };
    readonly globalAdmin: boolean;
    readonly id: string;
    readonly name: string | null | undefined;
    readonly uploadAccess: boolean;
    readonly uploadToken: string | null | undefined;
  };
  readonly " $fragmentType": "ViewerContextFragment";
};
export type ViewerContextFragment$key = {
  readonly " $data"?: ViewerContextFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewerContextFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewerContextFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "viewer",
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
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "allowedActions",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "uploadAccess",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "uploadToken",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ImageAttachment",
          "kind": "LinkedField",
          "name": "avatar",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "AvatarFragment"
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "globalAdmin",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "22c8b71da66138537ac4b0faf87f74b8";

export default node;
