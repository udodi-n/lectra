    import { useState, useEffect } from "react";
    import { useNavigate } from "react-router-dom";
    import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
    import { auth } from '../firebase'

    const Admin = () => {
        const navigate = useNavigate();
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [error, setError] = useState("")
        const [user, setCurrentUser] = useState(null)

        useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser)
            console.log(user)
        })

        return unsub;
        }, [])

        useEffect(() => {
            function checkUser() {
                if(user && user.email==="itsudodi@gmail.com") {
                    console.log('ola')
                    navigate('/admin/home')
                }
            } 

            return checkUser()
        }, [user])

            const handleLogin = async (e) => {
                e.preventDefault() 
                try {
                    const userCredential = await signInWithEmailAndPassword(auth, email, password)
                    navigate('/admin/home') 
                } catch(err) {
                    setError("Invalid username/password")
                    console.log(error)
                }
                
            }

        return (
            <div className="h-screen flex justify-center items-center text-white bg-[#1c1c1c] font-[Instrument_Sans]">
                {/* Auth Start */}
                <div className="w-3/5 h-full flex flex-col justify-center items-center gap-8">
                    <h1 className="text-4xl">sudo <span className="font-[Instrument_Serif]">Admin</span> <br /> </h1>
                    <span className="text-base text-red-600">{error}</span>
                    {/* Input Start */}
                    <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
                        <input 
                        className="w-full border-1 border-white p-2 px-3 focus:outline-none"
                        placeholder="Email"
                        type="email"
                        onChange={e => {setEmail(e.target.value); console.log(user)}}
                        value={email}
                        autoComplete="username"
                        required
                        />
                        <input 
                        className="w-full border-1 border-white p-2 px-3 focus:outline-none"
                        placeholder="Password"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        autoComplete="current-password"
                        required
                        /> 
                        <p className="text-[11px] text-center dark:text-white">By signing in, you agree to our <a href="/terms" className="underline">Terms & Conditions</a></p>
                        <button className=" w-full py-3 text-xl bg-[#f5de33] text-black">Sign In</button>
                    </form>

                    {/* Input End */}

                    {/* Button */}
                    
                </div>
            </div>
        )
    }

    export default Admin;