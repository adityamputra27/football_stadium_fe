/* eslint-disable import/no-unresolved */
import { Link } from "@remix-run/react";
import React, { useState } from "react";
import {
  FiEdit,
  FiImage,
  FiInfo,
  FiMoreVertical,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { FootballStadium } from "~/types/stadium";

interface CardStadiumProps {
  footballStadium: FootballStadium;
  handleEdit: (stadium: FootballStadium) => void;
  handleUpload?: (stadium: FootballStadium) => void;
  handleDelete: (id: number) => void;
}

export default function CardStadium(props: CardStadiumProps) {
  const { footballStadium, handleEdit, handleUpload, handleDelete } = props;
  const [dropdownOpen, isDropdownOpen] = useState(false);

  return (
    <React.Fragment>
      <div className="cursor-pointer rounded-xl w-full mb-3 p-3 max-h-52 overflow-hidden bg-white border hover:border-[#588AE4] hover:border-1 border-gray-800 shadow-sm dark:bg-gray-900 dark:border-gray-700">
        <div className="flex justify-between items-start mb-3">
          <img
            src={
              footballStadium.latest_file
                ? footballStadium.latest_file
                : "https://dpcpa.com/app/uploads/2015/01/thumbnail-default.jpg"
            }
            className="h-32 rounded-lg"
            alt=""
          />
        </div>

        <div className="flex gap-2 justify-between items-center">
          <div className="flex justify-center items-center text-center text-sm text-gray-300 pt-0 pb-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span>{footballStadium.name}</span>
          </div>
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
            } z-10 absolute mt-4 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-400"
              aria-labelledby="dropdownLargeButton"
            >
              <li>
                <button
                  type="button"
                  onClick={() => {
                    handleEdit(footballStadium);
                    isDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-start text-xs gap-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <FiEdit /> Edit
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (handleUpload) {
                      handleUpload(footballStadium);
                    }
                    isDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-start text-xs gap-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <FiImage /> Picture
                </button>
              </li>
              <li>
                <Link
                  to={`/football-stadiums/${footballStadium.id}/editor`}
                  onClick={() => isDropdownOpen(false)}
                  className="w-full flex items-center justify-start text-xs gap-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <FiInfo /> Content
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    handleDelete(footballStadium.id);
                    isDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-start text-xs gap-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <FiTrash2 /> Delete
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => isDropdownOpen(false)}
                  className="w-full flex items-center justify-start text-xs gap-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <FiX /> Close
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
