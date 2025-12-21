import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import ToggleTheme from '../components/ToggleTheme'

const AdminNav = () => {
    const [route, setRoute] = useState("")
    const navigate = useNavigate()
    return (
        <div className="dark:text-white bg-[#fcfcfc] dark:bg-[#1c1c1c] min-h-screen flex flex-col text-black font-[Google_Sans_Flex] items-center">
            {/* Header Start */}
            <div className=" w-full p-4 flex justify-center items-center">
                <h1 className='text-5xl font-[Instrument_Serif]'>Admin <span className="underline">Navigation</span></h1>
            </div>
            {/* Header End */} 

            <div className="flex-1 w-full flex justify-center items-center">
                {/* Section Start */}
                <div className='w-4/5 lg:w-1/5 flex flex-col justify-center items-center gap-6 '>
                    {/* Lecture Section Start*/}
                    <div className="border-1 border-black dark:border-white flex justify-around w-full items-center">
                        <h2 className='text-3xl'>Lectures</h2>
                        <h2 
                        className="text-3xl"
                        onClick={() => navigate('/admin/lectures')}
                        >→</h2>
                    </div>
                    {/* Lecture Section End */}
                
                    {/* Lecture Section Start*/}
                    <div className="border-1 border-black dark:border-white flex justify-around w-full items-center">
                        <h2 className='text-3xl'
                        >Assignments</h2>
                        <h2 className="text-3xl"
                        onClick={() => navigate('/admin/assignments')}                        
                        >→</h2>
                    </div>
                    {/* Lecture Section End */}
                
                    {/* Lecture Section Start*/}
                    <div className="border-1 border-black dark:border-white flex justify-around w-full items-center">
                        <h2 className='text-3xl'
                    
                        >Book Prices</h2>
                        <h2 className="text-3xl" onClick={() => navigate('/admin/books')}>→</h2>
                    </div>
                    {/* Lecture Section End */}
                
                </div>
                {/* Section End */}
            </div>
            {/* Footer Start */}
            <ToggleTheme /> 
            <Footer />        
        </div>
    )
}

export default AdminNav;