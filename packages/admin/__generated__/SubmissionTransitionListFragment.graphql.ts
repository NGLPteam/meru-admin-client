/**
 * @generated SignedSource<<f4a02d18ba1b6421e90b7c03c8b89573>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SubmissionState = "APPROVED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REVISION_REQUESTED" | "SUBMITTED" | "UNDER_REVIEW" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SubmissionTransitionListFragment$data = {
  readonly canReview: {
    readonly value: boolean;
  };
  readonly transitions: {
    readonly nodes: ReadonlyArray<{
      readonly createdAt: string;
      readonly fromState: SubmissionState | null | undefined;
      readonly id: string;
      readonly slug: string;
      readonly toState: SubmissionState;
      readonly user: {
        readonly id: string;
        readonly name: string | null | undefined;
      } | null | undefined;
    }>;
    readonly " $fragmentSpreads": FragmentRefs<"ModelListPageFragment">;
  };
  readonly " $fragmentType": "SubmissionTransitionListFragment";
};
export type SubmissionTransitionListFragment$key = {
  readonly " $data"?: SubmissionTransitionListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionTransitionListFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmissionTransitionListFragment",
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SubmissionTransitionConnection",
      "kind": "LinkedField",
      "name": "transitions",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SubmissionTransition",
          "kind": "LinkedField",
          "name": "nodes",
          "plural": true,
          "selections": [
            (v0/*: any*/),
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
              "name": "createdAt",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "fromState",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "toState",
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
      "storageKey": null
    }
  ],
  "type": "Submission",
  "abstractKey": null
};
})();

(node as any).hash = "a418efe2bdee6eb47ad9ee602aa0f434";

export default node;
