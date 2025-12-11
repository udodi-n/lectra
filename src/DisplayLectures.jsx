import { doc, collection, getDocs, onSnapshot, orderBy, query, where, updateDoc} from 'firebase/firestore'
import {db} from './firebase'
import { useState, useEffect } from 'react';
import LectureGrid from './LectureGrid'
import GridBackgroundDemo from './GridBackgroundDemo'
 

const DisplayLectures = () => {
    const [network, setNetwork] = useState(true)
        const [posts, setPosts] = useState([]) 
        

        const color = {
            coming_up: {"color": "#bf4917"},
            active: {"color": "#4cbb36"},
            ended: {"color": "#d61818ff"}
        }

        const courses = {
            cs: {"source": "/cs.jpg"},
            phy101: {"source": "/phy101.jpg"},
            chem101: {"source": "/chem101.jpg"},
            gst121: {"source": "/lib.jpg"},
            stat: {"source": "/stat101.jpg"},
            math101: {"source": "/math.jpg"},
            gst111: {"source":"/english.jpg"}
}
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
            <LectureGrid posts={posts} color={color} courses={courses}/>
            <GridBackgroundDemo className="absolute inset-0 -z-10 opacity-10" />

        </div>
    )
}

export default DisplayLectures