"use client";
import { useState } from "react";
import { usePagination } from "@/hooks/pagination";

const Pagination = () => {
  const { userPosts, pageLimit, setPageLimit, currentPage, setCurrentPage } =
    usePagination();

  const [changeLimit, setChangeLimit] = useState(pageLimit);

  return (
    <div className="w-full min-h-screen p-4">
      <p className="font-bold text-4xl w-full text-center mt-4">User Posts</p>

      {/* Set Page limit */}
      <div className="my-4 flex justify-end gap-2">
        <input
          placeholder={`Page ${pageLimit}`}
          className="w-[80px] p-2 border border-gray-800 rounded-lg"
          onChange={(e) => setChangeLimit(Number(e?.target?.value))}
        />
        <button
          className="border border-gray-800 px-4 py-2 rounded-lg"
          onClick={() => setPageLimit(changeLimit)}
        >
          setPage
        </button>
      </div>

      {/* Posts */}
      <div className="border border-gray-500 rounded-lg px-2 py-4 w-full flex flex-col gap-6">
        {userPosts &&
          userPosts
            ?.slice(
              currentPage * pageLimit - pageLimit,
              currentPage * pageLimit
            )
            .map((post, index) => {
              return (
                <div key={index} className="px-2">
                  <div className="flex gap-2">
                    <p className="font-bold text-xl">{post?.id}:</p>
                    <p className="font-medium text-lg">{post?.title}</p>
                  </div>
                  <p className="px-4 mt-1">{post?.body}</p>
                </div>
              );
            })}
      </div>

      <div className="h-full flex items-end gap-4 mt-4">
        <button
          className="px-4 py-2 border border-gray-800 rounded-lg w-[150px]"
          onClick={() =>
            setCurrentPage((prev) => (prev !== 1 ? prev - 1 : prev))
          }
        >
          Prev
        </button>
        <button
          className="px-2 py-2 w-[150px] border border-gray-800 rounded-lg"
          onClick={() =>
            setCurrentPage((prev) =>
              userPosts && userPosts?.length > currentPage * pageLimit
                ? prev + 1
                : prev
            )
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
