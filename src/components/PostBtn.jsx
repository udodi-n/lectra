import { useNavigate } from 'react-router-dom'
import plus from '../assets/plus.svg'

function PostBtn({route}) {
    const navigate = useNavigate();
    return(
        <button className="z-100 h-15 w-15 fixed bottom-4 right-4 rounded-full dark:bg-white bg-blue-500 text-4xl grid place-items-center"
                    onClick={() => navigate(route)}>
                        <img src={plus} className="aspect-square w-3/10 "/>
                    </button>
    )
}

export default PostBtn
