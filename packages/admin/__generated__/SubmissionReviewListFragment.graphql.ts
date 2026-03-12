/**
 * @generated SignedSource<<5bd6970ba2e1ca8eb80dc8ee1b9f1d0a>>
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
    readonly submission: {
      readonly canReview: {
        readonly value: boolean;
      };
    };
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
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Submission",
          "kind": "LinkedField",
          "name": "submission",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "AuthorizationResult",
              "kind": "LinkedField",
              "name": "canReview",
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

(node as any).hash = "566a046ec4c702f4c4dfa864887ffdd9";

export default node;
