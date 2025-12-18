import { db } from "../firebase";
import { useNavigate } from 'react-router-dom';
import {
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import LectureDef from "../components/LectureDef";

function LecturePost() {

    const navigate = useNavigate();

  const lectureEntry = ({code, course, lecturer, startTime, endTime, lectureDate, nextDate, location, startTimeStamp, endTimeStamp, editId, ref}) => {

    setDoc(ref, {
      code: code,
      course: course,
      location: location,
      lecturer: lecturer,
      startTime: startTime,
      endTime: endTime,
      createdAt: serverTimestamp(),
      lectureDate: lectureDate,
      // day: dayName,
      nextDate: nextDate,
      startTimeStamp: startTimeStamp,
      endTimeStamp: endTimeStamp,
      editId: editId,
      status: "Coming up",
      statusValue: "coming_up",
    });

    navigate("/admin/lectures");
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1c1c1c] font-[Google_Sans_Flex]  ">
      <LectureDef action={lectureEntry}/> 
    </div>
  );
}

export default LecturePost;
