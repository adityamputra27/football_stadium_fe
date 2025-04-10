import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { Notification } from "~/types/notification";

interface CardNotificationProps {
  notification: Notification;
  key: number;
  handleEdit: (notification: Notification) => void;
  handleDelete: (id: number) => void;
}

export default function CardNotification(props: CardNotificationProps) {
  const { notification, key, handleDelete } = props;

  return (
    <React.Fragment key={key}>
      <div className="w-full mb-3 p-4 bg-white border border-gray-800 rounded-lg shadow-sm dark:bg-gray-900 dark:border-gray-700">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h5 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
              {notification.title}
            </h5>
            <p className="text-sm text-gray-700 dark:text-gray-400">
              {notification.description}
            </p>
          </div>
          <div className="flex gap-2 items-start">
            {/* <button
              onClick={() => handleEdit(notification)}
              className="inline-flex items-center px-2 py-1 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-200"
            >
              <FiEdit />
            </button> */}
            <button
              onClick={() => handleDelete(notification.id)}
              className="inline-flex items-center px-2 py-1 text-sm font-medium text-white bg-red-700 rounded-md hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{notification.category}</span>
          <span>{notification.created_at}</span>
        </div>
      </div>
    </React.Fragment>
  );
}
