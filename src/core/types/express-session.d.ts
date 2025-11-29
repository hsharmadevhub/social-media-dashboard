// Overriding the session data interface because it comes from the express-session third party library

import "express-session";

declare module "express-session" {
  interface SessionData {
    token?: string;
  }
}
