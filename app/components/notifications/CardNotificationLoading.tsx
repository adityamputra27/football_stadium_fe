import React from "react";

export default function CardNotificationLoading() {
  return (
    <React.Fragment>
      <div className="w-full mb-3 p-4 bg-white border border-gray-800 rounded-lg shadow-sm dark:bg-gray-900">
        <div role="status" className="w-full animate-pulse">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-60 mb-2.5"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[700px] mb-5"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[200px] mb-2.5"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[200px]"></div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </React.Fragment>
  );
}
