import { useNavigate } from 'react-router-dom'

function PostBtn({route}) {
    const navigate = useNavigate();
    return(
        <button className="z-40 h-15 w-15 fixed bottom-10 right-10 rounded-full bg-white text-4xl grid place-items-center"
                    onClick={() => navigate(route)}>
                        <img src="/plus.svg" className="aspect-square w-3/10 "/>
                    </button>
    )
}

export default PostBtn
