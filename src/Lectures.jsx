import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { db, auth } from './firebase'
import Banner from './Banner'
import { doc, collection, getDoc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'

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

    return (
        <div className="flex flex-col justify-center items-center relative min-h-screen bg-[#1c1c1c] font-[Google_Sans_Flex]">
        <div className="text-white text-5xl py-8 font-[Instrument_Serif] underline">Lectures</div>
            {/* Post button start */}
            <button className="z-40 h-15 w-15 fixed bottom-10 right-10 rounded-full bg-white text-4xl"
            onClick={() => navigate('/admin/lectures/post')}
            >+</button>
            {/* Post button end */}

            {/* Post Visbility  Start*/}
            <div className="w-full min-h-screen flex flex-col justify-center items-center gap-7 py-10 overflow-y-auto">
                {posts.map(post => {
                    return (
                        <div key={post.editId} className="relative min-h-60 max-h-120 w-6/10 bg-white rounded-[24px] overflow-hidden text-white flex flex-col items-center p-2">
                        <Banner 
                        className="min-h-20 max-h-60 w-full border rounded-[16px] overflow-hidden"
                        image={courses[post.code]?.source} 
                        
                        imgClassName="h-full w-full object-cover object-center " 
                        />

                        <div className="w-full max-w-sm mx-auto py-5 px-2 rounded-2xl flex flex-col justify-center items-start h-fit text-black"> 
                             <div className="w-4/5 flex flex-col ">
                                 <h1 className="underline text-xl font-bold">{post.course}</h1>
                                 <div className='flex justify-start bg-[#1c1c1c] w-fit px-2 my-2 rounded-3xl text-white '><h1>{post.startTime} to {post.endTime}</h1>
                                 </div>
                                 <h1 >{post.location}</h1>
    
                                 <h1>{post.lecturer}</h1>
                             </div>
                             <div className='absolute aspect-1/1 w-4 z-60 bottom-6 right-2 overflow-hidden'
                        onClick={() => navigate(`/admin/lectures/edit/${post.editId}`)}><img className='object-cover h-full w-full invert' src="/edit.png" /></div>
                        </div> 
                        
                        </div>
                    )
                })}
            </div>
        </div>
    ) 
}

export default Lectures
