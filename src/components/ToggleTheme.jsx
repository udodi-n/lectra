import { useState, useEffect } from 'react'
import toggle from '../assets/toggle.png'

function ToggleTheme({hidden=true}) {

    const [dark, setDark] = useState(false)

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')

    if (storedTheme === 'dark') {
            setDark(true)
        document.documentElement.classList.add('dark')
    }
    }, [])

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark)
        localStorage.setItem('theme', dark ? 'dark' : 'light')
    }, [dark])

    function toggletheme() { 
        setDark(prev => !prev)
    }

    return (
      <button
        onClick={toggletheme}
        className={` ${
          hidden ? "hidden" : ""
        } fixed z-999 bottom-0  left-0 p-4`}
      >
        <div
          className="aspect-square w-8 backdrop-invert"
          style={{
            WebkitMaskImage: `url(${toggle})`,
            maskImage: `url(${toggle})`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            maskSize: "contain",
          }}
        ></div>
        {/* <img className="dark:invert bg-clip-image w-10 h-auto " src={toggle} alt="" /> */}
      </button>
    );
}

export default ToggleTheme