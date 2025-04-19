/* eslint-disable import/no-unresolved */
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/react";
// import { Link } from "@remix-run/react";
import React, { useCallback, useEffect, useState } from "react";
import { FiFilter, FiPlusCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import ConfirmModal from "~/components/ConfirmModal";
import CardLeague from "~/components/football-leagues/CardLeague";
import CardLeagueLoading from "~/components/football-leagues/CardLeagueLoading";
import Modal from "~/components/football-leagues/Modal";
import { currentUser } from "~/services/auth";
import {
  deleteFootballLeague,
  initiateFootballLeagues,
} from "~/services/league";
import { FootballLeague } from "~/types/league";
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

export const meta: MetaFunction = () => {
  return [
    { title: "Football Stadium App | Notification Menu" },
    { name: "description", content: "Notification Menu" },
  ];
};

export default function Index() {
  const [footballLeagues, setFootballLeagues] = useState<FootballLeague[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [selectedFootballLeague, setSelectedFootballLeague] = useState<
    FootballLeague | undefined
  >();

  const refetch = async () => {
    try {
      const response = await initiateFootballLeagues();
      setFootballLeagues(response.data.data);
    } catch (error) {
      toast.error("Server error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  const handleEdit = useCallback(async (footballLeague: FootballLeague) => {
    setSelectedFootballLeague(footballLeague);
    setOpenModal(true);
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    setSelectedId(id);
    setOpenDeleteModal(true);
  }, []);

  const onConfirmDelete = useCallback(async () => {
    try {
      setLoading(true);

      await deleteFootballLeague(selectedId);
      toast.success("Successfully deleted football league! 🎉");
    } catch (error) {
      toast.error("Failed to delete football league ❌");
    } finally {
      setLoading(false);
      setOpenDeleteModal(false);
      refetch();
    }
  }, [selectedId]);

  return (
    <React.Fragment>
      <div className="mb-2">
        <h3 className="text-xl font-bold">Football Leagues</h3>
        <p className="text-xs text-gray-400 mt-1">
          Total : {footballLeagues.length} data, Count filtered :{" "}
          {footballLeagues.length} data, Page 1
        </p>
      </div>
      <div className="w-full grid grid-cols-2 mt-2 mb-4">
        <div className="flex gap-2 items-start w-full">
          <input
            type="text"
            id="large-input"
            placeholder="Search by title"
            className="block w-full p-2 border border-gray-300 rounded-lg text-sm dark:bg-gray-900 dark:border-gray-800 dark:placeholder-gray-400 dark:text-white"
          />
          <button
            type="button"
            className="flex items-center gap-1 py-2 px-4 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <FiFilter /> Filter
          </button>
        </div>
        <div className="flex items-start justify-end w-full">
          <button
            type="button"
            onClick={() => {
              setOpenModal(true);
              setSelectedFootballLeague(undefined);
            }}
            className="flex items-center gap-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            <FiPlusCircle /> Create
          </button>
        </div>
      </div>
      <div className="w-full">
        {loading ? (
          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: 7 * 3 }).map((_, index) => (
              <CardLeagueLoading key={index} />
            ))}
          </div>
        ) : footballLeagues.length > 0 ? (
          <div className="grid grid-cols-7 gap-4">
            {footballLeagues.map((footballLeague: FootballLeague) => (
              <CardLeague
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                key={footballLeague.id}
                footballLeague={footballLeague}
              />
            ))}
          </div>
        ) : (
          <div className="w-full py-8">
            <p className="text-gray-500 text-center">No data</p>
          </div>
        )}
      </div>
      {/* {footballLeagues.length > 0 && (
        <nav aria-label="Page navigation example" className="ms-auto mt-1">
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <Link
                to="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </Link>
            </li>
            {[1, 2, 3, 4, 5].map((pagination) =>
              pagination === 3 ? (
                <Link
                  key={pagination}
                  to="#"
                  aria-current="page"
                  className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:text-white dark:border-blue-700 dark:bg-blue-700 dark:text-white"
                >
                  3
                </Link>
              ) : (
                <li key={pagination}>
                  <Link
                    to="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {pagination}
                  </Link>
                </li>
              )
            )}
            <li>
              <Link
                to="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
      )} */}
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        refetch={refetch}
        selectedFootballLeague={selectedFootballLeague}
      />
      <ConfirmModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        onConfirm={onConfirmDelete}
        id={selectedId}
        loading={loading}
        customMessage="Are you sure you want to delete this football league?"
      />
    </React.Fragment>
  );
}
