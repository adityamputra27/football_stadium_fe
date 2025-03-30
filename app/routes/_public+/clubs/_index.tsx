/* eslint-disable import/no-unresolved */
import { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
// import { Link } from "@remix-run/react";
import React, { useCallback, useEffect, useState } from "react";
import { FiFilter, FiPlusCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import CardClub from "~/components/clubs/CardClub";
import CardClubLoading from "~/components/clubs/CardClubLoading";
import Modal from "~/components/clubs/Modal";
import ConfirmModal from "~/components/ConfirmModal";
import { deleteFootballClub, initiateFootballClub } from "~/services/club";
import { initiateFootballLeagues } from "~/services/league";
import { FootballClub } from "~/types/club";
import { FootballLeague } from "~/types/league";

export const meta: MetaFunction = () => {
  return [
    { title: "Football Stadium App | Club Menu" },
    { name: "description", content: "Club Menu" },
  ];
};

export async function loader() {
  const response = await initiateFootballLeagues();
  return json(response.data.data);
}

export default function Index() {
  const [footballClubs, setFootballClubs] = useState<FootballClub[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [selectedFootballClub, setSelectedFootballLeague] = useState<
    FootballClub | undefined
  >();

  const footballLeagues: FootballLeague[] = useLoaderData<typeof loader>();

  const refetch = async () => {
    try {
      const response = await initiateFootballClub();
      setFootballClubs(response.data.data);
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

  const handleEdit = useCallback(async (footballClub: FootballClub) => {
    setSelectedFootballLeague(footballClub);
    setOpenModal(true);
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    setSelectedId(id);
    setOpenDeleteModal(true);
  }, []);

  const onConfirmDelete = useCallback(async () => {
    try {
      setLoading(true);

      await deleteFootballClub(selectedId);
      toast.success("Successfully deleted football club! 🎉");
    } catch (error) {
      toast.error("Failed to delete football club ❌");
    } finally {
      setLoading(false);
      setOpenDeleteModal(false);
      refetch();
    }
  }, [selectedId]);

  return (
    <React.Fragment>
      <div className="mb-2">
        <h3 className="text-xl font-bold">Football Clubs</h3>
        <p className="text-xs text-gray-400 mt-1">
          Total : {footballClubs.length} data, Count filtered :{" "}
          {footballClubs.length} data, Page 1
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
            {Array.from({ length: 7 * 2 }).map((_, index) => (
              <CardClubLoading key={index} />
            ))}
          </div>
        ) : footballClubs.length > 0 ? (
          <div className="grid grid-cols-7 gap-4">
            {footballClubs.map((footballClub: FootballClub) => (
              <CardClub
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                key={footballClub.id}
                footballClub={footballClub}
              />
            ))}
          </div>
        ) : (
          <div className="w-full py-8">
            <p className="text-gray-500 text-center">No data</p>
          </div>
        )}
      </div>
      {/* {footballClubs.length > 0 && (
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
        selectedFootballClub={selectedFootballClub}
        footballLeagues={footballLeagues}
      />
      <ConfirmModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        onConfirm={onConfirmDelete}
        id={selectedId}
        loading={loading}
        customMessage="Are you sure you want to delete this football club?"
      />
    </React.Fragment>
  );
}
