import ToggleTheme from '../components/ToggleTheme'

const NotFound = () => {
    return (
        <div className="h-screen text-black dark:text-white bg-[#fcfcfc] dark:bg-[#1c1c1c] flex flex-col justify-center items-center font-[Instrument_Sans]">
            <div>
                <h3 className="font-bold">404</h3>
                <h1 className="text-6xl">Uhhh, <br /> missing? </h1>
            </div>
            <ToggleTheme />
        </div>
    )
}

export default NotFound