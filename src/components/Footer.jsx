import ToggleTheme from './ToggleTheme'
function Footer() {
    return(
        <>
        <div className=" w-full py-4 grid place-items-center text-black dark:text-white font-[Google_Sans_Flex]"
        style={{fontSize: "calc(11px + 0.8vw)"}}>
            <ul className="flex w-4/5 justify-center gap-2   items-center">
                <li><a href="/about">About</a></li>
                <li><a target="_blank" href="mailto:itsudodi@gmail.com" className="underline">Terms & Conditions</a></li>
            </ul>
            <p className="py-1">© 2025 Cracked Retards</p>
            <ToggleTheme />
        </div>
        </>
    )
}

export default Footer