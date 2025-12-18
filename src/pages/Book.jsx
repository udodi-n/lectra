import { collection, getDocs, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";
import Title from "../components/Title";
import BookCard from "../components/BookCard";
import Grid from "../components/Grid";
import PostBtn from "../components/PostBtn";
import { useState, useEffect } from "react";

function Book() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    function displayBooks() {
      const bookRef = collection(db, "books");
      const display = onSnapshot(bookRef, (snapshot) => {
        const postArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPost(postArray);
      });
    }
    displayBooks();
  }, []);

  return (
    <div className="min-h-screen bg-[#1c1c1c] flex flex-col items-center gap-8 mt-0 lg:p-20">
      <Title title="Books" />
      <PostBtn route={"/admin/books/upload"} />
      <Grid posts={post} Card={BookCard} />
    </div>
  );
}

export default Book;
