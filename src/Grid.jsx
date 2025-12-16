import LectureCard from './LectureCard'

function Grid({posts, Card = LectureCard, setBool=false}) {
    return (
        <div className="p-2 w-full grid text-white"
            style={{display:"grid",
                    gridTemplateColumns:"repeat(auto-fit,minmax(220px, auto)) ",
                    gridAutoRows: "1fr"
            }}>

             {posts.map(post => (
                <Card key={post.id} post={post} isDisabled={setBool}/>
            ))}

        </div>
    )
}

export default Grid