/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import { FiEdit, FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { FootballLeague } from "~/types/league";

interface CardLeagueProps {
  footballLeague: FootballLeague;
  key: number;
  handleEdit: (league: FootballLeague) => void;
  handleDelete: (id: number) => void;
}

export default function CardLeague(props: CardLeagueProps) {
  const { footballLeague, key, handleEdit, handleDelete } = props;
  const [dropdownOpen, isDropdownOpen] = useState(false);

  return (
    <React.Fragment key={key}>
      <div className="cursor-pointer relative rounded-xl flex flex-col justify-between gap-0 w-full mb-0 p-3 bg-white border hover:border-[#588AE4] hover:border-1 border-gray-800 shadow-sm dark:bg-gray-900 dark:border-gray-700">
        <div>
          <div className="flex justify-between items-start mb-1">
            <img
              src={footballLeague.logo_white}
              className="mx-auto h-16 rounded-lg object-cover px-2"
              alt=""
            />
          </div>
          <div className="flex justify-center items-center text-center text-xs text-gray-300 pt-3 pb-0.5 overflow-hidden text-ellipsis whitespace-nowrap">
            <span
              className="block overflow-hidden text-ellipsis whitespace-nowrap"
              title={footballLeague.name}
            >
              {footballLeague.name}
            </span>
          </div>
        </div>
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
                    handleEdit(footballLeague);
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
                    handleDelete(footballLeague.id);
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
      </div>
    </React.Fragment>
  );
}
