import { graphql, readInlineData } from "relay-runtime";
import { useTranslation } from "react-i18next";
import CoverPlaceholder from "@wdp/lib/atomic/CoverPlaceholder";
import { ImageLink } from "components/atomic";
import { EntityThumbnailColumnFragment$key } from "@/relay/EntityThumbnailColumnFragment.graphql";
import { PartialColumnish, Node } from "../types";
import { getAccessorProps, hasFragments } from "../helpers";
import * as Styled from "./EntityThumbnailColumn.styles";
import type { ColumnDef } from "@tanstack/react-table";

type Props<T extends Node> = PartialColumnish<T>;

type Row = Node & EntityThumbnailColumnFragment$key;

const EntityThumbnailColumn = <T extends Node>(
  props: Props<T> = {},
): ColumnDef<T> => {
  const { t } = useTranslation();
  const { accessorKey } = getAccessorProps<T>(props);

  return {
    header: () => (
      <span className="a-hidden">{t("lists.thumbnail_column")}</span>
    ),
    id: "thumbnail",
    // By default, the thumbnail fragment should be on the row root
    ...(accessorKey
      ? { accessorKey }
      : { accessorFn: (originalRow: T | Row) => originalRow }),
    enableSorting: false,
    cell: (info) => {
      const value = info.getValue<Row>();

      if (!hasFragments(value)) return <></>;

      const entity = readInlineData(fragment, value);

      if (!entity) return null;

      const image =
        entity.__typename === "Community" ? entity.logo : entity.thumbnail;

      return (
        <ImageLink
          route={entity.__typename.toLowerCase()}
          routeParams={{ slug: entity.slug || "" }}
        >
          {image?.storage ? (
            <Styled.Thumbnail
              data={image.thumb.webp}
              objectFit="contain"
              // height="auto"
            />
          ) : (
            <CoverPlaceholder
              title={entity.title || ""}
              seed={entity.id || ""}
            />
          )}
        </ImageLink>
      );
    },
    meta: {
      cellType: "thumbnail",
    },
    ...props,
  };
};

export default EntityThumbnailColumn;

const fragment = graphql`
  fragment EntityThumbnailColumnFragment on Entity @inline {
    __typename
    title
    thumbnail {
      storage
      thumb: small {
        webp {
          ...ImageFragment
        }
      }
    }
    ... on Community {
      logo {
        storage
        thumb: small {
          webp {
            ...ImageFragment
          }
        }
      }
    }
    ... on Node {
      id
    }
    ... on Sluggable {
      slug
    }
  }
`;
