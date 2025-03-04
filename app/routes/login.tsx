import type { ActionFunction, MetaFunction } from "@remix-run/node";
import {
  Form,
  redirect,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "~/services/auth";
import { authCookie } from "~/utils/session";

export const meta: MetaFunction = () => {
  return [
    { title: "Football Stadium App | Login" },
    { name: "description", content: "Login" },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await loginUser(email, password);
    if (response) {
      return redirect("/home?success=true", {
        headers: {
          "Set-Cookie": await authCookie.serialize(response.access_token),
        },
      });
    }

    return redirect("/login?success=false");
  } catch (error) {
    return redirect("/login?success=false");
  }
};

export default function Login() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const success = searchParams.get("success");
  const logout = searchParams.get("logout");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((form) => ({ ...form, [field]: event.target.value }));
  };

  useEffect(() => {
    if (success) {
      toast.error("Failed login! ❌");
      navigate("/login", { replace: true });
    }
  }, [success, navigate]);

  useEffect(() => {
    if (logout) {
      toast.success("Successfully logout!");
      navigate("/login", { replace: true });
    }
  }, [logout, navigate]);

  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <div className="mb-10">
        <div className="w-56">
          <img src="/logo-primary.png" alt="Remix" className="block w-full" />
        </div>
      </div>
      <div className="max-w-sm md:w-96 p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <Form className="max-w-sm mx-auto" method="POST">
          <div className="mb-5">
            <h3 className="text-center text-2xl font-bold">Login</h3>
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email :
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
              value={formData.email}
              onChange={(e) => handleInputChange(e, "email")}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              name="password"
              className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={formData.password}
              onChange={(e) => handleInputChange(e, "password")}
            />
          </div>
          <button
            type="submit"
            name="_action"
            value={"Login"}
            disabled={isSubmitting}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </Form>
      </div>
    </div>
  );
}
