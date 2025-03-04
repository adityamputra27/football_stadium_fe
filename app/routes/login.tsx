import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { Form, redirect, useNavigate } from "@remix-run/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "~/services/auth";

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
    const data = await loginUser(email, password);
    return redirect("/home", {
      headers: {
        "Set-Cookie": `token=${data.access_token}: Path=/; HttpOnly`,
      },
    });
  } catch (error) {
    return { error: "Invalid credentials" };
  }
};

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((form) => ({ ...form, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    const form = new FormData();
    form.append("email", formData.email);
    form.append("password", formData.password);

    try {
      const response = await loginUser(formData.email, formData.password);
      console.log(response);
      toast.success("Successfully login! 🎉");

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      toast.error("Failed to login!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <div className="mb-10">
        <div className="w-56">
          <img src="/logo-primary.png" alt="Remix" className="block w-full" />
        </div>
      </div>
      <div className="max-w-sm md:w-96 p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <Form
          className="max-w-sm mx-auto"
          method="POST"
          onSubmit={handleSubmit}
        >
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
            disabled={loading}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? (
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
