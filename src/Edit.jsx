import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from './firebase'
import { doc, collection, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import Banner from './Banner'  


    

    function Edit() {
    const [time, setTime] = useState('')
    const [finish, setFinish] = useState('')
    const [date, setDate] = useState('')
    const { id } = useParams()
    const navigate = useNavigate();
    const[option, setOption] = useState("")
    const[lecturer, setLecturer] = useState("")
    const [nextdate, setNextDate] = useState('')
    const[value, setValue] = useState("")
    const [status, setStatus] = useState("")
    const [confirm, setConfirm] = useState(false)

    useEffect(() => {
        const grabInfo = async () => {
            const fill = await getDoc(doc(db, "lectures", id));
            if (fill.exists()){
                const snap = fill.data();
                setTime(snap.startTime)
                setFinish(snap.endTime)
                setLecturer(snap.lecturer)
                setOption(snap.code)
                setNextDate(snap.nextDate)
                setDate(snap.lectureDate)
                setValue(snap.location)

            } else {
                navigate('/notfound')
            }
        }
        grabInfo()
    }, [])
    
    const courses = {
        cs: {"code": "CST", "lecturer": "Mr Kingsley Maduabuchi", "source": "/cs.jpg"},
        phy101: {"code": "Physics 101", "lecturer": "Dr Kingsley", "source": "/phy101.jpg"},
        chem101: {"code": "Chem 101", "lecturer": "Dr. Ikeh", "source": "/chem101.jpg"},
        gst121: {"code": "Use of Library: GST 121", "lecturer": "Sir Opah", "source": "/lib.jpg"},
        stat: {"code": "Statistics", "lecturer": "Pahscal", "source": "/stat101.jpg"},
        math101: {"code": "Maths 101", "lecturer": "Mrs Ndidiamaka Edith", "source": "/math.jpg"},
        gst111: {"code": "Communication in English: GST 111", "lecturer": "Dr. Ugochukwu", "source":"/english.jpg"}
    }

    function updateLectureEntry(e) {
            e.preventDefault()

            const getStartTime = new Date(`${date}T${time}`)
            const getEndTime = new Date(`${date}T${finish}`)

            const startTimeStamp = getStartTime.getTime();
            const endTimeStamp = getEndTime.getTime();

            const now = new Date(date)
            const tomorrow = new Date(now)
            const uhh = tomorrow.setDate(now.getDate() + 1);
            const tomorrowString = tomorrow.toLocaleDateString('en-CA') 

        updateDoc(doc(db, "lectures", id), {
            code: option,
            course: courses[option].code,
            startTime: time, 
            endTime: finish,
            lectureDate: date,
            lecturer: lecturer,
            nextDate: tomorrowString,
            location: value,
            startTimeStamp: startTimeStamp,
            endTimeStamp: endTimeStamp
        })
        navigate('/admin/lectures')
    }

    async function deleteLecture() {
            await deleteDoc(doc(db, "lectures", id))
            navigate('/admin/lectures')
    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-[#1c1c1c] font-[Instrument_Sans]  ">
          <div className={`flex justify-center items-center absolute z-80 w-full h-screen backdrop-blur-md ${confirm? "" : "hidden"}`}>
            <div className="flex flex-col justify-center items-center aspect-13/6 w-4/5 bg-[#1c1c1c] text-white gap-5">
                <p>Are you sure you want to delete this?</p>
                <div className='flex gap-4 w-full justify-center'>
                    <button className="text-black bg-white aspect-11/6 w-1/5" onClick={() => setConfirm(false)}>Cancel</button>
                    <button className="text-black bg-red-600 text-white aspect-11/6 w-1/5" onClick={() => deleteLecture()}>Yes</button>
                </div>
            </div>
          </div>
            {/* Post Card Start */}
            <div className='relative aspect-9/16 w-4/5 flex flex-col bg-white rounded-4xl justify-center items-center overflow-hidden '>

              <img onClick={() => setConfirm(true)} src="/delete.png" className="p-3 rounded-full bg-white absolute top-10 right-10"/>
                <Banner
                image={courses[option]?.source}
                className="w-full h-[40%] flex"
                imgClassName="object-cover h-full w-full" 
                />
    
                {/* Details Start */}
                <form onSubmit={updateLectureEntry} className="py-6 w-4/5 justify-center items-center flex flex-col flex-1 gap-4">
                    <select 
                    required
                    className="w-full p-2 focus:outline-none border-1 border-[#1c1c1c]"
                    onChange={(e) => 
                    {
                        const selected = e.target.value
                        setOption(selected);
                        setLecturer(courses[selected].lecturer); 
                    }}
                        value={option}>
                            <option value="">--Select a course--</option>
                        {Object.entries(courses).map(([key, course]) => (
                            <option key={key}
                                value={key}> 
                                
                                {course.code}
                            </option>
                        ))}
                    </select>
                    <div className='w-full flex justify-around items-center'>
                               <input 
                               type="time"
                               value={time}
                               onChange={(e) => setTime(e.target.value)}
                                className="border border-[#1c1c1c] rounded-xl p-2 aspect-13/5 w-2/5  text-center"
                               required
                               />
                               <p>to</p>
                               <input 
                               type="time"
                               value={finish}
                               onChange={(e) => setFinish(e.target.value)}
                                className="border border-[#1c1c1c] rounded-xl p-2 aspect-13/5 w-2/5  text-center"
                               required
                               />
                            </div>
                            <input type="date"
                            onChange={(e) => {
                                const selected = e.target.value
                                setDate(selected)}} 
                            value={date}
                            />
                    <select onChange={(e) => setValue(e.target.value)}
                    value={value}
                        className="w-full p-2 focus:outline-none border-1 border-[#1c1c1c]"
                        >
                        <option value="">--Select a Location--</option>
                        <option value="Hall B">Hall B</option>
                        <option value="Hall A">Hall A</option> 
                        <option value="FANS">FANS</option>
                        <option value="Computer Lab">Computer Lab</option>
                    </select>

                    <input 
                    type="text"
                    placeholder="Mrs Ugwu Edith"
                    value={lecturer}
                    onChange={(e) => setLecturer(e.target.value)} 
                    className="w-full focus:outline-none border-1  border-b-[#1c1c1c] border-r-[#1c1c1c] p-2"
                    />

                    <button className='px-3 py-2 my-3 bg-[#1c1c1c] text-white w-full '>Update Post</button>
                </form>
                    </div>
                </div>
    )
}

export default Edit