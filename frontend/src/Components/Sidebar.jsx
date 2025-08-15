import { IoHomeOutline } from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import apiRequest from "./ApiRequest.js";

export default function Sidebar({userType, isLoggedIn, setUserType, setIsLoggedIn}){

    const navigate= useNavigate()

    async function handleSignOut() {
        
        try {
            await apiRequest("get", "/user/signout")

            // remove my local storage
            localStorage.removeItem("isLoggedIn")
            localStorage.removeItem("userType")
            localStorage.removeItem("username")
            localStorage.removeItem("userId")

            setIsLoggedIn(false)
            setUserType(null)

            alert("User Successfully Logged Out")

            navigate("/login")

        } catch (error) {
            console.log(error)
            navigate("/login")
        }
    }


    return (
        <div className="w-screen pb-4 bg-[#121212] border-t border-white pt-3 fixed bottom-0 flex justify-around text-xl lg:w-[20%] lg:flex-col lg:text-2xl lg:h-screen lg:justify-start lg:static lg:border-r lg:border-white lg:p-3">
            <div className="flex flex-col justify-center items-center lg:flex-row lg:gap-4 lg:justify-start lg:mt-2 hover:bg-white/10 lg:p-2 lg:rounded-lg cursor-pointer">
                <IoHomeOutline/>
                Home
            </div>
            {
                userType==="Student" && (
                    <div className="flex flex-col justify-center items-center lg:flex-row lg:gap-4 lg:justify-start lg:mt-2 hover:bg-white/10 lg:p-2 lg:rounded-lg cursor-pointer">
                        <MdOndemandVideo/>
                        My Enrollments
                    </div>
                )
            }

            {
                userType==="Instructor" && (
                    <div className="flex flex-col justify-center items-center lg:flex-row lg:gap-4 lg:justify-start lg:mt-2 hover:bg-white/10 lg:p-2 lg:rounded-lg cursor-pointer">
                        <MdOndemandVideo/>
                        My Courses
                    </div>
                )
            }

            {
                isLoggedIn && (
                    <>
                        <div className="flex flex-col justify-center items-center lg:flex-row lg:gap-4 lg:justify-start lg:mt-2 hover:bg-white/10 lg:p-2 lg:rounded-lg cursor-pointer">
                            <CgProfile/>
                            Profile
                        </div>
                        <div onClick={handleSignOut}  className="flex flex-col justify-center items-center lg:flex-row lg:gap-4 lg:justify-start lg:mt-2 hover:bg-white/10 lg:p-2 lg:rounded-lg cursor-pointer">
                            <FiLogOut/>
                            LogOut
                        </div>
                    </>
                )
            }
            
            
        </div>
    )
}