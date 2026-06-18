/**
 * @generated SignedSource<<5c0e39891355371ff3a2ab92b6f5f932>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SubmissionState = "APPROVED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REVISION_REQUESTED" | "SUBMITTED" | "UNDER_REVIEW" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SubmissionListFragment$data = {
  readonly nodes: ReadonlyArray<{
    readonly createdAt: string;
    readonly currentStatus: {
      readonly mutableState: boolean;
    };
    readonly entity: {
      readonly id?: string;
      readonly title: string;
    } | null | undefined;
    readonly id: string;
    readonly slug: string;
    readonly state: SubmissionState;
    readonly submissionTarget: {
      readonly entity: {
        readonly title: string;
      };
    } | null | undefined;
    readonly user: {
      readonly id: string;
      readonly slug: string;
      readonly " $fragmentSpreads": FragmentRefs<"UserNameColumnCellFragment">;
    };
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ModelListPageFragment">;
  readonly " $fragmentType": "SubmissionListFragment";
};
export type SubmissionListFragment$key = {
  readonly " $data"?: SubmissionListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionListFragment">;
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
  "name": "SubmissionListFragment",
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
          "name": "state",
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
            (v2/*: any*/)
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "SubmissionStatus",
          "kind": "LinkedField",
          "name": "currentStatus",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "mutableState",
              "storageKey": null
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

(node as any).hash = "c8bfb51bfd7b8322890001f206507ab2";

export default node;
