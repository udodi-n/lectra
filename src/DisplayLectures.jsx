import { doc, collection, getDocs, onSnapshot, orderBy, query, where, updateDoc} from 'firebase/firestore'
import {db} from './firebase'
import { useState, useEffect } from 'react';
import Grid from './Grid'
import LectureCard from './LectureCard'
import GridBackgroundDemo from './GridBackgroundDemo'
 

const DisplayLectures = () => {
    const [network, setNetwork] = useState(true)
        const [posts, setPosts] = useState([]) 
        


        const [date, setDate] = useState(new Date())



        // useEffect(() => {
        //     const windowUpdate = []
        //     function handleScroll() {
        //         windowUpdate.push(window.scrollY)
        //         console.log(windowUpdate)
        //     }
        //     window.addEventListener("scroll", handleScroll) 
            
        //     return () => window.removeEventListener("scroll", handleScroll)
        // }, [])

        useEffect(() => {
                async function updateStatus() {
                    console.log("oi")
                    const now = new Date();
                    const nowTime = now.getTime();

                    const q = query (
                        collection(db, "lectures"),
                        where("startTimeStamp", "<=", nowTime),
                        where("endTimeStamp", ">", nowTime)

                    );

                    const snap = await getDocs(q);
                    snap.forEach((item) => {
                        const docRef = doc(db, "lectures", item.id);
                         updateDoc(docRef, {
                         status: "Active",
                         statusValue: "active"
                        })
                    })

                    const endq = query(
                        collection(db, "lectures"),
                        where("endTimeStamp", "<=", nowTime)
                    );

                    const endSnap = await getDocs(endq)
                    endSnap.forEach((item) => {
                        const docRef = doc(db, "lectures", item.id);
                        updateDoc(docRef, {
                            status: "Ended",
                            statusValue: "ended"
                        })
                    })

                    const upq = query(
                        collection(db, "lectures"),
                        where("startTimeStamp", ">", nowTime)
                    );

                    const upSnap = await getDocs(upq)
                    upSnap.forEach((item) => {
                        const docRef = doc(db, "lectures", item.id);
                        updateDoc(docRef, {
                            status: "Coming up",
                            statusValue: "coming_up"
                        })
                    })
                }

                updateStatus()

                const interval = setInterval(updateStatus, 5000)

                return () => clearInterval(interval)
        }, [])
    
        useEffect(() => {
            const now = new Date()
            const tomorrow = new Date(now)
            const uhh = tomorrow.setDate(now.getDate() + 1);
            const tomorrowString = tomorrow.toLocaleDateString('en-CA')
            const nowString = now.toLocaleDateString('en-CA')
            
            const q = query(
                collection(db, "lectures"),
                where("lectureDate", "in", [nowString, tomorrowString]),
                orderBy("startTimeStamp", "desc") 
            );
            const updatePosts = onSnapshot(q, (snapshot) => {
            const postArray = snapshot.docs.map( doc => ({id: doc.id, ...doc.data()}));
            setPosts(postArray);
        }
    );
        return () => updatePosts()
        }, [])  
    return (
        <div className="relative z-40 w-full min-h-screen bg-transparent flex flex-col items-center pt-35 overflow-y-auto ">
            <h2 className="font-[Google_Sans_Flex] text-3xl text-white">Lectures</h2>
            <Grid posts={posts} Card={LectureCard} setBool={true}/>
            <GridBackgroundDemo className="absolute inset-0 -z-10 opacity-10" />

        </div>
    )
}

export default DisplayLectures