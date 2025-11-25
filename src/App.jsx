import { useState, useEffect } from 'react'
import { auth } from './firebase'
import { onAuthStateChanged  } from 'firebase/auth'
import { BrowserRouter, Routes, Route, useParams } from 
'react-router-dom'
import Home from './Home'
import Admin from './Admin'
import AdminNav from './AdminNav'
import NotFound from './NotFound'
import Assignments from './Assignments'
import './App.css' 
import Edit from './Edit'
import LecturePost from './LecturePost'
import Lectures from './Lectures'
import Banner from './Banner'

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
        <Route path='/admin/lectures/edit/:id' element={<Edit />} />
        </>
      )}
      <Route path='*' element={<NotFound />} />
    </Routes>
  </div>
}

export default App
