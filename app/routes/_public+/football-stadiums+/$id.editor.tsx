/* eslint-disable import/no-unresolved */
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { SetStateAction, useCallback, useState } from "react";
import { FiCheckCircle, FiChevronLeft } from "react-icons/fi";
import { DefaultEditor } from "react-simple-wysiwyg";
import { toast } from "react-toastify";
import {
  singleFootballStadium,
  updateFootballStadium,
} from "~/services/stadium";
import { FootballStadium } from "~/types/stadium";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  const result = await singleFootballStadium(Number(id));
  const { data } = result.data;

  return json(data);
}

export default function StadiumEditor() {
  const footballStadium = useLoaderData<FootballStadium>();
  const [html, setHtml] = useState(footballStadium.description);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setHtml(event.target.value);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      try {
        e.preventDefault();
        setLoading(true);

        if (html.trim().length === 0) {
          toast.error("Description is required!");
          setLoading(false);
          return;
        }
        const payload = new FormData();
        payload.append(
          "football_club_id",
          footballStadium.football_club_id!.toString()
        );
        payload.append("description", html);

        await updateFootballStadium(footballStadium.id, payload);
        toast.success("Successfully updated football stadium! 🎉");
      } catch (error) {
        toast.error("Failed to update football stadium! ❌");
      } finally {
        setLoading(false);
      }
    },
    [html, footballStadium.id, footballStadium.football_club_id]
  );

  return (
    <form className="p-4 md:p-5 w-full" onSubmit={handleSubmit}>
      <div className="grid gap-4 mb-4 grid-cols-1">
        <div className="p-4 border border-gray-600 rounded-lg w-full wysiwyg-editor">
          <h2 className="text-lg font-bold mb-2">{footballStadium.name}</h2>
          <DefaultEditor
            value={html}
            onChange={handleChange}
            className="h-96"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <Link
          to={"/football-stadiums"}
          className="text-white inline-flex items-center bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          <FiChevronLeft />
          &nbsp; Back
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            <>
              <FiCheckCircle />
              &nbsp; Save
            </>
          )}
        </button>
      </div>
    </form>
  );
}
