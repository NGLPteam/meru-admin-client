import React, { useMemo } from "react";
import Link from "next/link";
import useMaybeFragment from "@wdp/lib/api/hooks/useMaybeFragment";
import { graphql } from "react-relay";
import { MessageBlock } from "components/atomic";
import { useGlobalContext } from "contexts";
import { UnauthorizedMessageFragment$key } from "@/relay/UnauthorizedMessageFragment.graphql";

export default function UnauthorizedMessage({
  message,
  title,
}: {
  message?: React.JSX.Element;
  title?: string;
}) {
  const data = useGlobalContext();

  const siteData = useMaybeFragment<UnauthorizedMessageFragment$key>(
    fragment,
    data?.globalConfiguration,
  );

  const name = useMemo(() => {
    return siteData?.site?.providerName || "";
  }, [siteData]);

  const content = (
    <div className="t-rte">
      <p>
        Welcome to the {name} admin interface, a tool that allows non-technical
        users to manage content stored in the WDP API.
      </p>

      <p>
        Your account currently does not have admin access.
        <br /> Please check with your account manager if you need access to this
        tool.
      </p>

      <p>
        If you&apos;re looking to submit, go to{" "}
        <Link href="/my-submissions">your submissions page</Link>.
      </p>
    </div>
  );

  return (
    <section style={{ marginTop: 30 }}>
      <MessageBlock name={title ?? name} message={message ?? content} />
    </section>
  );
}

const fragment = graphql`
  fragment UnauthorizedMessageFragment on GlobalConfiguration {
    site {
      providerName
    }
  }
`;
