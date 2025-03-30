/* eslint-disable import/no-unresolved */
import React, { useCallback, useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  createFootballStadium,
  updateFootballStadium,
} from "~/services/stadium";
import { FootballClub } from "~/types/club";
import { FootballStadium } from "~/types/stadium";
import "react-quill/dist/quill.snow.css";

interface ModalFootballClubProps {
  openModal: boolean;
  setOpenModal: (type: boolean) => void;
  refetch: () => void;
  selectedFootballStadium?: FootballStadium;
  footballClubs: FootballClub[];
}

export default function Modal(props: ModalFootballClubProps) {
  const {
    openModal,
    setOpenModal,
    refetch,
    selectedFootballStadium,
    footballClubs,
  } = props;
  const [formData, setFormData] = useState<Partial<FootballStadium>>({
    football_club_id: 0,
    name: "",
    capacity: "",
    country: "",
    city: "",
    cost: "",
    status: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      try {
        e.preventDefault();
        setLoading(true);

        const payload = new FormData();

        payload.append(
          "football_club_id",
          formData.football_club_id!.toString()
        );
        payload.append("name", formData.name!);
        payload.append("capacity", formData.capacity!);
        payload.append("country", formData.country!);
        payload.append("city", formData.city!);
        payload.append("cost", formData.cost!);
        payload.append("description", formData.description!);

        if (selectedFootballStadium) {
          await updateFootballStadium(selectedFootballStadium?.id, payload);
          toast.success("Successfully updated football stadium! 🎉");
        } else {
          await createFootballStadium(payload);
          toast.success("Successfully created football stadium! 🎉");
        }
      } catch (error) {
        toast.error(
          selectedFootballStadium
            ? "Failed to update football stadium! ❌"
            : "Failed to create football stadium! ❌"
        );
      } finally {
        setLoading(false);
        setOpenModal(false);
        refetch();
      }
    },
    [formData, refetch, selectedFootballStadium, setOpenModal]
  );

  useEffect(() => {
    if (selectedFootballStadium) {
      setFormData({
        name: selectedFootballStadium.name,
        capacity: selectedFootballStadium.capacity,
        country: selectedFootballStadium.country,
        city: selectedFootballStadium.city,
        cost: selectedFootballStadium.cost,
        status: selectedFootballStadium.status,
        description: selectedFootballStadium.description,
        football_club_id: selectedFootballStadium.football_club_id,
      });
    } else {
      setFormData({
        name: "",
        capacity: "",
        country: "",
        city: "",
        cost: "",
        status: "",
        description: "",
        football_club_id: 0,
      });
    }
  }, [selectedFootballStadium]);

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
              {selectedFootballStadium ? "Edit" : "Create"} Football Stadium
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
                  Football Club
                </label>
                <select
                  name="football_club_id"
                  id="football_club_id"
                  onChange={handleInputChange}
                  required={true}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">-</option>
                  {footballClubs?.map((club) => (
                    <option
                      value={club.id}
                      selected={
                        club.id === selectedFootballStadium?.football_club_id
                      }
                      key={club.id}
                    >
                      {club.name}
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
                  htmlFor="capacity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Capacity
                </label>
                <input
                  type="text"
                  name="capacity"
                  id="capacity"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="..."
                  required={true}
                  value={formData.capacity}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="country"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="..."
                  required={true}
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="..."
                  required={true}
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="cost"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cost
                </label>
                <input
                  type="text"
                  name="cost"
                  id="cost"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="..."
                  required={true}
                  value={formData.cost}
                  onChange={handleInputChange}
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
