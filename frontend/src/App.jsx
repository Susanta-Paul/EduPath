import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/Signup.jsx'
import Sidebar from './Components/Sidebar.jsx'
import Home from './Pages/Home.jsx'
import Course from './Pages/Course.jsx'
import MyEnrollment from './Pages/MyEnrollment.jsx'
import MyCourses from './Pages/MyCourses.jsx'
import CreateCourse from './Pages/CreateCourse.jsx'
import QuizSubmit from './Pages/QuizSubmit.jsx'
import QuestionCard from './Components/QuestionCard.jsx'
import Profile from './Pages/Profile.jsx'
import Video from "./Pages/Video.jsx"
import ProtectedRoute from './ProtectedRoute.jsx'
import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom"

function App() {


  const [isLoggedIn, setIsLoggedIn]= useState(localStorage.getItem("isLoggedIn") === "true")
  const [userType, setUserType]= useState(isLoggedIn? localStorage?.getItem("userType"): null)

  useEffect(() => {
    if (isLoggedIn) {
      setUserType(localStorage.getItem("userType"));
    }
  }, [isLoggedIn]);



  return (
    <BrowserRouter >
      <div className='bg-[#121212] min-h-screen text-white relative flex'>
        <Sidebar 
        userType={userType} 
        isLoggedIn={isLoggedIn} 
        setUserType={setUserType}
        setIsLoggedIn={setIsLoggedIn} />
        <div className="w-full lg:w-[80%] h-screen overflow-scroll overflow-x-hidden pb-15">
          
          <Routes>
            {/* Public Routes */}
            {!isLoggedIn && (
              <>
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserType={setUserType}/>} />
                <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} setUserType={setUserType}  />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              {/* Common routes for all logged-in users */}
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/course/:courseId" element={<Course />} />

              {/* Student-only routes */}
              {userType === "Student" && (
                <>
                  <Route path="/myenrollments" element={<MyEnrollment />} />
                  <Route path="/video/:videoId" element={<Video />} />
                  <Route path="/submitquiz/:quizId" element={<QuizSubmit />} />
                </>
              )}

              {/* Instructor-only routes */}
              {userType === "Instructor" && (
                <>
                  <Route path="/mycourses" element={<MyCourses />} />
                  <Route path="/createcourse" element={<CreateCourse />} />
                </>
              )}
            </Route>

            {/* Fallback for unmatched routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>


        </div>
        
      </div>
    </BrowserRouter>
  )
}

export default App
