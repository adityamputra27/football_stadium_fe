import { LoaderFunction } from "@remix-run/node";
import { redirect, useLoaderData, useSearchParams } from "@remix-run/react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { currentUser } from "~/services/auth";
import { authCookie } from "~/utils/session";

export const loader: LoaderFunction = async ({ request }) => {
  const token = await authCookie.parse(request.headers.get("Cookie"));

  if (!token) {
    return redirect("/login");
  }

  try {
    const user = await currentUser(token);
    return Response.json({ user });
  } catch (error) {
    return redirect("/login");
  }
};

interface User {
  id: number;
  name: string;
  email: string;
}

function Home() {
  const { user } = useLoaderData<{ user: User }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");

  useEffect(() => {
    if (success) {
      toast.success("Successfully login! 🎉");
      setSearchParams({}, { replace: true });
    }
  }, []);

  return <div>{user?.name}</div>;
}

export default Home;
