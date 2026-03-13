/**
 * @generated SignedSource<<4b17d0ba50cf10c6aca628a0bba29b43>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DashboardDepositorFragment$data = {
  readonly myPublications: {
    readonly " $fragmentSpreads": FragmentRefs<"DashboardDepositorPublicationsFragment">;
  };
  readonly mySubmissions: {
    readonly " $fragmentSpreads": FragmentRefs<"DashboardDepositorSubmissionsFragment">;
  };
  readonly " $fragmentType": "DashboardDepositorFragment";
};
export type DashboardDepositorFragment$key = {
  readonly " $data"?: DashboardDepositorFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DashboardDepositorFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "items": [
    {
      "kind": "Variable",
      "name": "userIds.0",
      "variableName": "viewerId"
    }
  ],
  "kind": "ListValue",
  "name": "userIds"
},
v1 = {
  "kind": "Literal",
  "name": "order",
  "value": "RECENT"
},
v2 = {
  "kind": "Literal",
  "name": "perPage",
  "value": 10
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "viewerId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "DashboardDepositorFragment",
  "selections": [
    {
      "alias": "mySubmissions",
      "args": [
        {
          "fields": [
            {
              "kind": "Literal",
              "name": "inState",
              "value": [
                "DRAFT",
                "SUBMITTED",
                "UNDER_REVIEW",
                "REVISION_REQUESTED",
                "APPROVED"
              ]
            },
            (v0/*: any*/)
          ],
          "kind": "ObjectValue",
          "name": "filters"
        },
        (v1/*: any*/),
        (v2/*: any*/)
      ],
      "concreteType": "SubmissionConnection",
      "kind": "LinkedField",
      "name": "submissions",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "DashboardDepositorSubmissionsFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": "myPublications",
      "args": [
        {
          "fields": [
            {
              "kind": "Literal",
              "name": "inState",
              "value": [
                "PUBLISHED"
              ]
            },
            (v0/*: any*/)
          ],
          "kind": "ObjectValue",
          "name": "filters"
        },
        (v1/*: any*/),
        (v2/*: any*/)
      ],
      "concreteType": "SubmissionConnection",
      "kind": "LinkedField",
      "name": "submissions",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "DashboardDepositorPublicationsFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "e9b1f2018a280fedfa6521ef8ddbba43";

export default node;
