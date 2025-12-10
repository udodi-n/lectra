import Banner from './Banner'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, auth } from './firebase'
import { getDoc, setDoc, doc, collection, serverTimestamp } from 'firebase/firestore' 


function LecturePost() {
    
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [nextdate, setNextDate] = useState('')
    const [finish, setFinish] = useState('')
    const lecture = collection(db, "lectures")
    const newRef = doc(lecture)
    const navigate = useNavigate()
    const id = newRef.id
    const [disable, setDisable] = useState(true)
    const[option, setOption] = useState("")
    const[lecturer, setLecturer] = useState("") 
    const[value, setValue] = useState("")

    const lectureEntry = (e) => {
        // const newDate = new Date(date)
        // const day = newDate.getDay()
        // const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // const dayName= daysOfWeek[day]
        e.preventDefault()
        const getStartTime = new Date(`${date}T${time}`)
        const getEndTime = new Date(`${date}T${finish}`)

        const startTimeStamp = getStartTime.getTime();
        const endTimeStamp = getEndTime.getTime();

        setDoc(newRef, {
            code: option,
            course: courses[option].code,
            location: value,
            lecturer: lecturer,
            startTime: time,
            endTime: finish,
            createdAt: serverTimestamp(),
            lectureDate: date,
            // day: dayName,
            nextDate: nextdate,
            startTimeStamp: startTimeStamp,
            endTimeStamp: endTimeStamp,
            editId: id,
            status: "Coming up",
            statusValue: "coming_up"
        })

        navigate('/admin/lectures')

    }

    function setTomorrow(selectedOption) {
            const now = new Date(selectedOption)
            const tomorrow = new Date(now)
            const uhh = tomorrow.setDate(now.getDate() + 1);
            const setTom = tomorrow.toLocaleDateString('en-CA')
            setNextDate(setTom)
            console.log(setTom)

    }

    function checkSomething() {
        // console.log(time)
        // setFinish(time) 
    }

    const courses = {
        cs: {"code": "CST", "lecturer": "Dr Kingsley Maduabuchi", "source": "/cs.jpg"},
        phy101: {"code": "Physics 101", "lecturer": "Dr Kingsley", "source": "/phy101.jpg"},
        chem101: {"code": "Chem 101", "lecturer": "Dr. Ikeh", "source": "/chem101.jpg"},
        gst121: {"code": "Use of Library", "lecturer": "Sir Opah", "source": "/lib.jpg"},
        stat: {"code": "Statistics", "lecturer": "Pahscal", "source": "/stat101.jpg"},
        math101: {"code": "Maths 101", "lecturer": "Mrs Ndidiamaka Edith", "source": "/math.jpg"},
        gst111: {"code": "Communication in English", "lecturer": "Dr. Ugochukwu", "source":"/english.jpg"}
    }

 

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#1c1c1c] font-[Google_Sans_Flex]  ">
            {/* Post Card Start */}
            <div className='h-160 w-4/5 flex flex-col bg-white rounded-4xl justify-center items-center overflow-hidden '>
                <Banner
                image={courses[option]?.source}
                className="w-full h-[40%] flex"
                imgClassName="object-cover h-full w-full" 
                />
 
                {/* Details Start */}
                <form onSubmit={lectureEntry} className="w-4/5 justify-center items-center flex flex-col flex-1 gap-4">
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
                                className="border border-[#1c1c1c] rounded-xl p-2 w-[110px] text-center"
                               required
                               />
                               <p>to</p>
                               <input 
                               type="time"
                               value={finish}
                               onChange={(e) => setFinish(e.target.value)}
                                className="border border-[#1c1c1c] rounded-xl p-2 w-[110px] text-center"
                               required
                               />
                            </div>
                            <input type="date"
                            onChange={(e) => {
                                const selected = e.target.value
                                setDate(selected); setTomorrow(selected)}}
                            value={date}
                            />
                    <select onChange={(e) => {setValue(e.target.value); checkSomething()}} 
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

                    <button className='px-3 py-2 mt-3 bg-[#1c1c1c] text-white w-full '>Post</button>
                </form>
            </div>
        </div>
    )
}

export default LecturePost