/**
 * @generated SignedSource<<905335f05daf9be909d31097f249542c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SubmissionDepositMode = "DESCENDANT" | "DIRECT" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type CanSubmitCheckFragment$data = {
  readonly globalConfiguration: {
    readonly depositing: {
      readonly agreement: string;
    };
  };
  readonly submissionTargets: {
    readonly nodes: ReadonlyArray<{
      readonly agreementContent: string | null | undefined;
      readonly agreementRequired: boolean;
      readonly canDeposit: {
        readonly value: boolean;
      };
      readonly canRequestDepositAccess: {
        readonly value: boolean;
      };
      readonly depositMode: SubmissionDepositMode;
      readonly depositTargets: ReadonlyArray<{
        readonly entity: {
          readonly submissionTarget?: {
            readonly id: string;
          } | null | undefined;
          readonly title?: string;
        };
        readonly id: string;
      }>;
      readonly description: {
        readonly instructions: string;
      };
      readonly entity: {
        readonly id?: string;
        readonly slug?: string;
        readonly title?: string;
      };
      readonly id: string;
      readonly schemaVersions: ReadonlyArray<{
        readonly id: string;
        readonly identifier: string;
        readonly name: string;
      }>;
    }>;
  };
  readonly " $fragmentType": "CanSubmitCheckFragment";
};
export type CanSubmitCheckFragment$key = {
  readonly " $data"?: CanSubmitCheckFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CanSubmitCheckFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
],
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
  "name": "CanSubmitCheckFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GlobalConfiguration",
      "kind": "LinkedField",
      "name": "globalConfiguration",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "DepositingSettings",
          "kind": "LinkedField",
          "name": "depositing",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "agreement",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "filters",
          "value": {
            "inState": [
              "OPEN"
            ]
          }
        }
      ],
      "concreteType": "SubmissionTargetConnection",
      "kind": "LinkedField",
      "name": "submissionTargets",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SubmissionTarget",
          "kind": "LinkedField",
          "name": "nodes",
          "plural": true,
          "selections": [
            (v0/*: any*/),
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
              "concreteType": "AuthorizationResult",
              "kind": "LinkedField",
              "name": "canDeposit",
              "plural": false,
              "selections": (v1/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "AuthorizationResult",
              "kind": "LinkedField",
              "name": "canRequestDepositAccess",
              "plural": false,
              "selections": (v1/*: any*/),
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
                    (v0/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "slug",
                      "storageKey": null
                    },
                    (v2/*: any*/)
                  ],
                  "type": "Collection",
                  "abstractKey": null
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
                (v0/*: any*/),
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
                        (v2/*: any*/),
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "SubmissionTarget",
                          "kind": "LinkedField",
                          "name": "submissionTarget",
                          "plural": false,
                          "selections": [
                            (v0/*: any*/)
                          ],
                          "storageKey": null
                        }
                      ],
                      "type": "Collection",
                      "abstractKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "identifier",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "submissionTargets(filters:{\"inState\":[\"OPEN\"]})"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "27ad744d1079f92e602357e751548872";

export default node;
