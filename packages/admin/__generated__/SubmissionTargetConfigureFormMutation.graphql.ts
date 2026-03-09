/**
 * @generated SignedSource<<4e557f8487876894c980b8ea0cacc669>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmissionDepositMode = "DESCENDANT" | "DIRECT" | "%future added value";
export type SubmissionTargetConfigureInput = {
  agreementContent?: string | null | undefined;
  agreementRequired?: boolean | null | undefined;
  clientMutationId?: string | null | undefined;
  configurableId: string;
  depositMode?: SubmissionDepositMode | null | undefined;
  depositTargetIds?: ReadonlyArray<string> | null | undefined;
  description: SubmissionTargetDescriptionInput;
  schemaVersionIds?: ReadonlyArray<string> | null | undefined;
};
export type SubmissionTargetDescriptionInput = {
  instructions?: string | null | undefined;
  internal?: string | null | undefined;
  sections: ReadonlyArray<SubmissionTargetSectionInput>;
};
export type SubmissionTargetSectionInput = {
  content: string;
  name: string;
};
export type SubmissionTargetConfigureFormMutation$variables = {
  input: SubmissionTargetConfigureInput;
};
export type SubmissionTargetConfigureFormMutation$data = {
  readonly submissionTargetConfigure: {
    readonly submissionTarget: {
      readonly " $fragmentSpreads": FragmentRefs<"SubmissionTargetConfigureFormFragment" | "SubmissionTargetStateToggleFragment">;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"MutationForm_mutationErrors">;
  } | null | undefined;
};
export type SubmissionTargetConfigureFormMutation = {
  response: SubmissionTargetConfigureFormMutation$data;
  variables: SubmissionTargetConfigureFormMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MutationAttributeError",
      "kind": "LinkedField",
      "name": "attributeErrors",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "path",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "messages",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MutationGlobalError",
      "kind": "LinkedField",
      "name": "globalErrors",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "message",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "StandardMutationPayload",
  "abstractKey": "__isStandardMutationPayload"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SubmissionTargetConfigureFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SubmissionTargetConfigurePayload",
        "kind": "LinkedField",
        "name": "submissionTargetConfigure",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SubmissionTarget",
            "kind": "LinkedField",
            "name": "submissionTarget",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SubmissionTargetConfigureFormFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SubmissionTargetStateToggleFragment"
              }
            ],
            "storageKey": null
          },
          {
            "kind": "InlineDataFragmentSpread",
            "name": "MutationForm_mutationErrors",
            "selections": [
              (v2/*: any*/)
            ],
            "args": null,
            "argumentDefinitions": []
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SubmissionTargetConfigureFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SubmissionTargetConfigurePayload",
        "kind": "LinkedField",
        "name": "submissionTargetConfigure",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SubmissionTarget",
            "kind": "LinkedField",
            "name": "submissionTarget",
            "plural": false,
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
                  (v3/*: any*/),
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
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isEntity"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isNode"
                      }
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": "submissionTargetId",
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
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2f4f1d410da7ce911d6d8ad094c9bc2c",
    "id": null,
    "metadata": {},
    "name": "SubmissionTargetConfigureFormMutation",
    "operationKind": "mutation",
    "text": "mutation SubmissionTargetConfigureFormMutation(\n  $input: SubmissionTargetConfigureInput!\n) {\n  submissionTargetConfigure(input: $input) {\n    submissionTarget {\n      ...SubmissionTargetConfigureFormFragment\n      ...SubmissionTargetStateToggleFragment\n      id\n    }\n    ...MutationForm_mutationErrors\n  }\n}\n\nfragment MutationForm_mutationErrors on StandardMutationPayload {\n  __isStandardMutationPayload: __typename\n  attributeErrors {\n    path\n    type\n    messages\n  }\n  globalErrors {\n    message\n  }\n}\n\nfragment SubmissionTargetConfigureFormFragment on SubmissionTarget {\n  targetId: id\n  depositMode\n  agreementRequired\n  agreementContent\n  description {\n    instructions\n    internal\n  }\n  schemaVersions {\n    id\n    name\n  }\n  depositTargets {\n    entity {\n      __typename\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n      __isEntity: __typename\n      title\n      id\n    }\n    id\n  }\n}\n\nfragment SubmissionTargetStateToggleFragment on SubmissionTarget {\n  submissionTargetId: id\n  state\n}\n"
  }
};
})();

(node as any).hash = "1d5dbb99085883db716f8ceabb153b8b";

export default node;
