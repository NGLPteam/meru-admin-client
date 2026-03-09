const COMMUNITIES_LINK = {
  label: "glossary.community_other",
  route: "communities",
  actions: "admin.access",
  model: "communities",
};

const COLLECTIONS_LINK = {
  label: "glossary.collection_other",
  route: "collections",
  actions: "admin.access",
  model: "collections",
};

const ITEMS_LINK = {
  label: "glossary.item_other",
  route: "items",
  actions: "admin.access",
  model: "items",
};

const USERS_LINK = {
  label: "glossary.user_other",
  route: "users",
  actions: "users.update",
  model: "users",
};

const CONTRIBUTORS_LINK = {
  label: "glossary.contributor_other",
  route: "contributors",
  actions: "contributors.update",
  model: "contributors",
};

const HARVESTING_LINK = {
  label: "glossary.harvesting",
  route: "harvesting",
  actions: "settings.update",
  model: "harvestSource",
};

const PERMALINKS_LINK = {
  label: "nav.permalinks",
  route: "permalinks",
  actions: "settings.update",
  model: "permalink",
};

const SUBMISSIONS_LINK = {
  label: "glossary.submission_other",
  route: "submissions",
  actions: "admin.access",
  model: "submission",
  depositing: true,
};

/**
 * App data
 */
const appData = {
  siteInfo: {
    title: "app.title",
    description: "app.description",
    installation: "app.installation",
  },
  headerData: {
    navigation: [
      COMMUNITIES_LINK,
      COLLECTIONS_LINK,
      ITEMS_LINK,
      {
        label: "nav.manage_header",
        actions: ["users.update", "contributors.update", "settings.update"],
        children: [
          USERS_LINK,
          CONTRIBUTORS_LINK,
          HARVESTING_LINK,
          PERMALINKS_LINK,
          SUBMISSIONS_LINK,
        ],
      },
    ],
    account: {
      label: "nav.account_header",
      children: [
        {
          label: "nav.my_submissions",
          route: "my-submissions",
          depositing: true,
        },
        {
          label: "nav.profile",
          route: "profile",
        },
      ],
    },
  },
  footerData: {
    about: {
      header: "app.about_header",
    },
    copyright: "app.copyright",
    navigation: [
      {
        header: "nav.manage_header",
        actions: ["admin.access"],
        children: [
          COMMUNITIES_LINK,
          COLLECTIONS_LINK,
          ITEMS_LINK,
          USERS_LINK,
          CONTRIBUTORS_LINK,
          HARVESTING_LINK,
          PERMALINKS_LINK,
          SUBMISSIONS_LINK,
        ],
      },
    ],
  },
};

export default appData;
