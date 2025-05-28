"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('bookmarkedUsers');
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarkedUsers', JSON.stringify(bookmarks));
    console.log("Bookmarks updated:", bookmarks);
  }, [bookmarks]);

  const addBookmark = (user) => {
    if (!bookmarks.some((u) => u.id === user.id)) {
      setBookmarks((prev) => [...prev, user]);
    }
  };

  const removeBookmark = (userId) => {
    setBookmarks((prev) => prev.filter((u) => u.id !== userId));
  };

  const isBookmarked = (userId) => {
    return bookmarks.some((u) => u.id === userId);
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  return useContext(BookmarkContext);
};
