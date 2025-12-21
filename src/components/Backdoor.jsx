import { useState, useEffect } from 'react'
import backdoor from '../assets/backdoor.png'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Backdoor() {
        const [hidden, setHidden] = useState(true);
        const [user, setCurrentUser] = useState(null);
        const navigate = useNavigate()

        useEffect(() => {
          const unsub = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser);
            console.log(user);
          });

          return unsub;
        }, []);

        useEffect(() => {
          if (user && user.email === "itsudodi@gmail.com") {
            setHidden(false);
          }
        }, [user]);
    return(
        <button
                onClick={() => navigate('/admin/home')}
                className={` ${hidden? 'hidden' : ''} fixed z-999 bottom-0 right-0 p-8`}
              >
                <div
                  className="w-8 h-8 backdrop-invert"
                  style={{
                    WebkitMaskImage: `url(${backdoor})`,
                    maskImage: `url(${backdoor})`,
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                  }}
                ></div>
                {/* <img className="dark:invert bg-clip-image w-10 h-auto " src={toggle} alt="" /> */}
              </button>
    )
}

export default Backdoor