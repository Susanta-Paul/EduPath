import {NavLink, useNavigate} from "react-router-dom"
import axois from "axios"
import { useState } from "react"


export default function SignUp({setIsLoggedIn, setUserType}){

    const [error, setError]=useState("")
    const navigate=useNavigate()

    async function handleSignup(e) {
        e.preventDefault()

        const data={
            fullname: e.target.fullname.value,
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            role: e.target.role.value,
        }

        const response= await axois.post(`${import.meta.env.VITE_BASE_URL}/user/register`, 
            data,
            {withCredentials: true},
        )

        if(response.status==201){
            alert("User Successfully Created")
            localStorage.setItem("isLoggedIn", true)
            localStorage.setItem("userType", response.data.user.role)
            localStorage.setItem("userId", response.data.user._id)
            localStorage.setItem("username", response.data.user.username)
            console.log(response.data)

            setIsLoggedIn(true)
            setUserType(response.data.user.role)

            navigate("/")
        }
        else{
            console.error(error.response?.data)
            if(error.status==400){
                setError(error.response?.data?.errors[0].msg)
            }else{
                setError(error.response?.data?.errors)
            }
        }
    }


    return(
        <div>
            <div className="flex justify-center items-center h-screen">
                <div className="w-[90%] bg-white/10 rounded-xl shadow-lg p-4 md:w-[50%] md:p-7 ">
                    <div className="mb-4">
                        <h1
                        className="text-4xl font-bold md:text-5xl"
                        >Welcome To EduPath</h1>
                        <p className="text-gray-500 text-md mt-2 md:text-xl">Enter your details and Signup</p>
                    </div>
                    <form className="flex flex-col items-center mt-10" onSubmit={(e)=>handleSignup(e)}>
                        <div className="flex gap-3 items-center flex-wrap mb-2">
                            <span className="text-xl font-bold md:text-2xl">Fullname: </span>
                            <input required
                            className="text-xl ml-3 border border-white md:text-2xl p-1"
                            type="text" name="fullname" placeholder="Fullname"/>
                        </div>
                        <div className="flex gap-3 items-center flex-wrap mb-2">
                            <span className="text-xl font-bold md:text-2xl">Username: </span>
                            <input required
                            className="text-xl ml-3 border border-white md:text-2xl p-1"
                            type="text" name="username" placeholder="Username"/>
                        </div>
                        <div className="flex gap-3 items-center flex-wrap mb-2">
                            <span className="text-xl font-bold md:text-2xl">Emali: </span>
                            <input required
                            className="text-xl ml-3 border border-white md:text-2xl p-1"
                            type="Email" name="email" placeholder="Email"/>
                        </div>
                        <div className="flex gap-3 items-center flex-wrap mb-2">
                            <span className="text-xl font-bold md:text-2xl">Password: </span>
                            <input required
                            className="text-xl ml-3 border border-white md:text-2xl p-1"
                            type="password" name="password" placeholder="Password" />
                        </div>
                        <div className="flex gap-3 items-center flex-wrap mb-2">
                            <span className="text-xl font-bold md:text-2xl">Role: </span>
                            <select required name="role" className="bg-black text-white text-xl md:text-2xl">
                                <option value="Student">Student</option>
                                <option value="Instructor">Instructor</option>
                            </select>
                        </div>
                        <input className="cursor-pointer mt-3 py-1 w-[90%] bg-blue-600 rounded-md text-xl font-bold hover:bg-blue-700 " 
                        type="submit" value="SignUp" />
                    </form>

                    <div className="text-xl text-red-500">{error}</div>

                    <div className="text-xl mt-5 flex justify-center">
                        Already Have an account?  
                        <NavLink to="/login" ><button className="ml-2 font-bold cursor-pointer">Login</button></NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}