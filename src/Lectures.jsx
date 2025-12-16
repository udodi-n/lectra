import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { db } from './firebase'
import Grid from './Grid'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import PostBtn from './PostBtn'

const Lectures = () => {

    const [posts, setPosts] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
                const q = query(
                    collection(db, "lectures"),
                    orderBy("createdAt", "desc")
                );
                const updatePosts = onSnapshot(q, (snapshot) => {
                const postArray = snapshot.docs.map( doc => ({id: doc.id, ...doc.data()}));
                setPosts(postArray)}
                )
            return () => updatePosts()
    }, [])  


        const courses = {
        cs: {"source": "/cs.jpg"},
        phy101: {"source": "/phy101.jpg"},
        chem101: {"source": "/chem101.jpg"},
        gst121: {"source": "/lib.jpg"},
        stat: {"source": "/stat101.jpg"},
        math101: {"source": "/math.jpg"},
        gst111: {"source":"/english.jpg"}
    }

    const color = {
    coming_up: { color: "#bf4917" },
    active: { color: "#4cbb36" },
    ended: { color: "#d61818ff" }
};

    return (
        <div className="flex flex-col justify-center items-center relative min-h-screen bg-[#1c1c1c] font-[Google_Sans_Flex]">
        <div className="text-white text-5xl py-8 font-[Instrument_Serif] underline">Lectures</div>
            {/* Post button start */}
                <PostBtn route={'/admin/lectures/post'}/>
            {/* Post button end */}

            {/* Post Visbility  Start*/}
            <Grid posts={posts}/>
        </div>
    ) 
}

export default Lectures
