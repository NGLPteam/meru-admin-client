/**
 * @generated SignedSource<<144b414c7fc8dc15149b64bdd2494611>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmissionTargetReviewersListDataFragment$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly id: string;
      readonly user: {
        readonly email: string | null | undefined;
        readonly id: string;
        readonly name: string | null | undefined;
        readonly slug: string;
        readonly " $fragmentSpreads": FragmentRefs<"UserNameColumnCellFragment">;
      };
    };
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ModelListPageFragment">;
  readonly " $fragmentType": "SubmissionTargetReviewersListDataFragment";
};
export type SubmissionTargetReviewersListDataFragment$key = {
  readonly " $data"?: SubmissionTargetReviewersListDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionTargetReviewersListDataFragment">;
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
  "name": "SubmissionTargetReviewersListDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SubmissionTargetReviewerEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SubmissionTargetReviewer",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            (v0/*: any*/),
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "email",
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
  "type": "SubmissionTargetReviewerConnection",
  "abstractKey": null
};
})();

(node as any).hash = "f2d0facdfbadc4743a59db08066ca3cd";

export default node;
