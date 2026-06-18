/**
 * @generated SignedSource<<c16c12ffb07ae384e227766cf4efd392>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SchemaPropertyFragment$data = {
  readonly __typename: string;
  readonly submittable: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"AssetPropertyFragment" | "AssetsPropertyFragment" | "BooleanPropertyFragment" | "ContributorPropertyFragment" | "ContributorsPropertyFragment" | "DatePropertyFragment" | "EmailPropertyFragment" | "EntitiesPropertyFragment" | "EntityPropertyFragment" | "FloatPropertyFragment" | "FullTextPropertyFragment" | "IntegerPropertyFragment" | "MarkdownPropertyFragment" | "MultiselectPropertyFragment" | "SelectPropertyFragment" | "StringPropertyFragment" | "TagsPropertyFragment" | "URLPropertyFragment" | "VariableDatePropertyFragment">;
  readonly " $fragmentType": "SchemaPropertyFragment";
};
export type SchemaPropertyFragment$key = {
  readonly " $data"?: SchemaPropertyFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SchemaPropertyFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SchemaPropertyFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "submittable",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AssetPropertyFragment"
        }
      ],
      "type": "AssetProperty",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AssetsPropertyFragment"
        }
      ],
      "type": "AssetsProperty",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "BooleanPropertyFragment"
        }
      ],
      "type": "BooleanProperty",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ContributorPropertyFragment"
        }
      ],
      "type": "ContributorProperty",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ContributorsPropertyFragment"
        }
      ],
      "type": "ContributorsProperty",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "DatePropertyFragment"
        }
      ],
      "type": "DateProperty",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EmailPropertyFragment"
        }
      ],
      "type": "EmailProperty",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FloatPropertyFragment"
        }
      ],
      "type": "FloatProperty",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "IntegerPropertyFragment"
        }
      ],
      "type": "IntegerProperty",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MarkdownPropertyFragment"
        }
      ],
      "type": "MarkdownProperty",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MultiselectPropertyFragment"
        }
      ],
      "type": "MultiselectProperty",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SelectPropertyFragment"
        }
      ],
      "type": "SelectProperty",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "StringPropertyFragment"
        }
      ],
      "type": "StringProperty",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "TagsPropertyFragment"
        }
      ],
      "type": "TagsProperty",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FullTextPropertyFragment"
        }
      ],
      "type": "FullTextProperty",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "URLPropertyFragment"
        }
      ],
      "type": "URLProperty",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "VariableDatePropertyFragment"
        }
      ],
      "type": "VariableDateProperty",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EntityPropertyFragment"
        }
      ],
      "type": "EntityProperty",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EntitiesPropertyFragment"
        }
      ],
      "type": "EntitiesProperty",
      "abstractKey": null
    }
  ],
  "type": "ScalarProperty",
  "abstractKey": "__isScalarProperty"
};

(node as any).hash = "c2e2db7f62d8b0c05aeea8fe1a340cac";

export default node;
