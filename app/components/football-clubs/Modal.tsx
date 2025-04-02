/* eslint-disable import/no-unresolved */
import React, { useCallback, useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import { createFootballClub, updateFootballClub } from "~/services/club";
import { FootballClub } from "~/types/club";
import { FootballLeague } from "~/types/league";

interface ModalFootballClubProps {
  openModal: boolean;
  setOpenModal: (type: boolean) => void;
  refetch: () => void;
  selectedFootballClub?: FootballClub;
  footballLeagues: FootballLeague[];
}

export default function Modal(props: ModalFootballClubProps) {
  const {
    openModal,
    setOpenModal,
    refetch,
    selectedFootballClub,
    footballLeagues,
  } = props;
  const [formData, setFormData] = useState<Partial<FootballClub>>({
    name: "",
    logo_primary: "",
    logo_white: "",
    visit_count: 0,
    status: "ACTIVE",
    football_league_id: 0,
  });
  const [loading, setLoading] = useState(false);
  const [logoPrimary, setLogoPrimary] = useState<File | null>(null);
  const [logoWhite, setLogoWhite] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    imageSetter: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0];
    imageSetter(file || null);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      try {
        e.preventDefault();
        setLoading(true);

        const payload = new FormData();

        payload.append("name", formData.name!);
        payload.append("visit_count", "0");
        payload.append("status", "ACTIVE");
        payload.append(
          "football_league_id",
          formData.football_league_id!.toString()
        );
        if (logoPrimary) payload.append("logo_primary", logoPrimary);
        if (logoWhite) payload.append("logo_white", logoWhite);

        if (selectedFootballClub) {
          await updateFootballClub(selectedFootballClub?.id, payload);
          toast.success("Successfully updated football club! 🎉");
        } else {
          await createFootballClub(payload);
          toast.success("Successfully created football club! 🎉");
        }
      } catch (error) {
        toast.error(
          selectedFootballClub
            ? "Failed to update football club! ❌"
            : "Failed to create football club! ❌"
        );
      } finally {
        setLoading(false);
        setOpenModal(false);
        refetch();
      }
    },
    [
      formData,
      refetch,
      selectedFootballClub,
      setOpenModal,
      logoPrimary,
      logoWhite,
    ]
  );

  useEffect(() => {
    if (selectedFootballClub) {
      setFormData({
        name: selectedFootballClub.name,
        logo_primary: selectedFootballClub.logo_primary,
        logo_white: selectedFootballClub.logo_white,
        visit_count: selectedFootballClub.visit_count,
        status: selectedFootballClub.status,
        football_league_id: selectedFootballClub.football_league_id,
      });
    } else {
      setFormData({
        name: "",
        logo_primary: "",
        logo_white: "",
        visit_count: 0,
        status: "ACTIVE",
        football_league_id: 0,
      });
    }
  }, [selectedFootballClub]);

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`fixed ${
        openModal ? "" : "hidden"
      } inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50`}
    >
      <div className="relative p-4 w-full max-w-xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {selectedFootballClub ? "Edit" : "Create"} Football Club
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
              onClick={() => setOpenModal(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Football League
                </label>
                <select
                  name="football_league_id"
                  id="football_league_id"
                  onChange={handleInputChange}
                  required={true}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">-</option>
                  {footballLeagues?.map((league) => (
                    <option
                      value={league.id}
                      selected={
                        league.id === selectedFootballClub?.football_league_id
                      }
                      key={league.id}
                    >
                      {league.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="..."
                  required={true}
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="logo_primary"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Logo Primary
                </label>
                <input
                  type="file"
                  name="logo_primary"
                  id="logo_primary"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="..."
                  required={!selectedFootballClub?.logo_primary}
                  onChange={(e) => handleImageChange(e, setLogoPrimary)}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="logo_primary"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Logo Secondary
                </label>
                <input
                  type="file"
                  name="logo_white"
                  id="logo_white"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="..."
                  required={!selectedFootballClub?.logo_white}
                  onChange={(e) => handleImageChange(e, setLogoWhite)}
                />
              </div>
            </div>
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
          </form>
        </div>
      </div>
    </div>
  );
}
