/**
 * @generated SignedSource<<50494b7e55302ea1dba288f1c8e59c0a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmissionTargetReviewersListFragment$data = {
  readonly reviewers: {
    readonly " $fragmentSpreads": FragmentRefs<"SubmissionTargetReviewersListDataFragment">;
  };
  readonly submissionTargetId: string;
  readonly " $fragmentType": "SubmissionTargetReviewersListFragment";
};
export type SubmissionTargetReviewersListFragment$key = {
  readonly " $data"?: SubmissionTargetReviewersListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionTargetReviewersListFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "page"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmissionTargetReviewersListFragment",
  "selections": [
    {
      "alias": "submissionTargetId",
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "page",
          "variableName": "page"
        },
        {
          "kind": "Literal",
          "name": "perPage",
          "value": 20
        }
      ],
      "concreteType": "SubmissionTargetReviewerConnection",
      "kind": "LinkedField",
      "name": "reviewers",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SubmissionTargetReviewersListDataFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SubmissionTarget",
  "abstractKey": null
};

(node as any).hash = "c114a643ec97f33e17d784cf668e78fe";

export default node;
