function About() {
    return(
        <>
        <div className="bg-[#1c1c1c] h-screen flex flex-col justify-center items-center font-[Google_Sans_Flex] text-white ">
            <div className="w-full flex justify-center flex-1 items-center">
                <div className="w-10/10 aspect-4/4 flex justify-center items-center ">
                    <div className="border-1 border-white aspect-1/1 w-2/5 bg-white rounded-full overflow-hidden transform -rotate-20 z-20">
                    <img src="/ryoichi.png" className="object-cover h-full w-full" alt="" /></div>
                    <div className="border-1 border-white transform rotate-10 z-10  aspect-1/1 w-2/5 bg-white rounded-full overflow-hidden ">
                    <img src="/jachi.jpg" className="object-cover h-full w-full" alt="" /></div>
                </div>
            </div>
            <h1 className="p-8 ">Created by <a href="https://x.com/ryoichi_xl" className="underline">тк.ryoichi</a>. Idea by <a href="https://x.com/EonWoh" className="underline">DevJachi</a></h1>
        </div>
        </>
    )
}

export default About