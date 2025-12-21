import Banner from "./Banner";
import { useNavigate } from "react-router-dom";

function BookCard({ post, isDisabled = false }) {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center flex-1 font-[Google_Sans_Flex]">
      <div
        className="relative bg-white w-full h-full flex flex-col flex-1 rounded-2xl overflow-hidden text-white p-2 mt-4 "
        style={{
          boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="h-50 border-1 rounded-lg border-black overflow-hidden">
          <img
            src={post.imgurl}
            className="object-cover w-full h-full"
            alt=""
          />
        </div>
        <div className="relative w-full mx-auto py-5 rounded-2xl flex flex-col flex-1 justify-center px-2 items-start h-fit text-black">
          <div className="w-full flex flex-col ">
            <h1 className=" underline text-xl font-bold">{post.name}</h1>
            <h1>₦{post.price}</h1>
          </div>
          <div
            className={`${
              isDisabled ? "hidden" : ""
            } absolute aspect-1/1 w-4 z-60 bottom-8 right-3 overflow-hidden`}
            onClick={() => navigate(`/admin/books/edit/${post.editId}`)}
          >
            <img
              className="object-cover h-full w-full invert"
              src="/edit.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
