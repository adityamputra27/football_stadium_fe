import React, { useCallback, useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import { notificationCategoryConstant } from "~/constants/notification";
import {
  createNotification,
  updateNotification,
} from "~/services/notification";
import { Notification } from "~/types/notification";

interface ModalNotificationProps {
  openModal: boolean;
  setOpenModal: (type: boolean) => void;
  refetch: () => void;
  selectedNotification?: Notification;
}

export default function Modal(props: ModalNotificationProps) {
  const { openModal, setOpenModal, refetch, selectedNotification } = props;
  const [formData, setFormData] = useState<Partial<Notification>>({
    title: "",
    category: undefined,
    description: "",
    status: "success",
    send_push: true,
    topic_category: undefined,
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

        if (selectedNotification) {
          await updateNotification(selectedNotification?.id, formData);
          toast.success("Successfully updated notification! 🎉");
        } else {
          await createNotification(formData);
          toast.success("Successfully created notification! 🎉");
        }
      } catch (error) {
        toast.error(
          selectedNotification
            ? "Failed to update notification ❌"
            : "Failed to create notification ❌"
        );
      } finally {
        setLoading(false);
        setOpenModal(false);
        refetch();
      }
    },
    [formData, refetch, selectedNotification, setOpenModal]
  );

  useEffect(() => {
    if (selectedNotification) {
      setFormData({
        title: selectedNotification?.title,
        category: selectedNotification?.category,
        description: selectedNotification?.description,
        status: "success",
        send_push: selectedNotification?.send_push ?? true,
        topic_category: selectedNotification?.topic_category,
      });
    } else {
      setFormData({
        title: "",
        category: undefined,
        description: "",
        status: "success",
        send_push: true,
        topic_category: undefined,
      });
    }
  }, [selectedNotification, openModal, setOpenModal]);

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
              {selectedNotification ? "Edit" : "Create"} Notification
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
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="..."
                  required={true}
                  value={formData.title}
                  onChange={handleInputChange}
                  defaultChecked
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="send_push"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Topic Category
                </label>
                <div className="grid grid-cols-6 gap-2">
                  <div className="col-span-2">
                    <input
                      id="topic_category_8"
                      type="radio"
                      name="topic_category"
                      value="topic_welcome"
                      checked={formData.topic_category === "topic_welcome"}
                      onChange={() =>
                        setFormData({
                          ...formData,
                          topic_category: "topic_welcome",
                        })
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="topic_category_8"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Welcome
                    </label>
                  </div>
                  <div className="col-span-2">
                    <input
                      id="topic_category_1"
                      type="radio"
                      name="topic_category"
                      value="topic_football_stadium"
                      checked={
                        formData.topic_category === "topic_football_stadium"
                      }
                      onChange={() =>
                        setFormData({
                          ...formData,
                          topic_category: "topic_football_stadium",
                        })
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="topic_category_1"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Football Stadium
                    </label>
                  </div>
                  <div className="col-span-2">
                    <input
                      id="topic_category_2"
                      type="radio"
                      name="topic_category"
                      value="topic_football_news"
                      checked={
                        formData.topic_category === "topic_football_news"
                      }
                      onChange={() =>
                        setFormData({
                          ...formData,
                          topic_category: "topic_football_news",
                        })
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="topic_category_2"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Football News
                    </label>
                  </div>
                  <div className="col-span-2">
                    <input
                      id="topic_category_3"
                      type="radio"
                      name="topic_category"
                      value="topic_football_league"
                      checked={
                        formData.topic_category === "topic_football_league"
                      }
                      onChange={() =>
                        setFormData({
                          ...formData,
                          topic_category: "topic_football_league",
                        })
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="topic_category_3"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Football League
                    </label>
                  </div>
                  <div className="col-span-2">
                    <input
                      id="topic_category_4"
                      type="radio"
                      name="topic_category"
                      value="topic_football_club"
                      checked={
                        formData.topic_category === "topic_football_club"
                      }
                      onChange={() =>
                        setFormData({
                          ...formData,
                          topic_category: "topic_football_club",
                        })
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="topic_category_4"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Football Club
                    </label>
                  </div>
                  <div className="col-span-2">
                    <input
                      id="topic_category_5"
                      type="radio"
                      name="topic_category"
                      value="topic_football_match"
                      checked={
                        formData.topic_category === "topic_football_match"
                      }
                      onChange={() =>
                        setFormData({
                          ...formData,
                          topic_category: "topic_football_match",
                        })
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="topic_category_5"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Football Match
                    </label>
                  </div>
                  <div className="col-span-2">
                    <input
                      id="topic_category_6"
                      type="radio"
                      name="topic_category"
                      value="topic_football_event"
                      checked={
                        formData.topic_category === "topic_football_event"
                      }
                      onChange={() =>
                        setFormData({
                          ...formData,
                          topic_category: "topic_football_event",
                        })
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="topic_category_6"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Football Event
                    </label>
                  </div>
                  <div className="col-span-2">
                    <input
                      id="topic_category_7"
                      type="radio"
                      name="topic_category"
                      value="topic_football_player"
                      checked={
                        formData.topic_category === "topic_football_player"
                      }
                      onChange={() =>
                        setFormData({
                          ...formData,
                          topic_category: "topic_football_player",
                        })
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="topic_category_7"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Football Player
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={formData.category}
                  onChange={handleInputChange}
                  name="category"
                >
                  <option selected={formData.category == undefined}>-</option>
                  {notificationCategoryConstant.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="send_push"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Push Notification
                </label>
                <div className="grid grid-cols-6 gap-2">
                  <div className="col-span-3">
                    <input
                      id="send_push_true"
                      type="radio"
                      name="send_push"
                      value="true"
                      checked={formData.send_push === true}
                      onChange={() =>
                        setFormData({
                          ...formData,
                          send_push: true,
                        })
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="send_push_true"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Yes
                      <p className="text-xs text-gray-400">
                        this action will push or sending notification to all
                        device or users
                      </p>
                    </label>
                  </div>
                  <div className="col-span-3">
                    <input
                      id="send_push_false"
                      type="radio"
                      value="false"
                      name="send_push"
                      checked={formData.send_push === false}
                      onChange={() =>
                        setFormData({
                          ...formData,
                          send_push: false,
                        })
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="send_push_false"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      No
                      <p className="text-xs text-gray-400">
                        this action will not push or sending notification to
                        users
                      </p>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="..."
                  value={formData.description}
                  onChange={handleInputChange}
                  name="description"
                ></textarea>
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
