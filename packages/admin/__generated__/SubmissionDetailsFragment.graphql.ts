/**
 * @generated SignedSource<<b9dead0f89e8f1beb2c9ee89f0c22de6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SubmissionState = "APPROVED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REVISION_REQUESTED" | "SUBMITTED" | "UNDER_REVIEW" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SubmissionDetailsFragment$data = {
  readonly entity: {
    readonly __typename: "Item";
    readonly heroImage: {
      readonly " $fragmentSpreads": FragmentRefs<"ImageDisplayFragment">;
    };
    readonly id: string;
    readonly subtitle: string | null | undefined;
    readonly summary: string | null | undefined;
    readonly thumbnail: {
      readonly " $fragmentSpreads": FragmentRefs<"ImageDisplayFragment">;
    };
    readonly title: string;
    readonly " $fragmentSpreads": FragmentRefs<"SchemaFieldsDisplayFragment">;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
  readonly state: SubmissionState;
  readonly submissionTarget: {
    readonly entity: {
      readonly title: string;
    };
  } | null | undefined;
  readonly updatedAt: string;
  readonly " $fragmentType": "SubmissionDetailsFragment";
};
export type SubmissionDetailsFragment$key = {
  readonly " $data"?: SubmissionDetailsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionDetailsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v1 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "ImageDisplayFragment"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmissionDetailsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    },
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "subtitle",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "summary",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "ImageAttachment",
              "kind": "LinkedField",
              "name": "thumbnail",
              "plural": false,
              "selections": (v1/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "ImageAttachment",
              "kind": "LinkedField",
              "name": "heroImage",
              "plural": false,
              "selections": (v1/*: any*/),
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "SchemaFieldsDisplayFragment"
            }
          ],
          "type": "Item",
          "abstractKey": null
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
            (v0/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Submission",
  "abstractKey": null
};
})();

(node as any).hash = "4a5a3f048fe973469bfe6e2c51c90c71";

export default node;
