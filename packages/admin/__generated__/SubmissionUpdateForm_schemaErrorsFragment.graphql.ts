/**
 * @generated SignedSource<<f027fe628cb9bc5fcdb15788332a503d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { InlineFragment, ReaderInlineDataFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmissionUpdateForm_schemaErrorsFragment$data = {
  readonly schemaErrors: ReadonlyArray<{
    readonly hint: boolean;
    readonly message: string;
    readonly metadata: any | null | undefined;
    readonly path: string;
  }>;
  readonly " $fragmentType": "SubmissionUpdateForm_schemaErrorsFragment";
};
export type SubmissionUpdateForm_schemaErrorsFragment$key = {
  readonly " $data"?: SubmissionUpdateForm_schemaErrorsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionUpdateForm_schemaErrorsFragment">;
};

const node: ReaderInlineDataFragment = {
  "kind": "InlineDataFragment",
  "name": "SubmissionUpdateForm_schemaErrorsFragment"
};

(node as any).hash = "23e32ae62706f08e6dbf3326b577cfd7";

export default node;
