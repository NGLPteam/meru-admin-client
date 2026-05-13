import React, { createContext, useMemo } from "react";
import { graphql } from "react-relay";
import { useMaybeFragment } from "@wdp/lib/api/hooks";
import { ViewerContextFragment$key } from "@/relay/ViewerContextFragment.graphql";
import { AvatarFragment$key } from "@/relay/AvatarFragment.graphql";

const initialState: ViewerContextProps = {
  allowedActions: [],
  uploadAccess: false,
  uploadToken: null,
  avatar: undefined,
  globalAdmin: false,
  loading: true,
};

const ViewerContext = createContext<ViewerContextProps>(initialState);

function ViewerContextProvider({ children, data }: Props) {
  const viewerData = useMaybeFragment(fragment, data);

  const viewer = useMemo(() => {
    if (viewerData?.viewer) {
      const viewerProps = viewerData.viewer;

      return { ...viewerProps, loading: false };
    } else if (viewerData && !viewerData.viewer) {
      // Assume there's been an error
      return { ...initialState, loading: false };
    }

    return initialState;
  }, [viewerData]);

  return (
    <ViewerContext.Provider value={viewer}>{children}</ViewerContext.Provider>
  );
}

interface ViewerContextProps {
  id?: string | null;
  name?: string | null;
  allowedActions: readonly string[];
  uploadAccess?: boolean;
  uploadToken?: string | null;
  avatar?: AvatarFragment$key | null;
  globalAdmin?: boolean;
  loading?: boolean;
  canReceiveReviewRequests?: { value: boolean };
}

interface Props {
  children: React.ReactNode;
  data?: ViewerContextFragment$key | null;
}

export default ViewerContext;

export { ViewerContextProvider };

const fragment = graphql`
  fragment ViewerContextFragment on Query {
    viewer {
      id
      name
      allowedActions
      uploadAccess
      uploadToken
      avatar {
        ...AvatarFragment
      }
      globalAdmin
      canReceiveReviewRequests {
        value
      }
    }
  }
`;
