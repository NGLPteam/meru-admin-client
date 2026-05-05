/**
 * @generated SignedSource<<0c09c8cac72bef0cc8b8df1178429575>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type detailsMySubmissionQuery$variables = {
  slug: string;
};
export type detailsMySubmissionQuery$data = {
  readonly submission: {
    readonly entity: {
      readonly __typename: "Item";
      readonly " $fragmentSpreads": FragmentRefs<"SubmissionUpdateFormFragment">;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"SubmissionDetailsFragment">;
  } | null | undefined;
};
export type detailsMySubmissionQuery = {
  response: detailsMySubmissionQuery$data;
  variables: detailsMySubmissionQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = [
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
    "concreteType": "ImageSize",
    "kind": "LinkedField",
    "name": "thumb",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ImageDerivative",
        "kind": "LinkedField",
        "name": "png",
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
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "width",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "height",
                "storageKey": null
              }
            ],
            "type": "Image",
            "abstractKey": "__isImage"
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label",
  "storageKey": null
},
v7 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "kind",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v10 = [
  (v8/*: any*/),
  (v6/*: any*/),
  (v9/*: any*/)
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fieldValues",
  "storageKey": null
},
v12 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "precision",
    "storageKey": null
  },
  (v9/*: any*/)
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fullPath",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isWide",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "submittable",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "legend",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "path",
  "storageKey": null
},
v19 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": "name",
      "args": null,
      "kind": "ScalarField",
      "name": "fullPath",
      "storageKey": null
    },
    (v6/*: any*/),
    (v18/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "required",
      "storageKey": null
    },
    (v14/*: any*/),
    (v15/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "instructions",
      "storageKey": null
    }
  ],
  "type": "ScalarProperty",
  "abstractKey": "__isScalarProperty"
},
v20 = [
  (v19/*: any*/)
],
v21 = {
  "kind": "InlineFragment",
  "selections": (v20/*: any*/),
  "type": "AssetProperty",
  "abstractKey": null
},
v22 = {
  "kind": "InlineFragment",
  "selections": (v20/*: any*/),
  "type": "AssetsProperty",
  "abstractKey": null
},
v23 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "checked",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "checkedByDefault",
      "storageKey": null
    },
    (v19/*: any*/)
  ],
  "type": "BooleanProperty",
  "abstractKey": null
},
v24 = {
  "kind": "InlineFragment",
  "selections": (v20/*: any*/),
  "type": "ContributorProperty",
  "abstractKey": null
},
v25 = {
  "kind": "InlineFragment",
  "selections": (v20/*: any*/),
  "type": "ContributorsProperty",
  "abstractKey": null
},
v26 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
      "storageKey": null
    },
    (v19/*: any*/)
  ],
  "type": "DateProperty",
  "abstractKey": null
},
v27 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "address",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "defaultAddress",
      "storageKey": null
    },
    (v19/*: any*/)
  ],
  "type": "EmailProperty",
  "abstractKey": null
},
v28 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "floatValue",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "defaultFloat",
      "storageKey": null
    },
    (v19/*: any*/)
  ],
  "type": "FloatProperty",
  "abstractKey": null
},
v29 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "integerValue",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "defaultInteger",
      "storageKey": null
    },
    (v19/*: any*/)
  ],
  "type": "IntegerProperty",
  "abstractKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v31 = [
  (v30/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "default",
    "storageKey": null
  },
  (v19/*: any*/)
],
v32 = {
  "kind": "InlineFragment",
  "selections": (v31/*: any*/),
  "type": "MarkdownProperty",
  "abstractKey": null
},
v33 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "SelectOption",
    "kind": "LinkedField",
    "name": "options",
    "plural": true,
    "selections": [
      (v6/*: any*/),
      (v9/*: any*/)
    ],
    "storageKey": null
  },
  (v19/*: any*/)
],
v34 = {
  "kind": "InlineFragment",
  "selections": (v33/*: any*/),
  "type": "MultiselectProperty",
  "abstractKey": null
},
v35 = {
  "kind": "InlineFragment",
  "selections": (v33/*: any*/),
  "type": "SelectProperty",
  "abstractKey": null
},
v36 = {
  "kind": "InlineFragment",
  "selections": (v31/*: any*/),
  "type": "StringProperty",
  "abstractKey": null
},
v37 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "tags",
      "storageKey": null
    },
    (v19/*: any*/)
  ],
  "type": "TagsProperty",
  "abstractKey": null
},
v38 = {
  "kind": "InlineFragment",
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
      "concreteType": "FullText",
      "kind": "LinkedField",
      "name": "fullText",
      "plural": false,
      "selections": [
        (v30/*: any*/),
        (v8/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lang",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v19/*: any*/)
  ],
  "type": "FullTextProperty",
  "abstractKey": null
},
v39 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "URLReference",
      "kind": "LinkedField",
      "name": "url",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "href",
          "storageKey": null
        },
        (v6/*: any*/),
        (v4/*: any*/)
      ],
      "storageKey": null
    },
    (v19/*: any*/)
  ],
  "type": "URLProperty",
  "abstractKey": null
},
v40 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "VariablePrecisionDate",
      "kind": "LinkedField",
      "name": "dateWithPrecision",
      "plural": false,
      "selections": (v12/*: any*/),
      "storageKey": null
    },
    (v19/*: any*/)
  ],
  "type": "VariableDateProperty",
  "abstractKey": null
},
v41 = {
  "kind": "TypeDiscriminator",
  "abstractKey": "__isEntity"
},
v42 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "identifier",
  "storageKey": null
},
v43 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "NamedAncestor",
    "kind": "LinkedField",
    "name": "namedAncestors",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "ancestor",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v41/*: any*/),
          (v4/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v44 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "EntitySelectOption",
    "kind": "LinkedField",
    "name": "availableEntities",
    "plural": true,
    "selections": [
      (v6/*: any*/),
      (v9/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "entity",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v41/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "SchemaVersion",
            "kind": "LinkedField",
            "name": "schemaVersion",
            "plural": false,
            "selections": [
              (v42/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": (v43/*: any*/),
            "type": "Collection",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": (v43/*: any*/),
            "type": "Item",
            "abstractKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v19/*: any*/)
],
v45 = {
  "kind": "InlineFragment",
  "selections": (v44/*: any*/),
  "type": "EntityProperty",
  "abstractKey": null
},
v46 = {
  "kind": "InlineFragment",
  "selections": (v44/*: any*/),
  "type": "EntitiesProperty",
  "abstractKey": null
},
v47 = {
  "alias": "entityId",
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v48 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v49 = [
  (v47/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "SchemaVersion",
    "kind": "LinkedField",
    "name": "schemaVersion",
    "plural": false,
    "selections": [
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
        "name": "number",
        "storageKey": null
      },
      (v48/*: any*/),
      (v3/*: any*/)
    ],
    "storageKey": null
  }
],
v50 = {
  "alias": null,
  "args": null,
  "concreteType": "SchemaVersion",
  "kind": "LinkedField",
  "name": "schemaVersion",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "enforcesParent",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SchemaVersion",
      "kind": "LinkedField",
      "name": "enforcedParentVersions",
      "plural": true,
      "selections": [
        (v42/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "namespace",
          "storageKey": null
        },
        (v3/*: any*/)
      ],
      "storageKey": null
    },
    (v3/*: any*/)
  ],
  "storageKey": null
},
v51 = [
  (v3/*: any*/),
  (v48/*: any*/),
  (v4/*: any*/)
],
v52 = {
  "kind": "InlineFragment",
  "selections": (v51/*: any*/),
  "type": "Collection",
  "abstractKey": null
},
v53 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "harvestModificationStatus",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "detailsMySubmissionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Submission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SubmissionDetailsFragment"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "entity",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "SubmissionUpdateFormFragment"
                  }
                ],
                "type": "Item",
                "abstractKey": null
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "detailsMySubmissionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Submission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
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
            "kind": "ScalarField",
            "name": "updatedAt",
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
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "subtitle",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "summary",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ImageAttachment",
                    "kind": "LinkedField",
                    "name": "thumbnail",
                    "plural": false,
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ImageAttachment",
                    "kind": "LinkedField",
                    "name": "heroImage",
                    "plural": false,
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  },
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
                          (v3/*: any*/),
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
                              (v6/*: any*/),
                              (v3/*: any*/)
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
                              (v2/*: any*/),
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
                              },
                              (v7/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "contributions(order:\"OLDEST\",page:1,perPage:50)"
                  },
                  {
                    "alias": "itemId",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
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
                        "alias": null,
                        "args": null,
                        "concreteType": "AssetSelectOption",
                        "kind": "LinkedField",
                        "name": "assets",
                        "plural": true,
                        "selections": (v10/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ContributorSelectOption",
                        "kind": "LinkedField",
                        "name": "contributors",
                        "plural": true,
                        "selections": (v10/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "defaultValues",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "entityId",
                        "storageKey": null
                      },
                      (v11/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "schemaVersionSlug",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "DOIData",
                    "kind": "LinkedField",
                    "name": "doiData",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "doi",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "rawDOI",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "visibility",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "visibleAfterAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "visibleUntilAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "VariablePrecisionDate",
                    "kind": "LinkedField",
                    "name": "published",
                    "plural": false,
                    "selections": (v12/*: any*/),
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "SchemaInstanceContext",
                        "kind": "LinkedField",
                        "name": "schemaInstanceContext",
                        "plural": false,
                        "selections": [
                          (v11/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "schemaProperties",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v13/*: any*/),
                              (v6/*: any*/),
                              (v14/*: any*/),
                              (v15/*: any*/),
                              (v16/*: any*/)
                            ],
                            "type": "ScalarProperty",
                            "abstractKey": "__isScalarProperty"
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v13/*: any*/),
                              (v17/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "properties",
                                "plural": true,
                                "selections": [
                                  (v2/*: any*/),
                                  (v13/*: any*/),
                                  (v6/*: any*/),
                                  (v14/*: any*/),
                                  (v15/*: any*/),
                                  (v16/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "GroupProperty",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": "properties",
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "schemaProperties",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "kind": "TypeDiscriminator",
                            "abstractKey": "__isSchemaProperty"
                          },
                          (v13/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v16/*: any*/),
                              (v21/*: any*/),
                              (v22/*: any*/),
                              (v23/*: any*/),
                              (v24/*: any*/),
                              (v25/*: any*/),
                              (v26/*: any*/),
                              (v27/*: any*/),
                              (v28/*: any*/),
                              (v29/*: any*/),
                              (v32/*: any*/),
                              (v34/*: any*/),
                              (v35/*: any*/),
                              (v36/*: any*/),
                              (v37/*: any*/),
                              (v38/*: any*/),
                              (v39/*: any*/),
                              (v40/*: any*/),
                              (v45/*: any*/),
                              (v46/*: any*/)
                            ],
                            "type": "ScalarProperty",
                            "abstractKey": "__isScalarProperty"
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "properties",
                                "plural": true,
                                "selections": [
                                  (v2/*: any*/),
                                  (v16/*: any*/),
                                  {
                                    "kind": "TypeDiscriminator",
                                    "abstractKey": "__isScalarProperty"
                                  },
                                  (v21/*: any*/),
                                  (v22/*: any*/),
                                  (v23/*: any*/),
                                  (v24/*: any*/),
                                  (v25/*: any*/),
                                  (v26/*: any*/),
                                  (v27/*: any*/),
                                  (v28/*: any*/),
                                  (v29/*: any*/),
                                  (v32/*: any*/),
                                  (v34/*: any*/),
                                  (v35/*: any*/),
                                  (v36/*: any*/),
                                  (v37/*: any*/),
                                  (v38/*: any*/),
                                  (v39/*: any*/),
                                  (v40/*: any*/),
                                  (v45/*: any*/),
                                  (v46/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v17/*: any*/),
                              (v18/*: any*/)
                            ],
                            "type": "GroupProperty",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "kind": "InlineFragment",
                            "selections": (v49/*: any*/),
                            "type": "Collection",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v49/*: any*/),
                            "type": "Item",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v49/*: any*/),
                            "type": "Community",
                            "abstractKey": null
                          }
                        ],
                        "type": "Entity",
                        "abstractKey": "__isEntity"
                      },
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isNode"
                      }
                    ],
                    "type": "SchemaInstance",
                    "abstractKey": "__isSchemaInstance"
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v47/*: any*/),
                          (v50/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "parent",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v52/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": (v51/*: any*/),
                                "type": "Community",
                                "abstractKey": null
                              },
                              (v7/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v53/*: any*/)
                        ],
                        "type": "Collection",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v47/*: any*/),
                          (v50/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "parent",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v52/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": (v51/*: any*/),
                                "type": "Item",
                                "abstractKey": null
                              },
                              (v7/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v53/*: any*/)
                        ],
                        "type": "Item",
                        "abstractKey": null
                      }
                    ],
                    "type": "Entity",
                    "abstractKey": "__isEntity"
                  }
                ],
                "type": "Item",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "SubmissionTarget",
            "kind": "LinkedField",
            "name": "submissionTarget",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "entity",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0a96676bd2ef6f8861caceee5fb5ca2f",
    "id": null,
    "metadata": {},
    "name": "detailsMySubmissionQuery",
    "operationKind": "query",
    "text": "query detailsMySubmissionQuery(\n  $slug: Slug!\n) {\n  submission(slug: $slug) {\n    ...SubmissionDetailsFragment\n    entity {\n      __typename\n      ... on Item {\n        ...SubmissionUpdateFormFragment\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment AssetPropertyFragment on AssetProperty {\n  ...ScalarPropertyFragment\n}\n\nfragment AssetsPropertyFragment on AssetsProperty {\n  ...ScalarPropertyFragment\n}\n\nfragment BooleanPropertyFragment on BooleanProperty {\n  ...ScalarPropertyFragment\n  checked\n  checkedByDefault\n}\n\nfragment ContributorPropertyFragment on ContributorProperty {\n  ...ScalarPropertyFragment\n}\n\nfragment ContributorsPropertyFragment on ContributorsProperty {\n  ...ScalarPropertyFragment\n}\n\nfragment DatePropertyFragment on DateProperty {\n  ...ScalarPropertyFragment\n  date\n}\n\nfragment EmailPropertyFragment on EmailProperty {\n  ...ScalarPropertyFragment\n  address\n  defaultAddress\n}\n\nfragment EntitiesPropertyFragment on EntitiesProperty {\n  ...ScalarPropertyFragment\n  availableEntities {\n    label\n    value\n    entity {\n      __typename\n      ...getEntityTitleFragment\n      id\n    }\n  }\n}\n\nfragment EntityPropertyFragment on EntityProperty {\n  ...ScalarPropertyFragment\n  availableEntities {\n    label\n    value\n    entity {\n      __typename\n      ...getEntityTitleFragment\n      id\n    }\n  }\n}\n\nfragment FileUploadFragment on ImageAttachment {\n  originalFilename\n  storage\n  thumb {\n    png {\n      alt\n      url\n    }\n  }\n}\n\nfragment FloatPropertyFragment on FloatProperty {\n  ...ScalarPropertyFragment\n  floatValue\n  defaultFloat\n}\n\nfragment FullTextPropertyFragment on FullTextProperty {\n  ...ScalarPropertyFragment\n  description\n  fullText {\n    content\n    kind\n    lang\n  }\n}\n\nfragment GroupPropertyFragment on GroupProperty {\n  legend\n  path\n  properties {\n    __typename\n    submittable\n    ...SchemaPropertyFragment\n  }\n}\n\nfragment HarvestingStatusFragment on Entity {\n  __isEntity: __typename\n  ... on Collection {\n    harvestModificationStatus\n  }\n  ... on Item {\n    harvestModificationStatus\n  }\n}\n\nfragment ImageDisplayFragment on ImageAttachment {\n  originalFilename\n  storage\n  thumb {\n    png {\n      url\n      ...ImageFragment\n    }\n  }\n}\n\nfragment ImageFragment on Image {\n  __isImage: __typename\n  alt\n  url\n  width\n  height\n}\n\nfragment IntegerPropertyFragment on IntegerProperty {\n  ...ScalarPropertyFragment\n  integerValue\n  defaultInteger\n}\n\nfragment MarkdownPropertyFragment on MarkdownProperty {\n  ...ScalarPropertyFragment\n  content\n  default\n}\n\nfragment MultiselectPropertyFragment on MultiselectProperty {\n  ...ScalarPropertyFragment\n  options {\n    label\n    value\n  }\n}\n\nfragment ParentSelectorFragment on Entity {\n  __isEntity: __typename\n  ... on Collection {\n    __typename\n    entityId: id\n    schemaVersion {\n      enforcesParent\n      enforcedParentVersions {\n        identifier\n        namespace\n        id\n      }\n      id\n    }\n    parent {\n      __typename\n      ... on Collection {\n        id\n        slug\n        title\n      }\n      ... on Community {\n        id\n        slug\n        title\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  ... on Item {\n    __typename\n    entityId: id\n    schemaVersion {\n      enforcesParent\n      enforcedParentVersions {\n        identifier\n        namespace\n        id\n      }\n      id\n    }\n    parent {\n      __typename\n      ... on Collection {\n        id\n        slug\n        title\n      }\n      ... on Item {\n        id\n        slug\n        title\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n\nfragment ScalarPropertyFragment on ScalarProperty {\n  __isScalarProperty: __typename\n  name: fullPath\n  label\n  path\n  required\n  type\n  isWide\n  instructions\n}\n\nfragment SchemaFieldsDisplayFragment on SchemaInstance {\n  __isSchemaInstance: __typename\n  schemaInstanceContext {\n    fieldValues\n  }\n  schemaProperties {\n    __typename\n    ... on ScalarProperty {\n      __isScalarProperty: __typename\n      fullPath\n      label\n      type\n      isWide\n      submittable\n    }\n    ... on GroupProperty {\n      fullPath\n      legend\n      properties {\n        __typename\n        fullPath\n        label\n        type\n        isWide\n        submittable\n      }\n    }\n  }\n}\n\nfragment SchemaFormFieldsContextFragment on SchemaInstance {\n  __isSchemaInstance: __typename\n  context: schemaInstanceContext {\n    ...useSchemaContextFragment\n  }\n  ... on Node {\n    __isNode: __typename\n    id\n  }\n}\n\nfragment SchemaFormFieldsFragment on SchemaInstance {\n  __isSchemaInstance: __typename\n  properties: schemaProperties {\n    __typename\n    ... on ScalarProperty {\n      __isScalarProperty: __typename\n      submittable\n    }\n    ... on GroupProperty {\n      properties {\n        __typename\n        submittable\n      }\n    }\n    ...SchemaInstancePropertyFragment\n  }\n  ...SchemaSelectorDataFragment\n  ...SchemaFormFieldsContextFragment\n}\n\nfragment SchemaInstancePropertyFragment on SchemaProperty {\n  __isSchemaProperty: __typename\n  __typename\n  ... on ScalarProperty {\n    __isScalarProperty: __typename\n    submittable\n  }\n  ... on GroupProperty {\n    properties {\n      __typename\n      submittable\n    }\n    ...GroupPropertyFragment\n  }\n  ...SchemaPropertyFragment\n}\n\nfragment SchemaPropertyFragment on ScalarProperty {\n  __isScalarProperty: __typename\n  __typename\n  submittable\n  ... on AssetProperty {\n    ...AssetPropertyFragment\n  }\n  ... on AssetsProperty {\n    ...AssetsPropertyFragment\n  }\n  ... on BooleanProperty {\n    ...BooleanPropertyFragment\n  }\n  ... on ContributorProperty {\n    ...ContributorPropertyFragment\n  }\n  ... on ContributorsProperty {\n    ...ContributorsPropertyFragment\n  }\n  ... on DateProperty {\n    ...DatePropertyFragment\n  }\n  ... on EmailProperty {\n    ...EmailPropertyFragment\n  }\n  ... on FloatProperty {\n    ...FloatPropertyFragment\n  }\n  ... on IntegerProperty {\n    ...IntegerPropertyFragment\n  }\n  ... on MarkdownProperty {\n    ...MarkdownPropertyFragment\n  }\n  ... on MultiselectProperty {\n    ...MultiselectPropertyFragment\n  }\n  ... on SelectProperty {\n    ...SelectPropertyFragment\n  }\n  ... on StringProperty {\n    ...StringPropertyFragment\n  }\n  ... on TagsProperty {\n    ...TagsPropertyFragment\n  }\n  ... on FullTextProperty {\n    ...FullTextPropertyFragment\n  }\n  ... on URLProperty {\n    ...URLPropertyFragment\n  }\n  ... on VariableDateProperty {\n    ...VariableDatePropertyFragment\n  }\n  ... on EntityProperty {\n    ...EntityPropertyFragment\n  }\n  ... on EntitiesProperty {\n    ...EntitiesPropertyFragment\n  }\n}\n\nfragment SchemaSelectorDataFragment on Entity {\n  __isEntity: __typename\n  ... on Collection {\n    entityId: id\n    schemaVersion {\n      name\n      number\n      slug\n      id\n    }\n  }\n  ... on Item {\n    entityId: id\n    schemaVersion {\n      name\n      number\n      slug\n      id\n    }\n  }\n  ... on Community {\n    entityId: id\n    schemaVersion {\n      name\n      number\n      slug\n      id\n    }\n  }\n}\n\nfragment SelectPropertyFragment on SelectProperty {\n  options {\n    label\n    value\n  }\n  ...ScalarPropertyFragment\n}\n\nfragment StringPropertyFragment on StringProperty {\n  ...ScalarPropertyFragment\n  content\n  default\n}\n\nfragment SubmissionContributorsFragment on Item {\n  id\n  contributions(page: 1, perPage: 50, order: OLDEST) {\n    nodes {\n      id\n      outerPosition\n      contributionRole {\n        label\n        id\n      }\n      contributor {\n        __typename\n        ... on PersonContributor {\n          givenName\n          familyName\n        }\n        ... on OrganizationContributor {\n          legalName\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment SubmissionDetailsFragment on Submission {\n  state\n  updatedAt\n  entity {\n    __typename\n    ... on Item {\n      id\n      title\n      subtitle\n      summary\n      thumbnail {\n        ...ImageDisplayFragment\n      }\n      heroImage {\n        ...ImageDisplayFragment\n      }\n      ...SchemaFieldsDisplayFragment\n      ...SubmissionContributorsFragment\n    }\n    id\n  }\n  submissionTarget {\n    entity {\n      __typename\n      title\n      id\n    }\n    id\n  }\n}\n\nfragment SubmissionUpdateFormFieldsFragment on Item {\n  title\n  subtitle\n  doiData {\n    doi\n  }\n  rawDOI\n  visibility\n  summary\n  visibleAfterAt\n  visibleUntilAt\n  thumbnail {\n    ...FileUploadFragment\n  }\n  heroImage {\n    ...FileUploadFragment\n  }\n  published {\n    ...VariablePrecisionDateControlFragment\n  }\n}\n\nfragment SubmissionUpdateFormFragment on Item {\n  itemId: id\n  ...ParentSelectorFragment\n  ...HarvestingStatusFragment\n  context: schemaInstanceContext {\n    ...useSchemaContextFragment\n  }\n  ...SubmissionUpdateFormFieldsFragment\n  ...SchemaFormFieldsFragment\n  ...useSchemaPropertiesFragment\n  ...SubmissionContributorsFragment\n}\n\nfragment TagsPropertyFragment on TagsProperty {\n  ...ScalarPropertyFragment\n  tags\n}\n\nfragment URLPropertyFragment on URLProperty {\n  ...ScalarPropertyFragment\n  url {\n    href\n    label\n    title\n  }\n}\n\nfragment VariableDatePropertyFragment on VariableDateProperty {\n  ...ScalarPropertyFragment\n  dateWithPrecision {\n    ...VariablePrecisionDateControlFragment\n  }\n}\n\nfragment VariablePrecisionDateControlFragment on VariablePrecisionDate {\n  precision\n  value\n}\n\nfragment getEntityTitleFragment on Entity {\n  __isEntity: __typename\n  __typename\n  title\n  schemaVersion {\n    identifier\n    id\n  }\n  ... on Collection {\n    namedAncestors {\n      ancestor {\n        __typename\n        __isEntity: __typename\n        title\n        id\n      }\n    }\n  }\n  ... on Item {\n    namedAncestors {\n      ancestor {\n        __typename\n        __isEntity: __typename\n        title\n        id\n      }\n    }\n  }\n}\n\nfragment useSchemaContextFragment on SchemaInstanceContext {\n  assets {\n    kind\n    label\n    value\n  }\n  contributors {\n    kind\n    label\n    value\n  }\n  defaultValues\n  entityId\n  fieldValues\n  schemaVersionSlug\n}\n\nfragment useSchemaPropertiesFragment on SchemaInstance {\n  __isSchemaInstance: __typename\n  properties: schemaProperties {\n    __typename\n    __isSchemaProperty: __typename\n    fullPath\n  }\n}\n"
  }
};
})();

(node as any).hash = "05120a5b31e1f79c3edfba5d4387da36";

export default node;
