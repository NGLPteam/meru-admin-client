import chain from "./lib/middleware/chain";
import https from "./lib/middleware/https";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default chain([https]);
