/**
 * @generated SignedSource<<404e8ce781a2e73f5fdc4e4c0020a66c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadStorage = "CACHE" | "%future added value";
export type CreatePersonContributorInput = {
  affiliation?: string | null | undefined;
  bio?: string | null | undefined;
  clientMutationId?: string | null | undefined;
  email?: string | null | undefined;
  familyName?: string | null | undefined;
  givenName?: string | null | undefined;
  image?: UploadedFileInput | null | undefined;
  imageMetadata?: ImageMetadataInput | null | undefined;
  links?: ReadonlyArray<ContributorLinkInput> | null | undefined;
  orcid?: string | null | undefined;
  title?: string | null | undefined;
  url?: string | null | undefined;
};
export type UploadedFileInput = {
  id: any;
  metadata?: UploadedFileMetadataInput | null | undefined;
  storage?: UploadStorage | null | undefined;
};
export type UploadedFileMetadataInput = {
  alt?: string | null | undefined;
  filename?: string | null | undefined;
  mimeType?: string | null | undefined;
};
export type ImageMetadataInput = {
  alt?: string | null | undefined;
};
export type ContributorLinkInput = {
  title: string;
  url: string;
};
export type CreatePersonContributorFormMutation$variables = {
  input: CreatePersonContributorInput;
};
export type CreatePersonContributorFormMutation$data = {
  readonly createPersonContributor: {
    readonly contributor: {
      readonly __typename: "PersonContributor";
      readonly familyName: string | null | undefined;
      readonly givenName: string | null | undefined;
      readonly id: string;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"MutationForm_mutationErrors">;
  } | null | undefined;
};
export type CreatePersonContributorFormMutation = {
  response: CreatePersonContributorFormMutation$data;
  variables: CreatePersonContributorFormMutation$variables;
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
  "alias": null,
  "args": null,
  "concreteType": "PersonContributor",
  "kind": "LinkedField",
  "name": "contributor",
  "plural": false,
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
      "name": "__typename",
      "storageKey": null
    },
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
  "storageKey": null
},
v3 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreatePersonContributorFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreatePersonContributorPayload",
        "kind": "LinkedField",
        "name": "createPersonContributor",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineDataFragmentSpread",
            "name": "MutationForm_mutationErrors",
            "selections": [
              (v3/*: any*/)
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
    "name": "CreatePersonContributorFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreatePersonContributorPayload",
        "kind": "LinkedField",
        "name": "createPersonContributor",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "78054a8e1b1fab742284a9dc7b45481d",
    "id": null,
    "metadata": {},
    "name": "CreatePersonContributorFormMutation",
    "operationKind": "mutation",
    "text": "mutation CreatePersonContributorFormMutation(\n  $input: CreatePersonContributorInput!\n) {\n  createPersonContributor(input: $input) {\n    contributor {\n      id\n      __typename\n      givenName\n      familyName\n    }\n    ...MutationForm_mutationErrors\n  }\n}\n\nfragment MutationForm_mutationErrors on StandardMutationPayload {\n  __isStandardMutationPayload: __typename\n  attributeErrors {\n    path\n    type\n    messages\n  }\n  globalErrors {\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "ce8d6d79472f100983b4d3c1634c557e";

export default node;
