/**
 * @generated SignedSource<<1d0b6dfae60a63be8618df49ea1de929>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SubmissionState = "APPROVED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REVISION_REQUESTED" | "SUBMITTED" | "UNDER_REVIEW" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SubmissionLayoutFragment$data = {
  readonly availableTransitions: ReadonlyArray<{
    readonly canTransition: {
      readonly value: boolean;
    };
    readonly fromState: SubmissionState;
    readonly lockedState: boolean;
    readonly mutableState: boolean;
    readonly toState: SubmissionState;
  }>;
  readonly canReview: {
    readonly value: boolean;
  };
  readonly currentStatus: {
    readonly canTransition: {
      readonly value: boolean;
    };
    readonly fromState: SubmissionState;
    readonly lockedState: boolean;
    readonly mutableState: boolean;
    readonly toState: SubmissionState;
  };
  readonly entity: {
    readonly title: string;
  } | null | undefined;
  readonly id: string;
  readonly state: SubmissionState;
  readonly " $fragmentType": "SubmissionLayoutFragment";
};
export type SubmissionLayoutFragment$key = {
  readonly " $data"?: SubmissionLayoutFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionLayoutFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AuthorizationResult",
    "kind": "LinkedField",
    "name": "canTransition",
    "plural": false,
    "selections": (v0/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "lockedState",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "mutableState",
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
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmissionLayoutFragment",
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
      "name": "state",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SubmissionStatus",
      "kind": "LinkedField",
      "name": "currentStatus",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SubmissionStatus",
      "kind": "LinkedField",
      "name": "availableTransitions",
      "plural": true,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AuthorizationResult",
      "kind": "LinkedField",
      "name": "canReview",
      "plural": false,
      "selections": (v0/*: any*/),
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
    }
  ],
  "type": "Submission",
  "abstractKey": null
};
})();

(node as any).hash = "917746424a07c1281929122c62bfe2c1";

export default node;
