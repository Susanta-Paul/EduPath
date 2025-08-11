export default function SignUp(){
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
                    <form className="flex flex-col items-center mt-10">
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
                            <select required className="bg-black text-white text-xl md:text-2xl">
                                <option value="Student">Student</option>
                                <option value="Instructor">Instructor</option>
                            </select>
                        </div>
                        <input className="cursor-pointer mt-3 py-1 w-[90%] bg-blue-600 rounded-md text-xl font-bold hover:bg-blue-700 " 
                        type="submit" value="SignUp" />
                    </form>
                    <div className="text-xl mt-5 flex justify-center">
                        Already Have an account?  
                        <button className="ml-2 font-bold cursor-pointer">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}