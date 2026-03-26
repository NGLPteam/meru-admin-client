/**
 * @generated SignedSource<<6c878c32c0d381ebd5d2c0a55da72378>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GlobalSettingsPageFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"GlobalSettingsEditFormFragment">;
  readonly " $fragmentType": "GlobalSettingsPageFragment";
};
export type GlobalSettingsPageFragment$key = {
  readonly " $data"?: GlobalSettingsPageFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"GlobalSettingsPageFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GlobalSettingsPageFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "GlobalSettingsEditFormFragment"
    }
  ],
  "type": "GlobalConfiguration",
  "abstractKey": null
};

(node as any).hash = "68938e6190cf7265a417f11aa8789926";

export default node;
