import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/Signup.jsx'
import Sidebar from './Components/Sidebar.jsx'
import Home from './Pages/Home.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-[#121212] min-h-screen text-white relative flex'>
      <Sidebar/>
      <div className="w-full lg:w-[80%] h-screen overflow-scroll overflow-x-hidden pb-15">
        <Home/>
      </div>
      
    </div>
  )
}

export default App
