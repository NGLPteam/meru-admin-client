import type { FieldValues } from "react-hook-form";
import type {
  AssetSelectOption,
  ContributorSelectOption,
  RefetchFnDynamic,
  SchemaFormFieldsContextRefetchQuery,
  SchemaFormFieldsContextFragment$key,
  Options,
} from "types/graphql-schema";

export interface SchemaContextState<T extends FieldValues = FieldValues> {
  /**
   * All available assets, specific to the schema instance.
   */
  readonly assets: AssetSelectOption[];
  /**
   * All available contributors.
   */
  readonly contributors: ContributorSelectOption[];
  /**
   * Future-proofing for possible later use with create forms
   */
  readonly defaultValues: T;

  /**
   * The entity ID for the schema instance.
   */
  readonly entityId?: string;

  /**
   * The current state of the form, provided by the API.
   */
  readonly fieldValues?: T;

  /**
   * The slug for the current schema version
   */
  readonly schemaVersionSlug?: string;

  /**
   * The refetch method
   */
  refetch?: RefetchFnDynamic<
    SchemaFormFieldsContextRefetchQuery,
    SchemaFormFieldsContextFragment$key,
    Options
  >;

  /**
   * Is the fragment loading?
   */
  isLoading?: boolean;

  /**
   * True when these schema fields are rendered inside a submission flow.
   */
  isSubmission?: boolean;
}
