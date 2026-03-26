import type { BaseRoute } from "@wdp/lib/routes";

export const baseRoutes: BaseRoute[] = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "search",
    path: "/search",
  },
  {
    name: "collections",
    path: "/collections",
    label: "glossary.collection_other",
    routes: [
      {
        name: "collection",
        path: "/collections/[slug]",
        label: "glossary.collection",
        routes: [
          {
            name: "collection.child.collections",
            path: "/collections/[slug]/collections",
            label: "glossary.collection_other",
            childKinds: ["COLLECTION"],
          },
          {
            name: "collection.child.items",
            path: "/collections/[slug]/items",
            label: "glossary.item_other",
            childKinds: ["ITEM"],
          },
          {
            name: "collection.manage",
            path: "/collections/[slug]/manage",
            redirect: "/collections/[slug]/manage/details",
            label: "manage",
            actions: ["self.update"],
            routes: [
              {
                name: "collection.manage.details",
                path: "/collections/[slug]/manage/details",
                label: "nav.details",
                actions: ["self.update"],
              },
              {
                name: "collection.manage.order",
                path: "/collections/[slug]/manage/order",
                label: "nav.order",
                actions: ["self.update"],
              },
              {
                name: "collection.manage.links",
                path: "/collections/[slug]/manage/links",
                label: "nav.links",
                actions: ["self.update"],
              },
              {
                name: "collection.manage.access",
                path: "/collections/[slug]/manage/access",
                label: "nav.access",
                actions: ["self.update"],
              },
              {
                name: "collection.manage.pages",
                path: "/collections/[slug]/manage/pages",
                label: "nav.pages",
                actions: ["self.update"],
              },
              {
                name: "collection.manage.announcements",
                path: "/collections/[slug]/manage/announcements",
                label: "nav.announcements",
                actions: ["self.update"],
              },
              {
                name: "collection.manage.contributions",
                path: "/collections/[slug]/manage/contributions",
                label: "glossary.contribution_other",
                actions: ["self.update"],
              },
              {
                name: "collection.manage.files",
                path: "/collections/[slug]/manage/files",
                label: "nav.files",
                actions: ["self.update"],
              },
              {
                name: "collection.manage.harvestRecords",
                path: "/collections/[slug]/manage/records",
                label: "glossary.harvesting",
                actions: ["settings.update"],
              },
              {
                name: "collection.manage.permalinks",
                path: "/collections/[slug]/manage/permalinks",
                label: "nav.permalinks",
                actions: ["self.update"],
              },
            ],
          },
          {
            name: "collection.submissions",
            path: "/collections/[slug]/submissions",
            redirect: "/collections/[slug]/submissions/settings",
            label: "glossary.submission_other",
            actions: ["self.update"],
            depositing: true,
            routes: [
              {
                name: "collection.submissions.settings",
                path: "/collections/[slug]/submissions/settings",
                label: "nav.settings",
                actions: ["self.update"],
              },
              {
                name: "collection.submissions.reviewers",
                path: "/collections/[slug]/submissions/reviewers",
                label: "nav.reviewers",
                actions: ["self.update"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "items",
    path: "/items",
    label: "glossary.item_other",
    routes: [
      {
        name: "item",
        path: "/items/[slug]",
        label: "glossary.item_other",
        routes: [
          {
            name: "item.child.items",
            path: "/items/[slug]/items",
            label: "glossary.item_other",
            childKinds: ["ITEM"],
          },
          {
            name: "item.manage",
            path: "/items/[slug]/manage",
            redirect: "/items/[slug]/manage/details",
            label: "nav.manage",
            actions: ["self.update"],
            routes: [
              {
                name: "item.manage.details",
                path: "/items/[slug]/manage/details",
                label: "nav.details",
                actions: ["self.update"],
              },
              {
                name: "item.manage.order",
                path: "/items/[slug]/manage/order",
                label: "nav.order",
                actions: ["self.update"],
              },
              {
                name: "item.manage.links",
                path: "/items/[slug]/manage/links",
                label: "nav.links",
                actions: ["self.update"],
              },
              {
                name: "item.manage.access",
                path: "/items/[slug]/manage/access",
                label: "nav.access",
                actions: ["self.update"],
              },
              {
                name: "item.manage.pages",
                path: "/items/[slug]/manage/pages",
                label: "nav.pages",
                actions: ["self.update"],
              },
              {
                name: "item.manage.announcements",
                path: "/items/[slug]/manage/announcements",
                label: "nav.announcements",
                actions: ["self.update"],
              },
              {
                name: "item.manage.contributions",
                path: "/items/[slug]/manage/contributions",
                label: "glossary.contribution_other",
                actions: ["self.update"],
              },
              {
                name: "item.manage.files",
                path: "/items/[slug]/manage/files",
                label: "nav.files",
                actions: ["self.update"],
              },
              {
                name: "item.manage.harvestRecords",
                path: "/items/[slug]/manage/records",
                label: "glossary.harvesting",
                actions: ["settings.update"],
              },
              {
                name: "item.manage.permalinks",
                path: "/items/[slug]/manage/permalinks",
                label: "nav.permalinks",
                actions: ["self.update"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "communities",
    path: "/communities",
    label: "glossary.community_other",
    routes: [
      {
        name: "community",
        path: "/communities/[slug]",
        redirect: "/communities/[slug]/collections",
        label: "glossary.community_other",
        routes: [
          {
            name: "community.child.collections",
            path: "/communities/[slug]/collections",
            label: "glossary.collection_other",
            childKinds: ["COLLECTION"],
          },
          {
            name: "community.manage",
            path: "/communities/[slug]/manage",
            redirect: "/communities/[slug]/manage/details",
            label: "nav.manage",
            actions: ["self.update"],
            routes: [
              {
                name: "community.manage.details",
                path: "/communities/[slug]/manage/details",
                label: "nav.details",
                actions: ["self.update"],
              },
              {
                name: "community.manage.members",
                path: "/communities/[slug]/manage/members",
                label: "nav.members",
                actions: ["self.update"],
              },
              {
                name: "community.manage.pages",
                path: "/communities/[slug]/manage/pages",
                label: "nav.pages",
                actions: ["self.update"],
              },
              {
                name: "community.manage.announcements",
                path: "/communities/[slug]/manage/announcements",
                label: "nav.announcements",
                actions: ["self.update"],
              },
              {
                name: "community.manage.permalinks",
                path: "/communities/[slug]/manage/permalinks",
                label: "nav.permalinks",
                actions: ["self.update"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "my-submissions",
    path: "/my-submissions",
    label: "glossary.submission_other",
    routes: [
      {
        name: "my-submissions.new",
        path: "/my-submissions/new",
        label: "nav.new_submission",
      },
      {
        name: "my-submissions.detail",
        path: "/my-submissions/[slug]",
        redirect: "/my-submissions/[slug]/details",
        label: "glossary.submission",
        routes: [
          {
            name: "my-submissions.detail.details",
            path: "/my-submissions/[slug]/details",
            label: "nav.details",
            routes: [
              {
                name: "my-submissions.detail.details.edit",
                path: "/my-submissions/[slug]/details/edit",
                label: "common.edit",
              },
            ],
          },
          {
            name: "my-submissions.detail.reviews",
            path: "/my-submissions/[slug]/reviews",
            label: "nav.reviews",
            actions: ["submissions.review"],
          },
        ],
      },
    ],
  },
  {
    name: "my-reviews",
    path: "/my-reviews",
    label: "nav.my_reviews",
  },
  {
    name: "submissions",
    path: "/submissions",
    redirect: "/submissions/review",
    label: "glossary.submission_other",
    routes: [
      {
        name: "submissions.review",
        path: "/submissions/review",
        label: "nav.review",
      },
      {
        name: "submissions.publish",
        path: "/submissions/publish",
        label: "nav.publish",
      },
      {
        name: "submissions.detail",
        path: "/submissions/[slug]",
        redirect: "/submissions/[slug]/details",
        label: "glossary.submission",
        routes: [
          {
            name: "submissions.detail.details",
            path: "/submissions/[slug]/details",
            label: "nav.details",
            routes: [
              {
                name: "submissions.detail.details.edit",
                path: "/submissions/[slug]/details/edit",
                label: "common.edit",
              },
            ],
          },
          {
            name: "submissions.detail.history",
            path: "/submissions/[slug]/history",
            label: "nav.history",
          },
          {
            name: "submissions.detail.reviews",
            path: "/submissions/[slug]/reviews",
            label: "nav.reviews",
          },
        ],
      },
    ],
  },
  {
    name: "communities.search",
    path: "/communities/search",
    label: "Search Communities",
  },
  {
    name: "users",
    path: "/users",
    label: "glossary.user_other",
    actions: ["users.update"],
    routes: [
      {
        name: "user",
        path: "/users/[slug]",
        redirect: "/users/[slug]/details",
        label: "glossary.user_other",
        routes: [
          {
            name: "user.details",
            path: "/users/[slug]/details",
            label: "nav.details",
          },
          {
            name: "user.communities",
            path: "/users/[slug]/communities",
            label: "glossary.community_other",
          },
          {
            name: "user.collections",
            path: "/users/[slug]/collections",
            label: "glossary.collection_other",
          },
          {
            name: "user.items",
            path: "/users/[slug]/items",
            label: "glossary.item_other",
          },
        ],
      },
    ],
  },
  {
    name: "permalinks",
    path: "/permalinks",
    label: "nav.permalinks",
    actions: ["settings.update"],
  },
  {
    name: "contributors",
    path: "/contributors",
    label: "glossary.contributor_other",
    routes: [
      {
        name: "contributor",
        path: "/contributors/[slug]",
        redirect: "/contributors/[slug]/details",
        label: "glossary.contributor_other",
        routes: [
          {
            name: "contributor.details",
            path: "/contributors/[slug]/details",
            label: "nav.details",
          },
          {
            name: "contributor.collections",
            path: "/contributors/[slug]/collections",
            label: "nav.collection_contributions",
          },
          {
            name: "contributor.items",
            path: "/contributors/[slug]/items",
            label: "nav.item_contributions",
          },
        ],
      },
    ],
  },
  {
    name: "harvesting",
    path: "/harvesting",
    label: "glossary.harvesting",
    actions: ["settings.update"],
    routes: [
      {
        name: "harvestSource.new",
        path: "/harvesting/new",
        label: "nav.harvest_source_new",
      },
      {
        name: "harvestSource",
        path: "/harvesting/[slug]",
        redirect: "/harvesting/[slug]/details",
        label: "glossary.harvest_source_other",
        routes: [
          {
            name: "harvestSource.details",
            path: "/harvesting/[slug]/details",
            label: "nav.details",
          },
          {
            name: "harvestSource.harvestSets",
            path: "/harvesting/[slug]/sets",
            label: "nav.harvest_sets",
          },
          {
            name: "harvestSource.mappings",
            path: "/harvesting/[slug]/mappings",
            label: "nav.harvest_mappings",
            routes: [
              {
                name: "harvestSource.mappings.new",
                path: "/harvesting/[slug]/mappings/new",
                label: "nav.harvest_mapping_new",
              },
            ],
          },
          {
            name: "harvestSource.harvestAttempts",
            path: "/harvesting/[slug]/attempts",
            label: "nav.harvest_attempts",
            routes: [
              {
                name: "harvestSource.harvestAttempt.new",
                path: "/harvesting/[slug]/attempts/new",
                label: "nav.new_harvest_attempt",
              },
            ],
          },
          {
            name: "harvestSource.harvestRecords",
            path: "/harvesting/[slug]/records",
            label: "nav.harvest_records",
          },
          {
            name: "harvestSource.harvestMessages",
            path: "/harvesting/[slug]/messages",
            label: "nav.harvest_messages",
          },
          {
            name: "harvestSource.metadataMappings",
            path: "/harvesting/[slug]/metadata",
            label: "nav.metadata_mappings",
            routes: [
              {
                name: "harvestSource.metadataMapping.new",
                path: "/harvesting/[slug]/metadata/new",
                label: "nav.new_metadata_mapping",
              },
            ],
          },
        ],
      },
      {
        name: "harvestMapping",
        path: "/harvesting/mappings/[slug]",
        redirect: "/harvesting/mappings/[slug]/details",
        label: "glossary.harvest_mappings",
        routes: [
          {
            name: "harvestMapping.details",
            path: "/harvesting/mappings/[slug]/details",
            label: "nav.details",
          },
          {
            name: "harvestMapping.harvestAttempts",
            path: "/harvesting/mappings/[slug]/attempts",
            label: "nav.harvest_attempts",
            routes: [
              {
                name: "harvestMapping.harvestAttempt.new",
                path: "/harvesting/mappings/[slug]/attempts/new",
                label: "nav.new_harvest_attempt",
              },
            ],
          },
          {
            name: "harvestMapping.harvestRecords",
            path: "/harvesting/mappings/[slug]/records",
            label: "nav.harvest_records",
          },
          {
            name: "harvestMapping.harvestMessages",
            path: "/harvesting/mappings/[slug]/messages",
            label: "nav.harvest_messages",
          },
        ],
      },
      {
        name: "harvestAttempt",
        path: "/harvesting/attempts/[slug]",
        redirect: "/harvesting/attempts/[slug]/details",
        label: "glossary.harvest_attempts",
        routes: [
          {
            name: "harvestAttempt.details",
            path: "/harvesting/attempts/[slug]/details",
            label: "nav.details",
          },
          {
            name: "harvestAttempt.harvestRecords",
            path: "/harvesting/attempts/[slug]/records",
            label: "nav.harvest_records",
          },
          {
            name: "harvestAttempt.harvestMessages",
            path: "/harvesting/attempts/[slug]/messages",
            label: "nav.harvest_messages",
          },
        ],
      },
      {
        name: "harvestRecord",
        path: "/harvesting/records/[slug]",
        redirect: "/harvesting/records/[slug]/details",
        label: "glossary.harvest_records",
        routes: [
          {
            name: "harvestRecord.details",
            path: "/harvesting/records/[slug]/details",
            label: "nav.details",
          },
          {
            name: "harvestRecord.entities",
            path: "/harvesting/records/[slug]/entities",
            label: "nav.harvest_entities",
          },
          {
            name: "harvestRecord.harvestMessages",
            path: "/harvesting/records/[slug]/messages",
            label: "nav.harvest_messages",
          },
        ],
      },
    ],
  },
];
