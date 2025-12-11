import LectureCard from './LectureCard'

function LectureGrid({ posts, color, courses, isEditing=false}) {
    return (
        <div className="mt-2 w-full grid text-white"
            style={{display:"grid",
                    gridTemplateColumns:"repeat(auto-fit,minmax(220px, auto)) ",
                    gridAutoRows: "1fr"
            }}>

             {posts.map(post => (
                <LectureCard key={post.id} post={post} color={color} courses={courses} isDisabled={!isEditing}/>
            ))}

        </div>
    )
}

export default LectureGrid