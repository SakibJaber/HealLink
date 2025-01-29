import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: number; // Add the custom properties you need
    // userRole?: string; // Optional properties
  }
}
