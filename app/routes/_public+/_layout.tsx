import { Outlet } from "@remix-run/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiBell, FiLogOut, FiUsers } from "react-icons/fi";
import { MdOutlineStadium } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { SiPremierleague } from "react-icons/si";
import { BiFootball } from "react-icons/bi";

function Layout() {
  const [dropdownOpen, isDropdownOpen] = useState(false);

  return (
    <React.Fragment>
      <ToastContainer position="top-right" autoClose={2000} />
      <header>
        <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src="/logo-primary.png" className="h-8" alt="Logo" />
            </Link>
            <button
              data-collapse-toggle="navbar-dropdown"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-dropdown"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-dropdown"
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    to="/home"
                    className="block py-2 px-3 text-sm text-white bg-blue-700 md:dark:hover:text-blue-500 rounded-sm md:bg-transparent md:p-0 md:dark:bg-transparent"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <button
                    id="dropdownNavbarLink"
                    onClick={() => isDropdownOpen(!dropdownOpen)}
                    data-dropdown-toggle="dropdownNavbar"
                    className="flex items-center text-sm justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  >
                    Main Menu{" "}
                    <svg
                      className="w-2.5 h-2.5 ms-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
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
                        <Link
                          to="football-leagues"
                          onClick={() => isDropdownOpen(false)}
                          className="flex items-center justify-start gap-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <SiPremierleague /> Football League
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="football-clubs"
                          onClick={() => isDropdownOpen(false)}
                          className="flex items-center justify-start gap-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <BiFootball /> Football Club
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="football-stadiums"
                          onClick={() => isDropdownOpen(false)}
                          className="flex items-center justify-start gap-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <MdOutlineStadium /> Football Stadium
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <Link
                    to="/notifications"
                    className="flex items-center justify-center gap-1 py-2 px-3 text-sm text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    <FiBell /> Notifications
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="flex items-center justify-center py-2 px-3 text-sm text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    <FiUsers /> Users
                  </Link>
                </li>
                <li>
                  <Link
                    to="/logout"
                    className="flex items-center justify-center gap-1 py-2 px-3 text-sm text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    <FiLogOut /> Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
        <Outlet />
      </main>
    </React.Fragment>
  );
}

export default Layout;
