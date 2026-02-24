import { NextRequest, NextResponse, NextFetchEvent } from "next/server";
import { CustomMiddleware } from "./chain";

export default function httpsMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    if (
      process.env.NODE_ENV === "production" &&
      request.headers.get("x-forwarded-proto") !== "https" &&
      !request.headers.get("host")?.includes("localhost")
    ) {
      return NextResponse.redirect(
        `https://${request.headers.get("host")}${request.nextUrl.pathname}`,
        301,
      );
    }

    return middleware(request, event, response);
  };
}
