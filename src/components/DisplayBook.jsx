import Grid from "./Grid";
import BookCard from "./BookCard";
import Header from "./Header";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import Title from "./Title";
import { onSnapshot, collection } from "firebase/firestore";
import Footer from "./Footer";
import Wave from "./Wave";
import WaveInv from './WaveInv'
import GridBackgroundDemo from "./GridBackgroundDemo";
import ToggleTheme from "./ToggleTheme";

function DisplayBook() {
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
    <div className="w-full h-fit flex bg-[#cdcdcd] dark:bg-[#1c1c1c] flex-col items-center">
      <Header />
      <div className=" bg-[#dddddd] w-full min-h-screen flex flex-col items-center justify-center pt-35">
        <Title title="Books" />
        <Grid posts={post} Card={BookCard} setBool={true} />
        <GridBackgroundDemo className="absolute inset-0 z-10 opacity-10" />
      </div>
      <Wave />
      <WaveInv />
      <Footer />
      <ToggleTheme />
    </div>
  );
}

export default DisplayBook;
