import { doc, collection, getDoc, getDocs, onSnapshot, orderBy, query, where, updateDoc} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import {db} from './firebase'
import { useState, useEffect } from 'react';
import Banner from './Banner'
import Wave from './Wave'

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

                const interval = setInterval(updateStatus, 3000)

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
                orderBy("createdAt", "desc")
            );
            const updatePosts = onSnapshot(q, (snapshot) => {
            const postArray = snapshot.docs.map( doc => ({id: doc.id, ...doc.data()}));
            setPosts(postArray);
        }
    );
        return () => updatePosts()
        }, [])  
    return (
        <div className="w-full min-h-fit  bg-transparent flex flex-col  items-center pt-35 overflow-y-auto ">
            <h2 className="font-[Google_Sans_Flex] text-3xl text-white">Lectures</h2>
            <div className="mt-2 w-full grid text-white"
            
            style={{display:"grid",
                    gridTemplateColumns:"repeat(auto-fit,minmax(220px, auto)) ",
                    gridAutoRows: "1fr"
                }}>
            
                    {posts.map(post => (
                            <div key={post.editId} className="w-full  place-items-center "
                            >
                                <p className=" py-5 font-[Jetbrains_Mono] rounded-2xl overflow-hidden text-white p-2">Date: {post.lectureDate}</p>
                                <div className="relative bg-white w-3/4 rounded-2xl overflow-hidden text-white p-2">
                                <div className="absolute w-fit h-4 top-0 flex justify-center items-center text-[10px] right-0 my-5 mx-5 rounded-full text-white px-4 py-2"
                                        style={{ backgroundColor: color[post.statusValue]?.color }}> {post.status}</div>
                                <Banner
                                image={courses[post.code]?.source}
                                className="min-h-20 max-h-40 w-full border rounded-[16px] overflow-hidden "
                                imgClassName=" w-full object-cover object-center"
                                />
                                <div className="relative w-full mx-auto py-5 rounded-2xl flex flex-col justify-center px-2 items-start h-fit text-black">
    
    
                        <div className="w-full flex flex-col ">
                            <h1 className="underline text-xl font-bold">{post.course}</h1>
                            <div className='flex justify-start bg-[#1c1c1c] w-fit px-2 my-2 text-white rounded-3xl '><h1>{post.startTime} to {post.endTime}</h1>
                            </div>
                            <h1 >{post.location}</h1>
                            <h1>{post.lecturer}</h1>
                        </div>
                                </div>
                                </div>
                            </div>
                    ))}
                            {/* <div className='flex h-screen z-100 flex-col absolute justify-center items-center'>
                                <p className="">NETWORK_ERROR</p>
                                <p>Reload or try again later</p>
                                </div> */}
                        </div>
                        <Wave />
        </div>
    )
}

export default DisplayLectures