import DisplayLectures from './DisplayLectures'
import Header from './Header'
import Footer from './Footer'

function Home() {
    return(
        <>
        <div className="relative min-h-screen flex flex-col items-center bg-[#1c1c1c] font-[Google_Sans_Flex]">
             <Header />
            <DisplayLectures />
            <Footer />
        </div>
        </>
    )
}

export default Home 