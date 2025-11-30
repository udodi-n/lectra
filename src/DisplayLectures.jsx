import { doc, collection, getDoc, getDocs, onSnapshot, orderBy, query, where  } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import {db} from './firebase'
import { useState, useEffect } from 'react';
import Banner from './Banner' 

const DisplayLectures = () => {
        const [posts, setPosts] = useState([])  
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
    
        useEffect(() => {
            const now = new Date()
            const tomorrow = new Date(now)
            const uhh = tomorrow.setDate(now.getDate() + 1);
            const tomorrowString = tomorrow.toLocaleDateString('en-CA')
            const nowString = now.toLocaleDateString('en-CA')
            
            const q = query(
                collection(db, "lectures"),
                where("lectureDate", "==", nowString),
                where("nextDate", "==", tomorrowString),
                orderBy("createdAt", "desc")
            );
            const updatePosts = onSnapshot(q, (snapshot) => {
            const postArray = snapshot.docs.map( doc => ({id: doc.id, ...doc.data()}));
            setPosts(postArray)}
            )
        return () => updatePosts()
        }, [])  
    return (
        <div className="mt-20 w-full min-h-screen flex flex-col justify-center items-center gap-7 py-10 overflow-y-auto text-white">
            <h2 className='text-3xl underline'>Lectures</h2>
            {posts.map(post => {
                return
            })}
                        {posts.map(post => (
                                <div key={post.editId} className="w-full flex flex-col items-center">
                                    <p className="w-4/5 py-5">Date: {post.lectureDate}</p>
                                    <div className="aspect-1/1 relative sm:w-3/5 w-4/5 md:w-4/10 bg-white rounded-2xl overflow-hidden text-white">
                                    <Banner
                                    image={courses[post.code]?.source}
                                    className="z-10 h-[100%] w-full "
                                    imgClassName="h-full w-full object-cover"
                                    />
                                    <div className="z-20 absolute bottom-0 left-0 w-full h-[40%] mx-auto p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/90 flex flex-col justify-center h-fit">
                                         <div className="w-4/5 flex flex-col ">
                                             <h1 className="underline text-xl font-bold">{post.course}</h1>
                                             <div className='flex justify-start bg-[#1c1c1c] w-fit px-2 my-2 rounded-3xl '><h1>{post.startTime} to {post.endTime}</h1>
                                             </div>
                                             <h1 >{post.location}</h1>
                                             <h1>{post.lecturer}</h1>
                                         </div>
                                    </div>
                                    </div>
                                </div>
                        ))}
                    </div>
    )
}

export default DisplayLectures