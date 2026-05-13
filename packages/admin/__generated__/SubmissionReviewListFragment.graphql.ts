/**
 * @generated SignedSource<<f203320c16e649b33b50badad96a1ca9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SubmissionReviewState = "APPROVED" | "PENDING" | "REJECTED" | "REVISION_REQUESTED" | "%future added value";
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
      readonly entity: {
        readonly title: string;
      } | null | undefined;
      readonly slug: string;
      readonly user: {
        readonly id: string;
        readonly slug: string;
        readonly " $fragmentSpreads": FragmentRefs<"UserNameColumnCellFragment">;
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

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
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
        (v0/*: any*/),
        (v1/*: any*/),
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
            (v1/*: any*/),
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
              "concreteType": null,
              "kind": "LinkedField",
              "name": "entity",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "title",
                  "storageKey": null
                }
              ],
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
                (v1/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "UserNameColumnCellFragment"
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
})();

(node as any).hash = "954c6e7e78b35b3534a6dab6242f4553";

export default node;
