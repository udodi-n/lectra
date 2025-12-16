import { doc, collection, getDocs, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db, auth } from './firebase.js'
import BookCard from './BookCard'
import Grid from './Grid'
import PostBtn from './PostBtn'
import { useState, useEffect } from 'react'

function Book(){
    const [post, setPost] = useState([])

    useEffect(() => {
        function displayBooks() {
            const bookRef = collection(db, "books")
            const display = onSnapshot(bookRef, (snapshot) => {
            const postArray = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            setPost(postArray)
            })
        } 
            displayBooks()
    }, [])

    return(
        <div className="min-h-screen bg-[#1c1c1c] mt-0 lg:p-20">
            <PostBtn route={'/admin/books/upload'}/>
            <Grid posts={post} Card={BookCard}  />
        </div>
    )
}

export default Book