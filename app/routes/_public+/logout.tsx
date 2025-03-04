import { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { authCookie } from "~/utils/session";

export const loader: LoaderFunction = async () => {
  return redirect("/login?logout=true", {
    headers: {
      "Set-Cookie": await authCookie.serialize("", { maxAge: 0 }),
    },
  });
};
