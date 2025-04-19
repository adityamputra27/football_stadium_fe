/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import { FiEdit, FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { FootballNews } from "~/types/news";

interface CardFootballNewsProps {
  news: FootballNews;
  key: number;
  handleEdit: (news: FootballNews) => void;
  handleDelete: (id: number) => void;
}

export default function CardFootballNews(props: CardFootballNewsProps) {
  const { news, key, handleEdit, handleDelete } = props;
  const [dropdownOpen, isDropdownOpen] = useState(false);

  return (
    <React.Fragment key={key}>
      <div className="w-full mb-3 p-4 bg-white border border-gray-800 rounded-lg shadow-sm dark:bg-gray-900 dark:border-gray-700">
        <div className="flex justify-between items-start mb-3">
          <div className="overflow-hidden flex items-center gap-4">
            {news.image && (
              <div className="w-40">
                <img
                  src={news.image}
                  alt=""
                  className="w-full object-cover rounded-lg"
                />
              </div>
            )}
            <div className="pt-4">
              <h5 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
                {news.title}
              </h5>
              <p className="text-sm text-gray-700 dark:text-gray-400 text-ellipsis whitespace-nowrap overflow-hidden line-clamp-2">
                <div dangerouslySetInnerHTML={{ __html: news.body }} />
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-start relative">
            <div className="absolute right-0 pr-2">
              <button
                id="dropdownNavbarLink"
                onClick={() => isDropdownOpen(!dropdownOpen)}
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center text-sm justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                <FiMoreVertical />
              </button>
              <div
                id="dropdownNavbar"
                className={`${
                  dropdownOpen ? "block" : "hidden"
                } z-10 absolute mt-4 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-32 dark:bg-gray-700 dark:divide-gray-600`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-400"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        handleEdit(news);
                        isDropdownOpen(false);
                      }}
                      className="w-full flex items-center text-xs justify-start gap-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <FiEdit /> Edit
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        handleDelete(news.id);
                        isDropdownOpen(false);
                      }}
                      className="w-full flex items-center text-xs justify-start gap-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            {/* <button
              onClick={() => handleEdit(news)}
              className="inline-flex items-center px-2 py-1 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-200"
            >
              <FiEdit />
            </button>
            <button
              onClick={() => handleDelete(news.id)}
              className="inline-flex items-center px-2 py-1 text-sm font-medium text-white bg-red-700 rounded-md hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
            >
              <FiTrash2 />
            </button> */}
          </div>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <div className="flex gap-2">
            <span>Category : {news.category} </span>
            <span>
              | Featured News? : {news.is_featured_news === 1 ? " Yes" : " No"}
            </span>
          </div>
          <span>{news.diff}</span>
        </div>
      </div>
    </React.Fragment>
  );
}
