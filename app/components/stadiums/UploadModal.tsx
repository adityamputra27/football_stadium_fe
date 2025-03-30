/* eslint-disable import/no-unresolved */
import React, { useCallback, useEffect, useState } from "react";
import { FiCheckCircle, FiTrash } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  createFootballStadiumFile,
  deleteFootballStadiumFile,
  initiateFootballStadiumFiles,
} from "~/services/stadium";
import { FootballStadium, FootballStadiumFile } from "~/types/stadium";

interface UploadModalFootballStadiumProps {
  openModal: boolean;
  setOpenModal: (type: boolean) => void;
  refetch: () => void;
  selectedFootballStadium?: FootballStadium;
}

export default function UploadModal(props: UploadModalFootballStadiumProps) {
  const { openModal, setOpenModal, selectedFootballStadium, refetch } = props;
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [files, setFiles] = useState<FootballStadiumFile[]>([]);
  const [singleFile, setSingleFile] = useState<File | null>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    imageSetter: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0];
    imageSetter(file || null);
  };

  const initiateFiles = async () => {
    try {
      setLoading(true);

      if (openModal && selectedFootballStadium?.id) {
        const result = await initiateFootballStadiumFiles(
          selectedFootballStadium?.id
        );
        setFiles(result.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to retrieved files!");
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      try {
        e.preventDefault();
        setIsSubmitted(true);

        const payload = new FormData();
        payload.append(
          "football_stadium_id",
          selectedFootballStadium?.id?.toString() || ""
        );
        if (singleFile) payload.append("file", singleFile);

        const result = await createFootballStadiumFile(
          selectedFootballStadium?.id,
          payload
        );
        if (result.data.status) {
          toast.success("Successfully created football stadium file! 🎉");
          setIsSubmitted(false);
          initiateFiles();
          refetch();
          setSingleFile(null);
        }
      } catch (error) {
        toast.error("Failed to created football stadium file ❌");
        setIsSubmitted(false);
        initiateFiles();
      }
    },
    [openModal, selectedFootballStadium, singleFile]
  );

  const deleteFile = async (fileId: number) => {
    try {
      const result = await deleteFootballStadiumFile(
        selectedFootballStadium?.id,
        fileId
      );
      if (result.data.status) {
        toast.success("Successfully deleted football stadium file! 🎉");
        initiateFiles();
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete football stadium file ❌");
    }
  };

  useEffect(() => {
    initiateFiles();
  }, [openModal]);

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`fixed ${
        openModal ? "" : "hidden"
      } inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50`}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add Picture Football Stadium
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
                  htmlFor="file"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  File Picture
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="..."
                  required={true}
                  onChange={(e) => handleImageChange(e, setSingleFile)}
                />
              </div>
            </div>
            <div className="grid gap-2 mb-2 grid-cols-1">
              {loading ? (
                <p className="text-center">Loading</p>
              ) : (
                files.map((file) => (
                  <div
                    key={file.id}
                    className="border border-gray-600 rounded-lg p-3"
                  >
                    <div className="flex flex-row gap-4 items-center justify-between">
                      <div className="lg:w-1/5">
                        <img
                          src={`${file.file_path}`}
                          className="w-full h-20 object-cover rounded-md"
                          alt=""
                        />
                      </div>
                      <div className="lg:w-[70%]">
                        <h5 className="text-gray-400 text-sm">{file.file}</h5>
                        <span className="text-gray-500 text-xs">
                          {(file.file_size / (1024 * 1024)).toFixed(2)} mb
                        </span>
                      </div>
                      <div className="lg:w-[10%]">
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="bg-red-600 p-1 hover:bg-red-700 rounded-sm"
                          type="button"
                        >
                          <FiTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitted}
              className="text-white inline-flex items-center mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isSubmitted ? (
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
