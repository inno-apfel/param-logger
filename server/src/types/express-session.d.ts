import "express-session";

declare module "express-session" {
  interface SessionData {
    passport?: {
      user: string; // user_id from User model
    };
  }
}