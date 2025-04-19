/* eslint-disable import/no-unresolved */
import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { DefaultEditor } from "react-simple-wysiwyg";
import { toast } from "react-toastify";
import { footballNewsCategoryConstants } from "~/constants/football-news";
import { createNews, updateNews } from "~/services/news";
import { FootballNews } from "~/types/news";

interface ModalFootballClubProps {
  openModal: boolean;
  setOpenModal: (type: boolean) => void;
  refetch: () => void;
  selectedFootballNews?: FootballNews;
}

export default function Modal(props: ModalFootballClubProps) {
  const { openModal, setOpenModal, refetch, selectedFootballNews } = props;
  const [formData, setFormData] = useState<Partial<FootballNews>>({
    title: "",
    body: "",
    category: "Stadiums",
    is_featured_news: 0,
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageNews, setImage] = useState<File | null>(null);

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

  const handleTextChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setFormData({ body: event.target.value as string });
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      try {
        e.preventDefault();
        setLoading(true);

        const payload = new FormData();

        payload.append("title", formData.title!);
        payload.append("body", formData.body!);
        payload.append("category", formData.category!);
        payload.append(
          "is_featured_news",
          formData.is_featured_news!.toString()
        );

        if (imageNews) payload.append("image", imageNews);

        if (selectedFootballNews) {
          await updateNews(selectedFootballNews?.id, payload);
          toast.success("Successfully updated football news! 🎉");
        } else {
          await createNews(payload);
          toast.success("Successfully created football news! 🎉");
        }

        setLoading(false);
        setOpenModal(false);

        refetch();
      } catch (error) {
        toast.error(
          selectedFootballNews
            ? "Failed to update football news! ❌"
            : "Failed to create football news! ❌"
        );

        setLoading(false);
      }
    },
    [formData, refetch, selectedFootballNews, setOpenModal, imageNews]
  );

  useEffect(() => {
    if (selectedFootballNews) {
      setFormData({
        title: selectedFootballNews.title,
        image: selectedFootballNews.image,
        body: selectedFootballNews.body,
        is_featured_news: selectedFootballNews.is_featured_news,
        category: selectedFootballNews.category,
      });
    } else {
      setFormData({
        title: "",
        body: "",
        category: "Stadiums",
        is_featured_news: 0,
        image: "",
      });
    }
  }, [selectedFootballNews]);

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`fixed ${
        openModal ? "" : "hidden"
      } inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50`}
    >
      <div className="relative p-4 w-full max-w-7xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {selectedFootballNews ? "Edit" : "Create"} Football News
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
            <div className="flex gap-4">
              <div className="w-2/5">
                <div className="mb-3">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    name="title"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required={true}
                    onChange={handleInputChange}
                    value={formData.title}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="..."
                    required={!selectedFootballNews?.image}
                    onChange={(e) => handleImageChange(e, setImage)}
                  />
                </div>
                <div className="mb-3">
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
                    {footballNewsCategoryConstants.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="is_featured_news"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Is Featured News
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    <div className="col-span-3">
                      <input
                        id="is_featured_news_true"
                        type="radio"
                        name="is_featured_news"
                        value="1"
                        checked={formData.is_featured_news === 1}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            is_featured_news: 1,
                          })
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="is_featured_news_true"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Yes
                        <p className="text-xs text-gray-400">
                          this option for showing football news in mobile which
                          for section featured news
                        </p>
                      </label>
                    </div>
                    <div className="col-span-3">
                      <input
                        id="is_featured_news_false"
                        type="radio"
                        value="0"
                        name="is_featured_news"
                        checked={formData.is_featured_news === 0}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            is_featured_news: 0,
                          })
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="is_featured_news_false"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        No
                        <p className="text-xs text-gray-400">
                          this option for showing football news in mobile which
                          for section regular news
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-3/5">
                <div className="mb-3">
                  <label
                    htmlFor="body"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Body (Content)
                  </label>
                  {/* <textarea
                    rows={20}
                    name="body"
                    id="body"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required={true}
                    onChange={handleInputChange}
                  >
                    {formData.body}
                  </textarea> */}
                  <DefaultEditor
                    value={formData.body}
                    onChange={handleTextChange}
                    className="h-96"
                  />
                </div>
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
