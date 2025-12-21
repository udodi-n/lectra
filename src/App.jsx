import { useState, useEffect } from 'react'
import { auth } from './firebase'
import { onAuthStateChanged  } from 'firebase/auth'
import { Routes, Route, useParams } from 
'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import AdminNav from './pages/AdminNav'
import NotFound from './pages/NotFound'
import Assignments from './pages/Assignments'
import './App.css' 
import './index.css'
import LectureEdit from './pages/LectureEdit' 
import LecturePost from './pages/LecturePost'
import Lectures from './pages/Lectures'
import Book from './pages/Book'
import About from './pages/About'
import BookUpload from './components/BookUpload'
import BookEdit from './components/BookEdit'
import DisplayBook from './components/DisplayBook'

function App() {
    const { id } = useParams()
    const [user, setCurrentUser] = useState(null)

    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (currentUser) => {
        setCurrentUser(currentUser)
        console.log(user)
      })

      return unsub;
    }, [])

  return <div>
    
    <Routes>
      <Route path = '/' element={<Home />} />
      <Route path = '/admin' element={<Admin />} />
      {user && user.email === "itsudodi@gmail.com" && (
        <>
        <Route path = '/admin/home' element={<AdminNav />} />
        <Route path = '/admin/lectures' element = {<Lectures />} />
        <Route path = '/admin/assignments' element = {<Assignments />} />
        <Route path = '/admin/lectures/post' element = {<LecturePost />} />
        <Route path='/admin/lectures/edit/:id' element={<LectureEdit />} />
        <Route path='/admin/books/edit/:id' element={<BookEdit />} />
        <Route path = '/admin/books' element={<Book />} />
        <Route path = '/admin/books/upload' element={<BookUpload />} />
        </>
      )}
      <Route path = '/books' element={<DisplayBook />} />
      <Route path = '/about' element={<About />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </div>
}

export default App
