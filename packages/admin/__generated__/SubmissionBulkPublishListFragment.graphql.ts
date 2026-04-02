/**
 * @generated SignedSource<<b7877ad460cc5f672537b006ef7d43d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmissionBulkPublishListFragment$data = {
  readonly nodes: ReadonlyArray<{
    readonly entity: {
      readonly id?: string;
      readonly slug: string;
      readonly title: string;
    } | null | undefined;
    readonly id: string;
    readonly slug: string;
    readonly submissionTarget: {
      readonly entity: {
        readonly title: string;
      };
    } | null | undefined;
    readonly updatedAt: string;
    readonly user: {
      readonly id: string;
      readonly slug: string;
      readonly " $fragmentSpreads": FragmentRefs<"UserNameColumnCellFragment">;
    };
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ModelListPageFragment">;
  readonly " $fragmentType": "SubmissionBulkPublishListFragment";
};
export type SubmissionBulkPublishListFragment$key = {
  readonly " $data"?: SubmissionBulkPublishListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionBulkPublishListFragment">;
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
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmissionBulkPublishListFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Submission",
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
          "concreteType": null,
          "kind": "LinkedField",
          "name": "entity",
          "plural": false,
          "selections": [
            {
              "kind": "InlineFragment",
              "selections": [
                (v0/*: any*/)
              ],
              "type": "Node",
              "abstractKey": "__isNode"
            },
            (v2/*: any*/),
            (v1/*: any*/)
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
                (v2/*: any*/)
              ],
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ModelListPageFragment"
    }
  ],
  "type": "SubmissionConnection",
  "abstractKey": null
};
})();

(node as any).hash = "74a04ef9e1d7d6800d3d7f7a1a47e7a5";

export default node;
