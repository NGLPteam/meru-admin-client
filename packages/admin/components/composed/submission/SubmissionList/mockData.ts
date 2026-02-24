export interface SubmissionNode {
  [key: string]: unknown;
  id: string;
  slug: string;
  title: string;
  status: string;
  collection: string;
  updatedAt: string;
  allowedActions: string[];
}

export const MOCK_SUBMISSIONS: readonly SubmissionNode[] = [
  {
    id: "mock-submission-1",
    slug: "mock-submission-1",
    title: "Advances in Digital Preservation Techniques",
    status: "Draft",
    collection: "Digital Humanities Quarterly",
    updatedAt: "2026-02-20T14:30:00Z",
    allowedActions: [],
  },
  {
    id: "mock-submission-2",
    slug: "mock-submission-2",
    title: "Open Access and Community Engagement",
    status: "In Review",
    collection: "Library Science Research",
    updatedAt: "2026-02-18T09:15:00Z",
    allowedActions: [],
  },
  {
    id: "mock-submission-3",
    slug: "mock-submission-3",
    title: "Metadata Standards for Institutional Repositories",
    status: "Published",
    collection: "Information Management Journal",
    updatedAt: "2026-01-25T16:45:00Z",
    allowedActions: [],
  },
  {
    id: "mock-submission-4",
    slug: "mock-submission-4",
    title: "Collaborative Cataloging in the Digital Age",
    status: "Draft",
    collection: "Digital Humanities Quarterly",
    updatedAt: "2026-02-22T11:00:00Z",
    allowedActions: [],
  },
  {
    id: "mock-submission-5",
    slug: "mock-submission-5",
    title: "Linked Data Applications for Cultural Heritage",
    status: "In Review",
    collection: "Archives & Records",
    updatedAt: "2026-02-10T08:30:00Z",
    allowedActions: [],
  },
];
