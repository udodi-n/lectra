import BookDef from './BookDef'
import { useState, useEffect } from 'react'
import {db} from './firebase'
import { getDoc, doc, collection, query, where, updateDoc } from 'firebase/firestore'

import { useParams, useNavigate } from 'react-router-dom'

function BookEdit() {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        async function getData() {
        
            const snap = await getDoc(doc(db, "books", id))
            if(snap.exists()) {
                const data = snap.data()
                setName(data.name)
                setPrice(data.price)
                setImage(data.imgurl)
            }
        }

        getData()
    }, [])

    function updateBook({name, price, imageURL}) {
        console.log('hey')
            updateDoc(doc(db, "books", id), {
                name: name,
                price: price,
                imgurl: imageURL
            })

            navigate('/admin/books')
    }
    return(
        <div className="min-h-screen bg-[#1c1c1c] grid place-items-center font-[Google_Sans_Flex]">
            <BookDef name={name} cost={price} img={image} action={updateBook} btn="Update"/> 
        </div>
    )
}

export default BookEdit