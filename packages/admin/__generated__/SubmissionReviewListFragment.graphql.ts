/**
 * @generated SignedSource<<bf7e48f67ac555095c8d773c78b8ad91>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SubmissionReviewState = "APPROVED" | "PENDING" | "REJECTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SubmissionReviewListFragment$data = {
  readonly nodes: ReadonlyArray<{
    readonly comment: string | null | undefined;
    readonly id: string;
    readonly slug: string;
    readonly state: SubmissionReviewState;
    readonly updatedAt: string;
    readonly user: {
      readonly name: string | null | undefined;
    } | null | undefined;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ModelListPageFragment">;
  readonly " $fragmentType": "SubmissionReviewListFragment";
};
export type SubmissionReviewListFragment$key = {
  readonly " $data"?: SubmissionReviewListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionReviewListFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmissionReviewListFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SubmissionReview",
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
          "name": "updatedAt",
          "storageKey": null
        },
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
          "name": "comment",
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
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
  "type": "SubmissionReviewConnection",
  "abstractKey": null
};

(node as any).hash = "c8591a63536dfcdc62347d0915eceb36";

export default node;
