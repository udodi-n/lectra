import {db} from '../firebase'
import { setDoc, collection, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import BookDef from './BookDef'

function BookUpload() {
    const navigate = useNavigate()

    function handleBookUpload({name, price, imageURL}) {
        const books = collection(db, "books")
        const newRef = doc(books)

        setDoc(newRef, {
            name: name,
            price: price,
            imgurl: imageURL,
            editId: newRef.id
        })

        navigate('/admin/books')
    }

    return(
        <div className="min-h-screen bg-[#1c1c1c] grid place-items-center font-[Google_Sans_Flex]">
            <BookDef action={handleBookUpload} btn="Upload"/>
        </div>
    )
}

export default BookUpload