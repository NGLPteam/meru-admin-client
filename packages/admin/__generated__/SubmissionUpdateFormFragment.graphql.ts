/**
 * @generated SignedSource<<d8ee7ee5ca5322795cc6c6710b06641d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmissionUpdateFormFragment$data = {
  readonly context: {
    readonly " $fragmentSpreads": FragmentRefs<"useSchemaContextFragment">;
  };
  readonly itemId: string;
  readonly " $fragmentSpreads": FragmentRefs<"HarvestingStatusFragment" | "ParentSelectorFragment" | "SchemaFormFieldsFragment" | "SubmissionUpdateFormFieldsFragment" | "useSchemaPropertiesFragment">;
  readonly " $fragmentType": "SubmissionUpdateFormFragment";
};
export type SubmissionUpdateFormFragment$key = {
  readonly " $data"?: SubmissionUpdateFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionUpdateFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmissionUpdateFormFragment",
  "selections": [
    {
      "alias": "itemId",
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ParentSelectorFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HarvestingStatusFragment"
    },
    {
      "alias": "context",
      "args": null,
      "concreteType": "SchemaInstanceContext",
      "kind": "LinkedField",
      "name": "schemaInstanceContext",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "useSchemaContextFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SubmissionUpdateFormFieldsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SchemaFormFieldsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useSchemaPropertiesFragment"
    }
  ],
  "type": "Item",
  "abstractKey": null
};

(node as any).hash = "145e2b15299d8539d1309b89b73c6910";

export default node;
