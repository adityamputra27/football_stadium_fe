/* eslint-disable import/no-unresolved */
import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import React, { useCallback, useEffect, useState } from "react";
import { FiFilter, FiPlusCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import ConfirmModal from "~/components/ConfirmModal";
import CardFootballNews from "~/components/football-news/CardFootballNews";
import CardFootballNewsLoading from "~/components/football-news/CardFootballNewsLoading";
import Modal from "~/components/football-news/Modal";
import { deleteNews, initiateNews } from "~/services/news";
import { FootballNews } from "~/types/news";

export const meta: MetaFunction = () => {
  return [
    { title: "Football Stadium App | Football News Menu" },
    { name: "description", content: "Football News Menu" },
  ];
};

export default function Index() {
  const [footballNews, setFootballNews] = useState<FootballNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [selectedFootballNews, setSelectedFootballNews] = useState<
    FootballNews | undefined
  >();

  const refetch = async () => {
    try {
      const response = await initiateNews();
      setFootballNews(response.data.data);
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

  const handleEdit = useCallback(async (news: FootballNews) => {
    setSelectedFootballNews(news);
    setOpenModal(true);
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    setSelectedId(id);
    setOpenDeleteModal(true);
  }, []);

  const onConfirmDelete = useCallback(async () => {
    try {
      setLoading(true);
      await deleteNews(selectedId);
      toast.success("Successfully deleted football news! 🎉");
    } catch (error) {
      toast.error("Failed to delete football news ❌");
    } finally {
      setLoading(false);
      setOpenDeleteModal(false);
      refetch();
    }
  }, [selectedId]);

  return (
    <React.Fragment>
      <div className="mb-2">
        <h3 className="text-xl font-bold">Football News</h3>
        <p className="text-xs text-gray-400 mt-1">
          Total : {footballNews.length} data, Count filtered :{" "}
          {footballNews.length} data, Page 1
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
              setSelectedFootballNews(undefined);
              setSelectedId(0);
            }}
            className="flex items-center gap-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            <FiPlusCircle /> Create
          </button>
        </div>
      </div>
      {loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <CardFootballNewsLoading key={index} />
        ))
      ) : footballNews.length > 0 ? (
        footballNews.map((news: FootballNews) => (
          <CardFootballNews
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            key={news.id}
            news={news}
          />
        ))
      ) : (
        <div className="w-full py-8">
          <p className="text-gray-500 text-center">No data</p>
        </div>
      )}
      {footballNews.length > 0 && (
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
      )}
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        refetch={refetch}
        selectedFootballNews={selectedFootballNews}
      />
      <ConfirmModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        onConfirm={onConfirmDelete}
        id={selectedId}
        loading={loading}
        customMessage="Are you sure you want to delete this notification?"
      />
    </React.Fragment>
  );
}
