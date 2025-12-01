import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()

    return (
        <>
        <div className="z-160 fixed w-4/5 mt-10 rounded-4xl flex justify-center items-center h-16 bg-white/10 backdrop-blur-md">
            <div className="rounded-4xl bg-white/10 h-83/100 w-97/100 flex items-center justify-around">
                <h1 className="font-[Instrument_Serif] text-white text-3xl">Lectra</h1>
                <ul className="flex gap-4 text-white">
                    <li><a onClick={() => navigate('/about')}>About</a></li> 
                    <li><a href="https://wa.me/2349070594045">Help</a></li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default Header