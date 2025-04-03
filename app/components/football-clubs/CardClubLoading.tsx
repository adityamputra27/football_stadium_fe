import React from "react";

export default function CardClubLoading() {
  return (
    <React.Fragment>
      <div className="w-full mb-0 p-3 bg-white border border-gray-800 rounded-xl shadow-sm dark:bg-gray-900">
        <div role="status" className="w-full animate-pulse">
          <div className="h-24 bg-gray-200 rounded-xl dark:bg-gray-700 max-w-60 mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded-xl dark:bg-gray-700 max-w-[100px]"></div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </React.Fragment>
  );
}
