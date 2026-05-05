/**
 * @generated SignedSource<<b268a852817fd3af3ab0c06bbf7ce6eb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmissionContributorsFragment$data = {
  readonly contributions: {
    readonly nodes: ReadonlyArray<{
      readonly contributionRole: {
        readonly label: string;
      };
      readonly contributor: {
        readonly __typename: "OrganizationContributor";
        readonly legalName: string | null | undefined;
      } | {
        readonly __typename: "PersonContributor";
        readonly familyName: string | null | undefined;
        readonly givenName: string | null | undefined;
      } | {
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        readonly __typename: "%other";
      };
      readonly id: string;
      readonly outerPosition: number | null | undefined;
    }>;
  };
  readonly id: string;
  readonly " $fragmentType": "SubmissionContributorsFragment";
};
export type SubmissionContributorsFragment$key = {
  readonly " $data"?: SubmissionContributorsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionContributorsFragment">;
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
  "name": "SubmissionContributorsFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "order",
          "value": "OLDEST"
        },
        {
          "kind": "Literal",
          "name": "page",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "perPage",
          "value": 50
        }
      ],
      "concreteType": "ItemContributionConnection",
      "kind": "LinkedField",
      "name": "contributions",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ItemContribution",
          "kind": "LinkedField",
          "name": "nodes",
          "plural": true,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "outerPosition",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "ControlledVocabularyItem",
              "kind": "LinkedField",
              "name": "contributionRole",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "label",
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
              "name": "contributor",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "givenName",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "familyName",
                      "storageKey": null
                    }
                  ],
                  "type": "PersonContributor",
                  "abstractKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "legalName",
                      "storageKey": null
                    }
                  ],
                  "type": "OrganizationContributor",
                  "abstractKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "contributions(order:\"OLDEST\",page:1,perPage:50)"
    }
  ],
  "type": "Item",
  "abstractKey": null
};
})();

(node as any).hash = "e4b7fe9c07c7f3d308315ce7b1594059";

export default node;
