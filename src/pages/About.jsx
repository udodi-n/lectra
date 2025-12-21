import tag from '../assets/tag.png'
import fd from '../assets/fd.png'
import ToggleTheme from '../components/ToggleTheme'

function About() {
return (
        <>
        <div className="bg-[#fdfdfd] dark:bg-[#1c1c1c] h-screen flex flex-col justify-center items-center font-[Google_Sans_Flex] dark:text-white text-black">
            <div className="w-4/5 gap-4 flex flex-col justify-center flex-1 items-center">
            <img src={tag} className="dark:invert" /> 
            <img src={fd} className="dark:invert"/>
            <div className="w-full flex flex-col gap-2 text-black dark:invert">
                <p>
                    Lectra shows you what lectures you have today or the next day so <span className="text-white bg-blue-700">you
                        avoid being a victim to retards who get their lecture updates from other department groups
                    </span> 
                </p>
                <p>You're welcome.</p>
            </div>
            </div>

            <h1 className="p-8 text-black dark:invert">
            Created by{" "}
            <a href="https://x.com/ryoichi_xl" className="underline">
                тк.ryoichi
            </a>
            . Idea by{" "}
            <a href="https://x.com/EonWoh" className="underline">
                DevJachi
            </a>
            </h1>
            <ToggleTheme /> 
        </div>
        </>
    );
    }

    export default About;
