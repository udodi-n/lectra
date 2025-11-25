import Banner from './Banner'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, auth } from './firebase'
import { getDoc, setDoc, doc, collection } from 'firebase/firestore' 

function LecturePost() {

    const lecture = collection(db, "lectures")
    const newRef = doc(lecture)
    const navigate = useNavigate()
    const id = newRef.id
    const [disable, setDisable] = useState(true)
    const[option, setOption] = useState("")
    const[lecturer, setLecturer] = useState("")
    const[value, setValue] = useState("")

    const lectureEntry = (e) => {
        e.preventDefault()
        setDoc(newRef, {
            code: option,
            course: courses[option].code,
            location: value,
            lecturer: lecturer,
            editId: id
        })

        navigate('/admin/lectures')

    }

    const courses = {
        cs: {"code": "CST", "lecturer": "Mr Kingsley Maduabuchi", "source": "/cs.jpg"},
        phy101: {"code": "Physics 101", "lecturer": "Dr Kingsley", "source": "/phy101.jpg"},
        chem101: {"code": "Chem 101", "lecturer": "Dr. Ikeh", "source": "/chem101.jpg"},
        gst121: {"code": "Use of Library: GST 121", "lecturer": "Sir Opah", "source": "/lib.jpg"},
        stat: {"code": "Statistics", "lecturer": "Pahscal", "source": "/stat101.jpg"},
        math101: {"code": "Maths 101", "lecturer": "Mrs Ndidiamaka Edith", "source": "/math.jpg"},
        gst111: {"code": "Communication in English: GST 111", "lecturer": "Dr. Ugochukwu", "source":"/english.jpg"}
    }

    function handleChange(selectedOption) {
        console.log("i like to move it move it")
        console.log(selectedOption)      
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#1c1c1c] font-[Instrument_Sans]  ">
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
                        handleChange(courses[selected].lecturer);
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

                    <select onChange={(e) => setValue(e.target.value)}
                    value={value}
                     className="w-full p-2 focus:outline-none border-1 border-[#1c1c1c]"
                        >
                        <option value="">--Select a Location--</option>
                        <option value="Hall B">Hall B</option>
                        <option value="Hall A">Hall A</option> 
                        <option value="FANS">FANS</option>
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