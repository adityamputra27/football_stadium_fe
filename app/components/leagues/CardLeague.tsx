/* eslint-disable import/no-unresolved */
import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FootballLeague } from "~/types/league";

interface CardLeagueProps {
  footballLeague: FootballLeague;
  key: number;
  handleEdit: (league: FootballLeague) => void;
  handleDelete: (id: number) => void;
}

export default function CardLeague(props: CardLeagueProps) {
  const { footballLeague, key, handleEdit, handleDelete } = props;

  return (
    <React.Fragment key={key}>
      <div className="cursor-pointer rounded-xl w-full mb-3 p-3 bg-white border hover:border-[#588AE4] hover:border-2 border-gray-800 shadow-sm dark:bg-gray-900 dark:border-gray-700">
        <div className="flex justify-between items-start mb-3">
          <img
            src={footballLeague.logo_white}
            className="w-full h-32 object-cover object-bottom rounded-lg"
            alt=""
          />
        </div>
        <div className="flex justify-center items-center text-center text-sm text-gray-300 pt-0 pb-2">
          <span>{footballLeague.name}</span>
        </div>
        <div className="flex gap-2 justify-between items-start">
          <button
            onClick={() => handleEdit(footballLeague)}
            className="inline-flex items-center px-2 py-1 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-200"
          >
            <FiEdit />
          </button>
          <button
            onClick={() => handleDelete(footballLeague.id)}
            className="inline-flex items-center px-2 py-1 text-sm font-medium text-white bg-red-700 rounded-md hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
