/**
 * @generated SignedSource<<e1303f9020724e6fe4a7ec120a5f1cb9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SubmissionDepositMode = "DESCENDANT" | "DIRECT" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SubmissionTargetConfigureFormFragment$data = {
  readonly agreementContent: string | null | undefined;
  readonly agreementRequired: boolean;
  readonly depositMode: SubmissionDepositMode;
  readonly depositTargets: ReadonlyArray<{
    readonly entity: {
      readonly id?: string;
      readonly title: string;
    };
  }>;
  readonly description: {
    readonly instructions: string;
    readonly internal: string;
  };
  readonly schemaVersions: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }>;
  readonly targetId: string;
  readonly " $fragmentType": "SubmissionTargetConfigureFormFragment";
};
export type SubmissionTargetConfigureFormFragment$key = {
  readonly " $data"?: SubmissionTargetConfigureFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionTargetConfigureFormFragment">;
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
  "name": "SubmissionTargetConfigureFormFragment",
  "selections": [
    {
      "alias": "targetId",
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "depositMode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "agreementRequired",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "agreementContent",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SubmissionTargetDescription",
      "kind": "LinkedField",
      "name": "description",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "instructions",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internal",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SchemaVersion",
      "kind": "LinkedField",
      "name": "schemaVersions",
      "plural": true,
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SubmissionDepositTarget",
      "kind": "LinkedField",
      "name": "depositTargets",
      "plural": true,
      "selections": [
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
      "storageKey": null
    }
  ],
  "type": "SubmissionTarget",
  "abstractKey": null
};
})();

(node as any).hash = "9bc1ee120783ba89275c14412e6b493b";

export default node;
