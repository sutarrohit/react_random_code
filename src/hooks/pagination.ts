"use client";
import { useState, useEffect } from "react";

type postsType = {
  userId: number;
  id: number;
  title: string;
  body: string;
}[];

export const usePagination = () => {
  const [userPosts, setUserPost] = useState<postsType | null>(null);
  const [pageLimit, setPageLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const getPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((response) => {
        setUserPost(response);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (!userPosts) getPosts();
  }, []);

  return {
    userPosts: userPosts ? userPosts : null,
    pageLimit,
    setPageLimit,
    currentPage,
    setCurrentPage,
  };
};
