import { createCookie } from "@remix-run/node";

export const authCookie = createCookie("auth_token", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
});
