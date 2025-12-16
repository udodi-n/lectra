import LectureCard from './LectureCard'

function Grid({posts, Card = LectureCard, setBool=false}) {
    return (
        <div className="w-full grid place-items-center gap-5 text-white"
            style={{
                    gridTemplateColumns:"repeat(auto-fit,250px) ",
                    justifyContent: "center",
            
            }}>

            {posts.map(post => (
                <Card key={post.id} post={post} isDisabled={setBool}/>
            ))}

        </div>
    )
}

export default Grid