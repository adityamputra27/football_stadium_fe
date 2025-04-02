/* eslint-disable import/no-unresolved */
import { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
// import { Link } from "@remix-run/react";
import React, { useCallback, useEffect, useState } from "react";
import { FiFilter, FiPlusCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import ConfirmModal from "~/components/ConfirmModal";
import CardStadium from "~/components/stadiums/CardStadium";
import CardStadiumLoading from "~/components/stadiums/CardStadiumLoading";
import Modal from "~/components/stadiums/Modal";
import UploadModal from "~/components/stadiums/UploadModal";
import { initiateFootballClub } from "~/services/club";
import {
  deleteFootballStadium,
  initiateFootballStadiums,
} from "~/services/stadium";
import { FootballClub } from "~/types/club";
import { FootballStadium } from "~/types/stadium";

export const meta: MetaFunction = () => {
  return [
    { title: "Football Stadium App | Stadium Menu" },
    { name: "description", content: "Stadium Menu" },
  ];
};

export async function loader() {
  const response = await initiateFootballClub();
  return json(response.data.data);
}

export default function Index() {
  const [footballStadiums, setFootballStadiums] = useState<FootballStadium[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [selectedFootballStadium, setSelectedFootballStadium] = useState<
    FootballStadium | undefined
  >();

  const footballClubs: FootballClub[] = useLoaderData<typeof loader>();

  const refetch = async () => {
    try {
      const response = await initiateFootballStadiums();
      setFootballStadiums(response.data.data);
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

  const handleEdit = useCallback(async (footballStadium: FootballStadium) => {
    setSelectedFootballStadium(footballStadium);
    setOpenModal(true);
  }, []);

  const handleUpload = useCallback(async (footballStadium: FootballStadium) => {
    setSelectedFootballStadium(footballStadium);
    setOpenUploadModal(true);
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    setSelectedId(id);
    setOpenDeleteModal(true);
  }, []);

  const onConfirmDelete = useCallback(async () => {
    try {
      setLoading(true);

      await deleteFootballStadium(selectedId);
      toast.success("Successfully deleted football stadium! 🎉");
    } catch (error) {
      toast.error("Failed to delete football stadium ❌");
    } finally {
      setLoading(false);
      setOpenDeleteModal(false);
      refetch();
    }
  }, [selectedId]);

  return (
    <React.Fragment>
      <div className="mb-2">
        <h3 className="text-xl font-bold">Football Stadiums</h3>
        <p className="text-xs text-gray-400 mt-1">
          Total : {footballStadiums.length} data, Count filtered :{" "}
          {footballStadiums.length} data, Page 1
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
              setSelectedFootballStadium(undefined);
            }}
            className="flex items-center gap-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            <FiPlusCircle /> Create
          </button>
        </div>
      </div>
      <div className="w-full">
        {loading ? (
          <div className="grid grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <CardStadiumLoading key={index} />
            ))}
          </div>
        ) : footballStadiums.length > 0 ? (
          <div className="grid grid-cols-6 gap-4">
            {footballStadiums.map((footballStadium: FootballStadium) => (
              <CardStadium
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleUpload={handleUpload}
                key={footballStadium.id}
                footballStadium={footballStadium}
              />
            ))}
          </div>
        ) : (
          <div className="w-full py-8">
            <p className="text-gray-500 text-center">No data</p>
          </div>
        )}
      </div>
      {/* {footballStadiums.length > 0 && (
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
        selectedFootballStadium={selectedFootballStadium}
        footballClubs={footballClubs}
      />
      <UploadModal
        openModal={openUploadModal}
        setOpenModal={setOpenUploadModal}
        refetch={refetch}
        selectedFootballStadium={selectedFootballStadium}
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
