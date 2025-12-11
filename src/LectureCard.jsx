import Banner from './Banner'
import { useNavigate } from 'react-router-dom'

function LectureCard({post, color, courses, isDisabled=false}) {
    const navigate = useNavigate()
    return (
        <div  className="w-full flex flex-col justify-center items-center flex-1">
            <p className={` py-5 font-[Jetbrains_Mono] rounded-2xl overflow-hidden text-white p-2`}>Date: {post.lectureDate}</p>
            <div className="relative bg-white md:w-3/10 lg:w-2/10 w-3/4 flex flex-col flex-1 rounded-2xl overflow-hidden text-white p-2">
            <div className="absolute w-fit h-4 top-0 flex justify-center items-center text-[10px] right-0 my-5 mx-5 rounded-full text-white px-4 py-2"
                    style={{ backgroundColor: color[post.statusValue]?.color }}> {post.status}</div>
            <Banner
            image={courses[post.code]?.source}
            className="min-h-30 max-h-40 w-full border rounded-[16px] overflow-hidden "
            imgClassName=" w-full object-cover object-center"
            />
            <div className="relative w-full mx-auto py-5 rounded-2xl flex flex-col flex-1 justify-center px-2 items-start h-fit text-black">


    <div className="w-full flex flex-col ">
        <h1 className="underline text-xl font-bold">{post.course}</h1>
        <div className='flex justify-start bg-[#1c1c1c] w-fit px-2 my-2 text-white rounded-3xl '><h1>{post.startTime} to {post.endTime}</h1>
        </div>
        <h1 >{post.location}</h1>
        <h1>{post.lecturer}</h1>
    </div>
    <div className={`${isDisabled? 'hidden' : ''} absolute aspect-1/1 w-4 z-60 bottom-8 right-3 overflow-hidden`}
            onClick={() => navigate(`/admin/lectures/edit/${post.editId}`)}><img className='object-cover h-full w-full invert' src="/edit.png" />    
        </div> 
    </div>
    </div>

</div>
    )
}

export default LectureCard