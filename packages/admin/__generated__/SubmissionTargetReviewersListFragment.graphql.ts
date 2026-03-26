/**
 * @generated SignedSource<<ede2099b7730636970c3b38d572a80d5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmissionTargetReviewersListFragment$data = {
  readonly entity: {
    readonly assignedUsers?: {
      readonly " $fragmentSpreads": FragmentRefs<"SubmissionTargetReviewersListDataFragment">;
    };
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
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "entity",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "order",
                  "value": "USER_NAME_ASC"
                },
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
              "concreteType": "ContextualPermissionConnection",
              "kind": "LinkedField",
              "name": "assignedUsers",
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
          "type": "Collection",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SubmissionTarget",
  "abstractKey": null
};

(node as any).hash = "52fe5cac406181751a2e8529ab7ed0c4";

export default node;
