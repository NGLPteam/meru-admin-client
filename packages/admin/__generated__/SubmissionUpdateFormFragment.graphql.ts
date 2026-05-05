/**
 * @generated SignedSource<<92dd59b5ef4940d0f1485089946d64a1>>
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
  readonly " $fragmentSpreads": FragmentRefs<"HarvestingStatusFragment" | "ParentSelectorFragment" | "SchemaFormFieldsFragment" | "SubmissionContributorsFragment" | "SubmissionUpdateFormFieldsFragment" | "useSchemaPropertiesFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SubmissionContributorsFragment"
    }
  ],
  "type": "Item",
  "abstractKey": null
};

(node as any).hash = "f61815c7f075c541f902de4859b70514";

export default node;
