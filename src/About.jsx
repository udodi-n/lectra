function About() {
return (
        <>
        <div className="bg-[#1c1c1c] h-screen flex flex-col justify-center items-center font-[Google_Sans_Flex] text-white ">
            <div className="w-4/5 gap-4 flex flex-col justify-center flex-1 items-center">
            <img src="/tag.png" className="invert" />
            <img src="/fd.png" className="" />
            <div className="w-full flex flex-col gap-2">
                <p>Devjachi had the idea.</p>
                <p> I executed it.</p>
                <p>
                    Lectra shows you what lectures you have today or the next day so <span className="bg-blue-700">you
                        don't have to look like an idiot
                    </span> asking questions about what
                    lectures you have in the group chat .
                </p>
            </div>
            </div>

            <h1 className="p-8 ">
            Created by{" "}
            <a href="https://x.com/ryoichi_xl" className="underline">
                тк.ryoichi
            </a>
            . Idea by{" "}
            <a href="https://x.com/EonWoh" className="underline">
                DevJachi
            </a>
            </h1>
        </div>
        </>
    );
    }

    export default About;
