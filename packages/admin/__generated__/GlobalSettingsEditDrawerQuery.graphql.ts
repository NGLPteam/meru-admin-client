/**
 * @generated SignedSource<<b88c846b1c1bc2b8bddd49d339f2fc46>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GlobalSettingsEditDrawerQuery$variables = Record<PropertyKey, never>;
export type GlobalSettingsEditDrawerQuery$data = {
  readonly globalConfiguration: {
    readonly " $fragmentSpreads": FragmentRefs<"GlobalSettingsEditFormFragment">;
  };
};
export type GlobalSettingsEditDrawerQuery = {
  response: GlobalSettingsEditDrawerQuery$data;
  variables: GlobalSettingsEditDrawerQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GlobalSettingsEditDrawerQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "GlobalSettingsEditFormFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GlobalSettingsEditDrawerQuery",
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
            "concreteType": "SiteSettings",
            "kind": "LinkedField",
            "name": "site",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "providerName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "installationName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "installationHomePageCopy",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SiteFooter",
                "kind": "LinkedField",
                "name": "footer",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "description",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "copyrightStatement",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "logoMode",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ThemeSettings",
            "kind": "LinkedField",
            "name": "theme",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "color",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "font",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
                "name": "enabled",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "agreement",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "EntitiesSettings",
            "kind": "LinkedField",
            "name": "entities",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "suppressExternalLinks",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "SiteLogoAttachment",
            "kind": "LinkedField",
            "name": "logo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "originalFilename",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "storage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ImageOriginal",
                "kind": "LinkedField",
                "name": "original",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "alt",
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
            "args": null,
            "concreteType": "ContributionRoleConfiguration",
            "kind": "LinkedField",
            "name": "contributionRoles",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ControlledVocabulary",
                "kind": "LinkedField",
                "name": "controlledVocabulary",
                "plural": false,
                "selections": (v1/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ControlledVocabularyItem",
                "kind": "LinkedField",
                "name": "defaultItem",
                "plural": false,
                "selections": (v1/*: any*/),
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4d4c34bcf5c877f8a5516038c4b8746e",
    "id": null,
    "metadata": {},
    "name": "GlobalSettingsEditDrawerQuery",
    "operationKind": "query",
    "text": "query GlobalSettingsEditDrawerQuery {\n  globalConfiguration {\n    ...GlobalSettingsEditFormFragment\n    id\n  }\n}\n\nfragment GlobalSettingsEditFormFragment on GlobalConfiguration {\n  site {\n    providerName\n    installationName\n    installationHomePageCopy\n    footer {\n      description\n      copyrightStatement\n    }\n    logoMode\n  }\n  theme {\n    color\n    font\n  }\n  depositing {\n    enabled\n    agreement\n  }\n  entities {\n    suppressExternalLinks\n  }\n  logo {\n    ...SiteLogoUploadFragment\n  }\n  contributionRoles {\n    controlledVocabulary {\n      id\n    }\n    defaultItem {\n      id\n    }\n    id\n  }\n}\n\nfragment SiteLogoUploadFragment on SiteLogoAttachment {\n  originalFilename\n  storage\n  original {\n    url\n    alt\n  }\n}\n"
  }
};
})();

(node as any).hash = "14c05f979e57359ae35bfe24eb0c1ce9";

export default node;
