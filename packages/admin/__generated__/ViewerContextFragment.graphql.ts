/**
 * @generated SignedSource<<2b294b18f33f736fd32e8272119bb476>>
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
    readonly canReceiveReviewRequests: {
      readonly value: boolean;
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
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "AuthorizationResult",
          "kind": "LinkedField",
          "name": "canReceiveReviewRequests",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "value",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "18ff4c524b4d010848d31a1499e26a5b";

export default node;
