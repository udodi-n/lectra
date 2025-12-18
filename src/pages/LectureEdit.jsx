import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import LectureDef from '../components/LectureDef'
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import del from '../assets/delete.png'

function LectureEdit() {
  const [time, setTime] = useState("");
  const [finish, setFinish] = useState("");
  const [date, setDate] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [option, setOption] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [nextdate, setNextDate] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const grabInfo = async () => {
      const fill = await getDoc(doc(db, "lectures", id));

      if (fill.exists()) {
        const snap = fill.data();
        setTime(snap.startTime);
        setFinish(snap.endTime);
        setLecturer(snap.lecturer);
        setOption(snap.code);
        setNextDate(snap.nextDate);
        setDate(snap.lectureDate);
        setValue(snap.location);
      } else {
        navigate("/notfound");
      }
    };
    grabInfo();
  }, []);

  function updateLectureEntry({code, course, lecturer, startTime, endTime, lectureDate, nextDate, location, startTimeStamp, endTimeStamp}) {

    updateDoc(doc(db, "lectures", id), {
      code: code,
      course: course,
      location: location,
      lecturer: lecturer,
      startTime: startTime,
      endTime: endTime,
      lectureDate: lectureDate,
      nextDate: nextDate,
      startTimeStamp: startTimeStamp,
      endTimeStamp: endTimeStamp,
    });
    navigate("/admin/lectures");
  }

  async function deleteLecture() {
    await deleteDoc(doc(db, "lectures", id));
    navigate("/admin/lectures");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1c1c1c] font-[Instrument_Sans]  ">
      <div
        className={`flex justify-center items-center absolute z-80 w-full h-screen backdrop-blur-md ${
          confirm ? "" : "hidden"
        }`}
      >
        <div className="flex flex-col justify-center items-center aspect-13/6 w-4/5 bg-[#1c1c1c] text-white gap-5">
          <p>Are you sure you want to delete this?</p>
          <div className="flex gap-4 w-full justify-center">
            <button
              className="text-black bg-white aspect-11/6 w-1/5"
              onClick={() => setConfirm(false)}
            >
              Cancel
            </button>
            <button
              className="text-black bg-red-600 text-white aspect-11/6 w-1/5"
              onClick={() => deleteLecture()}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
      {/* Post Card Start */}
        {" "}
        <img
          onClick={() => setConfirm(true)}
          src={del}
          className="p-3 rounded-full bg-white absolute top-10 right-10"
        />
        <LectureDef action={updateLectureEntry} timeProp={time} finishProp={finish} dateProp={date} locationProp={value} lecturerProp={lecturer} courseProp={option}/>
    </div>
  );
}

export default LectureEdit;
