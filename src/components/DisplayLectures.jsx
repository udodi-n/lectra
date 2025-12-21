import {
  doc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import Grid from "./Grid";
import Title from "./Title";
import LectureCard from "./LectureCard";
import GridBackgroundDemo from "./GridBackgroundDemo";

const DisplayLectures = () => {
  const [nothing, setNothing] = useState(false);
  const [posts, setPosts] = useState([]);

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    async function updateStatus() {
      const now = new Date();
      const nowTime = now.getTime();

      const q = query(
        collection(db, "lectures"),
        where("startTimeStamp", "<=", nowTime),
        where("endTimeStamp", ">", nowTime)
      );

      const snap = await getDocs(q);
      snap.forEach((item) => {
        const docRef = doc(db, "lectures", item.id);
        updateDoc(docRef, {
          status: "Active",
          statusValue: "active",
        });
      });

      const endq = query(
        collection(db, "lectures"),
        where("endTimeStamp", "<=", nowTime)
      );

      const endSnap = await getDocs(endq);
      endSnap.forEach((item) => {
        const docRef = doc(db, "lectures", item.id);
        updateDoc(docRef, {
          status: "Ended",
          statusValue: "ended",
        });
      });

      const upq = query(
        collection(db, "lectures"),
        where("startTimeStamp", ">", nowTime)
      );

      const upSnap = await getDocs(upq);
      upSnap.forEach((item) => {
        const docRef = doc(db, "lectures", item.id);
        updateDoc(docRef, {
          status: "Coming up",
          statusValue: "coming_up",
        });
      });
    }

    updateStatus();

    const interval = setInterval(updateStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    const uhh = tomorrow.setDate(now.getDate() + 1);
    const tomorrowString = tomorrow.toLocaleDateString("en-CA");
    const nowString = now.toLocaleDateString("en-CA");

    const q = query(
      collection(db, "lectures"),
      where("lectureDate", "in", [nowString, tomorrowString]),
      orderBy("startTimeStamp", "desc")
    );

    const updatePosts = onSnapshot(q, (snapshot) => {
      const postArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postArray);
    });
    return () => updatePosts();
  }, []);

  useEffect(() => {
    function checkLength() {
      if (posts.length === 0) {
        setNothing(true);
        console.log("0");
      } else {
        setNothing(false);
        console.log("something");
      }
    }

    return () => checkLength();
  }, [posts]);
  return (
    <div className="relative z-40 w-full min-h-screen bg-[#ececec] dark:bg-transparent flex flex-col justify-center items-center pt-35 overflow-y-auto ">
      <Title title="Lectures" />
      <Grid posts={posts} Card={LectureCard} setBool={true} />
      <GridBackgroundDemo className=" absolute inset-0 -z-10 opacity-10" />
      {/* 
            <div className={`${nothing? '' : 'hidden'} z-100 gap-5 w-full flex flex-col justify-center items-center`}>
                <h1 className="text-3xl text-white/30">Nothing to see here</h1>
                <img className="opacity-50" src="/nun.png"/>
            </div> */}
    </div>
  );
};

export default DisplayLectures;
