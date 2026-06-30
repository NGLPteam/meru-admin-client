/**
 * @generated SignedSource<<d6d1ad047f368673a052bf9ede094bd6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DatePrecision = "DAY" | "MONTH" | "NONE" | "YEAR" | "%future added value";
export type EntityVisibility = "HIDDEN" | "LIMITED" | "VISIBLE" | "%future added value";
export type UploadStorage = "CACHE" | "%future added value";
export type UpdateItemInput = {
  clearHeroImage?: boolean | null | undefined;
  clearThumbnail?: boolean | null | undefined;
  clientMutationId?: string | null | undefined;
  doi?: string | null | undefined;
  heroImage?: UploadedFileInput | null | undefined;
  heroImageMetadata?: ImageMetadataInput | null | undefined;
  itemId: string;
  maintainPristineStatus?: boolean | null | undefined;
  published?: VariablePrecisionDateInput | null | undefined;
  schemaProperties?: any | null | undefined;
  subtitle?: string | null | undefined;
  summary?: string | null | undefined;
  thumbnail?: UploadedFileInput | null | undefined;
  thumbnailMetadata?: ImageMetadataInput | null | undefined;
  title: string;
  visibility: EntityVisibility;
  visibleAfterAt?: string | null | undefined;
  visibleUntilAt?: string | null | undefined;
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
export type VariablePrecisionDateInput = {
  precision: DatePrecision;
  value?: string | null | undefined;
};
export type ItemUpdateFormMutation$variables = {
  input: UpdateItemInput;
};
export type ItemUpdateFormMutation$data = {
  readonly updateItem: {
    readonly item: {
      readonly " $fragmentSpreads": FragmentRefs<"HarvestingStatusFragment" | "ItemUpdateFormFieldsFragment" | "SchemaFormFieldsFragment">;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"ItemUpdateForm_schemaErrorsFragment" | "MutationForm_mutationErrors">;
  } | null | undefined;
};
export type ItemUpdateFormMutation = {
  response: ItemUpdateFormMutation$data;
  variables: ItemUpdateFormMutation$variables;
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
  "kind": "ScalarField",
  "name": "path",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v5 = {
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
        (v2/*: any*/),
        (v3/*: any*/),
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
        (v4/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "StandardMutationPayload",
  "abstractKey": "__isStandardMutationPayload"
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "SchemaValueError",
  "kind": "LinkedField",
  "name": "schemaErrors",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hint",
      "storageKey": null
    },
    (v4/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "metadata",
      "storageKey": null
    },
    (v2/*: any*/)
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v8 = [
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
            "name": "alt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "url",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v10 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "precision",
    "storageKey": null
  },
  (v9/*: any*/)
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label",
  "storageKey": null
},
v14 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": "name",
      "args": null,
      "kind": "ScalarField",
      "name": "fullPath",
      "storageKey": null
    },
    (v13/*: any*/),
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "required",
      "storageKey": null
    },
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isWide",
      "storageKey": null
    }
  ],
  "type": "ScalarProperty",
  "abstractKey": "__isScalarProperty"
},
v15 = [
  (v14/*: any*/)
],
v16 = {
  "kind": "InlineFragment",
  "selections": (v15/*: any*/),
  "type": "AssetProperty",
  "abstractKey": null
},
v17 = {
  "kind": "InlineFragment",
  "selections": (v15/*: any*/),
  "type": "AssetsProperty",
  "abstractKey": null
},
v18 = {
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
    (v14/*: any*/)
  ],
  "type": "BooleanProperty",
  "abstractKey": null
},
v19 = {
  "kind": "InlineFragment",
  "selections": (v15/*: any*/),
  "type": "ContributorProperty",
  "abstractKey": null
},
v20 = {
  "kind": "InlineFragment",
  "selections": (v15/*: any*/),
  "type": "ContributorsProperty",
  "abstractKey": null
},
v21 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
      "storageKey": null
    },
    (v14/*: any*/)
  ],
  "type": "DateProperty",
  "abstractKey": null
},
v22 = {
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
    (v14/*: any*/)
  ],
  "type": "EmailProperty",
  "abstractKey": null
},
v23 = {
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
    (v14/*: any*/)
  ],
  "type": "FloatProperty",
  "abstractKey": null
},
v24 = {
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
    (v14/*: any*/)
  ],
  "type": "IntegerProperty",
  "abstractKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v26 = [
  (v25/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "default",
    "storageKey": null
  },
  (v14/*: any*/)
],
v27 = {
  "kind": "InlineFragment",
  "selections": (v26/*: any*/),
  "type": "MarkdownProperty",
  "abstractKey": null
},
v28 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "SelectOption",
    "kind": "LinkedField",
    "name": "options",
    "plural": true,
    "selections": [
      (v13/*: any*/),
      (v9/*: any*/)
    ],
    "storageKey": null
  },
  (v14/*: any*/)
],
v29 = {
  "kind": "InlineFragment",
  "selections": (v28/*: any*/),
  "type": "MultiselectProperty",
  "abstractKey": null
},
v30 = {
  "kind": "InlineFragment",
  "selections": (v28/*: any*/),
  "type": "SelectProperty",
  "abstractKey": null
},
v31 = {
  "kind": "InlineFragment",
  "selections": (v26/*: any*/),
  "type": "StringProperty",
  "abstractKey": null
},
v32 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "tags",
      "storageKey": null
    },
    (v14/*: any*/)
  ],
  "type": "TagsProperty",
  "abstractKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "kind",
  "storageKey": null
},
v34 = {
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
        (v25/*: any*/),
        (v33/*: any*/),
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
    (v14/*: any*/)
  ],
  "type": "FullTextProperty",
  "abstractKey": null
},
v35 = {
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
        (v13/*: any*/),
        (v7/*: any*/)
      ],
      "storageKey": null
    },
    (v14/*: any*/)
  ],
  "type": "URLProperty",
  "abstractKey": null
},
v36 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "VariablePrecisionDate",
      "kind": "LinkedField",
      "name": "dateWithPrecision",
      "plural": false,
      "selections": (v10/*: any*/),
      "storageKey": null
    },
    (v14/*: any*/)
  ],
  "type": "VariableDateProperty",
  "abstractKey": null
},
v37 = {
  "kind": "TypeDiscriminator",
  "abstractKey": "__isEntity"
},
v38 = [
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
          (v12/*: any*/),
          (v37/*: any*/),
          (v7/*: any*/),
          (v11/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v39 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "EntitySelectOption",
    "kind": "LinkedField",
    "name": "availableEntities",
    "plural": true,
    "selections": [
      (v13/*: any*/),
      (v9/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "entity",
        "plural": false,
        "selections": [
          (v12/*: any*/),
          (v37/*: any*/),
          (v7/*: any*/),
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
                "name": "identifier",
                "storageKey": null
              },
              (v11/*: any*/)
            ],
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": (v38/*: any*/),
            "type": "Collection",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": (v38/*: any*/),
            "type": "Item",
            "abstractKey": null
          },
          (v11/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v14/*: any*/)
],
v40 = {
  "kind": "InlineFragment",
  "selections": (v39/*: any*/),
  "type": "EntityProperty",
  "abstractKey": null
},
v41 = {
  "kind": "InlineFragment",
  "selections": (v39/*: any*/),
  "type": "EntitiesProperty",
  "abstractKey": null
},
v42 = [
  (v33/*: any*/),
  (v13/*: any*/),
  (v9/*: any*/)
],
v43 = [
  {
    "alias": "entityId",
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  },
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
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "slug",
        "storageKey": null
      },
      (v11/*: any*/)
    ],
    "storageKey": null
  }
],
v44 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "harvestModificationStatus",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ItemUpdateFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateItemPayload",
        "kind": "LinkedField",
        "name": "updateItem",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Item",
            "kind": "LinkedField",
            "name": "item",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ItemUpdateFormFieldsFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SchemaFormFieldsFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "HarvestingStatusFragment"
              }
            ],
            "storageKey": null
          },
          {
            "kind": "InlineDataFragmentSpread",
            "name": "MutationForm_mutationErrors",
            "selections": [
              (v5/*: any*/)
            ],
            "args": null,
            "argumentDefinitions": []
          },
          {
            "kind": "InlineDataFragmentSpread",
            "name": "ItemUpdateForm_schemaErrorsFragment",
            "selections": [
              (v6/*: any*/)
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
    "name": "ItemUpdateFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateItemPayload",
        "kind": "LinkedField",
        "name": "updateItem",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Item",
            "kind": "LinkedField",
            "name": "item",
            "plural": false,
            "selections": [
              (v7/*: any*/),
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
                "name": "summary",
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
                "concreteType": "ImageAttachment",
                "kind": "LinkedField",
                "name": "thumbnail",
                "plural": false,
                "selections": (v8/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ImageAttachment",
                "kind": "LinkedField",
                "name": "heroImage",
                "plural": false,
                "selections": (v8/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "VariablePrecisionDate",
                "kind": "LinkedField",
                "name": "published",
                "plural": false,
                "selections": (v10/*: any*/),
                "storageKey": null
              },
              (v11/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": "properties",
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "schemaProperties",
                    "plural": true,
                    "selections": [
                      (v12/*: any*/),
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isSchemaProperty"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "legend",
                            "storageKey": null
                          },
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "properties",
                            "plural": true,
                            "selections": [
                              (v12/*: any*/),
                              {
                                "kind": "TypeDiscriminator",
                                "abstractKey": "__isScalarProperty"
                              },
                              (v16/*: any*/),
                              (v17/*: any*/),
                              (v18/*: any*/),
                              (v19/*: any*/),
                              (v20/*: any*/),
                              (v21/*: any*/),
                              (v22/*: any*/),
                              (v23/*: any*/),
                              (v24/*: any*/),
                              (v27/*: any*/),
                              (v29/*: any*/),
                              (v30/*: any*/),
                              (v31/*: any*/),
                              (v32/*: any*/),
                              (v34/*: any*/),
                              (v35/*: any*/),
                              (v36/*: any*/),
                              (v40/*: any*/),
                              (v41/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "GroupProperty",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v16/*: any*/),
                          (v17/*: any*/),
                          (v18/*: any*/),
                          (v19/*: any*/),
                          (v20/*: any*/),
                          (v21/*: any*/),
                          (v22/*: any*/),
                          (v23/*: any*/),
                          (v24/*: any*/),
                          (v27/*: any*/),
                          (v29/*: any*/),
                          (v30/*: any*/),
                          (v31/*: any*/),
                          (v32/*: any*/),
                          (v34/*: any*/),
                          (v35/*: any*/),
                          (v36/*: any*/),
                          (v40/*: any*/),
                          (v41/*: any*/)
                        ],
                        "type": "ScalarProperty",
                        "abstractKey": "__isScalarProperty"
                      }
                    ],
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
                        "selections": (v42/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ContributorSelectOption",
                        "kind": "LinkedField",
                        "name": "contributors",
                        "plural": true,
                        "selections": (v42/*: any*/),
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "fieldValues",
                        "storageKey": null
                      },
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
                    "kind": "InlineFragment",
                    "selections": [
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
                      {
                        "kind": "InlineFragment",
                        "selections": (v43/*: any*/),
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
                    "selections": (v44/*: any*/),
                    "type": "Collection",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v44/*: any*/),
                    "type": "Item",
                    "abstractKey": null
                  }
                ],
                "type": "Entity",
                "abstractKey": "__isEntity"
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7fbe7a8c1f7b0ae44ec04aaa9560bcad",
    "id": null,
    "metadata": {},
    "name": "ItemUpdateFormMutation",
    "operationKind": "mutation",
    "text": "mutation ItemUpdateFormMutation(\n  $input: UpdateItemInput!\n) {\n  updateItem(input: $input) {\n    item {\n      ...ItemUpdateFormFieldsFragment\n      ...SchemaFormFieldsFragment\n      ...HarvestingStatusFragment\n      id\n    }\n    ...MutationForm_mutationErrors\n    ...ItemUpdateForm_schemaErrorsFragment\n  }\n}\n\nfragment AssetPropertyFragment on AssetProperty {\n  ...ScalarPropertyFragment\n}\n\nfragment AssetsPropertyFragment on AssetsProperty {\n  ...ScalarPropertyFragment\n}\n\nfragment BooleanPropertyFragment on BooleanProperty {\n  ...ScalarPropertyFragment\n  checked\n  checkedByDefault\n}\n\nfragment ContributorPropertyFragment on ContributorProperty {\n  ...ScalarPropertyFragment\n}\n\nfragment ContributorsPropertyFragment on ContributorsProperty {\n  ...ScalarPropertyFragment\n}\n\nfragment DatePropertyFragment on DateProperty {\n  ...ScalarPropertyFragment\n  date\n}\n\nfragment EmailPropertyFragment on EmailProperty {\n  ...ScalarPropertyFragment\n  address\n  defaultAddress\n}\n\nfragment EntitiesPropertyFragment on EntitiesProperty {\n  ...ScalarPropertyFragment\n  availableEntities {\n    label\n    value\n    entity {\n      __typename\n      ...getEntityTitleFragment\n      id\n    }\n  }\n}\n\nfragment EntityPropertyFragment on EntityProperty {\n  ...ScalarPropertyFragment\n  availableEntities {\n    label\n    value\n    entity {\n      __typename\n      ...getEntityTitleFragment\n      id\n    }\n  }\n}\n\nfragment FileUploadFragment on ImageAttachment {\n  originalFilename\n  storage\n  thumb {\n    png {\n      alt\n      url\n    }\n  }\n}\n\nfragment FloatPropertyFragment on FloatProperty {\n  ...ScalarPropertyFragment\n  floatValue\n  defaultFloat\n}\n\nfragment FullTextPropertyFragment on FullTextProperty {\n  ...ScalarPropertyFragment\n  description\n  fullText {\n    content\n    kind\n    lang\n  }\n}\n\nfragment GroupPropertyFragment on GroupProperty {\n  legend\n  path\n  properties {\n    __typename\n    ...SchemaPropertyFragment\n  }\n}\n\nfragment HarvestingStatusFragment on Entity {\n  __isEntity: __typename\n  ... on Collection {\n    harvestModificationStatus\n  }\n  ... on Item {\n    harvestModificationStatus\n  }\n}\n\nfragment IntegerPropertyFragment on IntegerProperty {\n  ...ScalarPropertyFragment\n  integerValue\n  defaultInteger\n}\n\nfragment ItemUpdateFormFieldsFragment on Item {\n  title\n  subtitle\n  doiData {\n    doi\n  }\n  rawDOI\n  visibility\n  summary\n  visibleAfterAt\n  visibleUntilAt\n  thumbnail {\n    ...FileUploadFragment\n  }\n  heroImage {\n    ...FileUploadFragment\n  }\n  published {\n    ...VariablePrecisionDateControlFragment\n  }\n}\n\nfragment ItemUpdateForm_schemaErrorsFragment on UpdateItemPayload {\n  schemaErrors {\n    hint\n    message\n    metadata\n    path\n  }\n}\n\nfragment MarkdownPropertyFragment on MarkdownProperty {\n  ...ScalarPropertyFragment\n  content\n  default\n}\n\nfragment MultiselectPropertyFragment on MultiselectProperty {\n  ...ScalarPropertyFragment\n  options {\n    label\n    value\n  }\n}\n\nfragment MutationForm_mutationErrors on StandardMutationPayload {\n  __isStandardMutationPayload: __typename\n  attributeErrors {\n    path\n    type\n    messages\n  }\n  globalErrors {\n    message\n  }\n}\n\nfragment ScalarPropertyFragment on ScalarProperty {\n  __isScalarProperty: __typename\n  name: fullPath\n  label\n  path\n  required\n  type\n  isWide\n}\n\nfragment SchemaFormFieldsContextFragment on SchemaInstance {\n  __isSchemaInstance: __typename\n  context: schemaInstanceContext {\n    ...useSchemaContextFragment\n  }\n  ... on Node {\n    __isNode: __typename\n    id\n  }\n}\n\nfragment SchemaFormFieldsFragment on SchemaInstance {\n  __isSchemaInstance: __typename\n  properties: schemaProperties {\n    __typename\n    ...SchemaInstancePropertyFragment\n  }\n  ...SchemaSelectorDataFragment\n  ...SchemaFormFieldsContextFragment\n}\n\nfragment SchemaInstancePropertyFragment on SchemaProperty {\n  __isSchemaProperty: __typename\n  __typename\n  ... on GroupProperty {\n    ...GroupPropertyFragment\n  }\n  ...SchemaPropertyFragment\n}\n\nfragment SchemaPropertyFragment on ScalarProperty {\n  __isScalarProperty: __typename\n  __typename\n  ... on AssetProperty {\n    ...AssetPropertyFragment\n  }\n  ... on AssetsProperty {\n    ...AssetsPropertyFragment\n  }\n  ... on BooleanProperty {\n    ...BooleanPropertyFragment\n  }\n  ... on ContributorProperty {\n    ...ContributorPropertyFragment\n  }\n  ... on ContributorsProperty {\n    ...ContributorsPropertyFragment\n  }\n  ... on DateProperty {\n    ...DatePropertyFragment\n  }\n  ... on EmailProperty {\n    ...EmailPropertyFragment\n  }\n  ... on FloatProperty {\n    ...FloatPropertyFragment\n  }\n  ... on IntegerProperty {\n    ...IntegerPropertyFragment\n  }\n  ... on MarkdownProperty {\n    ...MarkdownPropertyFragment\n  }\n  ... on MultiselectProperty {\n    ...MultiselectPropertyFragment\n  }\n  ... on SelectProperty {\n    ...SelectPropertyFragment\n  }\n  ... on StringProperty {\n    ...StringPropertyFragment\n  }\n  ... on TagsProperty {\n    ...TagsPropertyFragment\n  }\n  ... on FullTextProperty {\n    ...FullTextPropertyFragment\n  }\n  ... on URLProperty {\n    ...URLPropertyFragment\n  }\n  ... on VariableDateProperty {\n    ...VariableDatePropertyFragment\n  }\n  ... on EntityProperty {\n    ...EntityPropertyFragment\n  }\n  ... on EntitiesProperty {\n    ...EntitiesPropertyFragment\n  }\n}\n\nfragment SchemaSelectorDataFragment on Entity {\n  __isEntity: __typename\n  ... on Collection {\n    entityId: id\n    schemaVersion {\n      name\n      number\n      slug\n      id\n    }\n  }\n  ... on Item {\n    entityId: id\n    schemaVersion {\n      name\n      number\n      slug\n      id\n    }\n  }\n  ... on Community {\n    entityId: id\n    schemaVersion {\n      name\n      number\n      slug\n      id\n    }\n  }\n}\n\nfragment SelectPropertyFragment on SelectProperty {\n  options {\n    label\n    value\n  }\n  ...ScalarPropertyFragment\n}\n\nfragment StringPropertyFragment on StringProperty {\n  ...ScalarPropertyFragment\n  content\n  default\n}\n\nfragment TagsPropertyFragment on TagsProperty {\n  ...ScalarPropertyFragment\n  tags\n}\n\nfragment URLPropertyFragment on URLProperty {\n  ...ScalarPropertyFragment\n  url {\n    href\n    label\n    title\n  }\n}\n\nfragment VariableDatePropertyFragment on VariableDateProperty {\n  ...ScalarPropertyFragment\n  dateWithPrecision {\n    ...VariablePrecisionDateControlFragment\n  }\n}\n\nfragment VariablePrecisionDateControlFragment on VariablePrecisionDate {\n  precision\n  value\n}\n\nfragment getEntityTitleFragment on Entity {\n  __isEntity: __typename\n  __typename\n  title\n  schemaVersion {\n    identifier\n    id\n  }\n  ... on Collection {\n    namedAncestors {\n      ancestor {\n        __typename\n        __isEntity: __typename\n        title\n        id\n      }\n    }\n  }\n  ... on Item {\n    namedAncestors {\n      ancestor {\n        __typename\n        __isEntity: __typename\n        title\n        id\n      }\n    }\n  }\n}\n\nfragment useSchemaContextFragment on SchemaInstanceContext {\n  assets {\n    kind\n    label\n    value\n  }\n  contributors {\n    kind\n    label\n    value\n  }\n  defaultValues\n  entityId\n  fieldValues\n  schemaVersionSlug\n}\n"
  }
};
})();

(node as any).hash = "0df8ec195ef66954a0a650f9daed52e1";

export default node;
