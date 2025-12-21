import { useNavigate } from 'react-router-dom'
import { useEffect, useState} from "react";

function Header() {
    const navigate = useNavigate()
    const [translateY, setTranslateY] = useState(0)
    const [lastScroll, setLastScroll] = useState(0)

        useEffect(() => {
            function handleScroll() {
                const currentScroll = window.scrollY;

                if(currentScroll > lastScroll) {
                    setTranslateY(-150); 
                } else {
                    setTranslateY(0)
                }

                setLastScroll(currentScroll)
            }

            window.addEventListener("scroll", handleScroll)

            return () => window.removeEventListener("scroll", handleScroll)
        }, [lastScroll])

    return (
        <>
        <div className="z-160 fixed lg:w-1/4 w-4/5 md:w-3/5 mt-10 rounded-4xl flex font-[Google_Sans_Flex] justify-center items-center h-16 bg-black/10 dark:bg-white/10 backdrop-blur-md p-[0.3rem] "
        style={{
            transform: `translateY(${translateY}px)`,
            transition: "transform 0.3s ease"
        }}>
            <div className="rounded-4xl bg-black/10 h-full w-full flex items-center justify-around dark:invert">
                <h1 className="font-[Instrument_Serif] text-3xl">Lectra</h1>
                <ul className="flex gap-4">
                    <li><a href="/">Home</a></li> 
                    <li><a href="/books">Books</a></li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default Header