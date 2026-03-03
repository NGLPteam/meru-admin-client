export interface SubmissionNode {
  [key: string]: unknown;
  id: string;
  slug: string;
  title: string;
  status: string;
  collection: string;
  updatedAt: string;
  allowedActions: string[];
  reviewComment?: string;
}

export const MOCK_SUBMISSIONS: readonly SubmissionNode[] = [
  {
    id: "mock-submission-1",
    slug: "mock-submission-1",
    title: "Advances in Digital Preservation Techniques",
    status: "Draft",
    collection: "Digital Humanities Quarterly",
    updatedAt: "2026-02-20T14:30:00Z",
    allowedActions: ["self.update"],
  },
  {
    id: "mock-submission-2",
    slug: "mock-submission-2",
    title: "Open Access and Community Engagement",
    status: "Revisions Requested",
    collection: "Library Science Research",
    updatedAt: "2026-02-18T09:15:00Z",
    allowedActions: ["self.update"],
    reviewComment:
      "The methodology section needs more detail on the data collection process. Please also add citations for the claims made in the introduction.",
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
    allowedActions: ["self.update"],
  },
  {
    id: "mock-submission-5",
    slug: "mock-submission-5",
    title: "Linked Data Applications for Cultural Heritage",
    status: "In Review",
    collection: "Archives & Records",
    updatedAt: "2026-02-10T08:30:00Z",
    allowedActions: ["self.update"],
  },
  {
    id: "mock-submission-6",
    slug: "mock-submission-6",
    title: "Sustainable Funding Models for Open Repositories",
    status: "Approved",
    collection: "Library Science Research",
    updatedAt: "2026-02-25T10:00:00Z",
    allowedActions: ["self.update"],
  },
  {
    id: "mock-submission-7",
    slug: "mock-submission-7",
    title: "Interoperability Standards for Digital Archives",
    status: "Approved",
    collection: "Archives & Records",
    updatedAt: "2026-02-27T13:45:00Z",
    allowedActions: ["self.update"],
  },
];
