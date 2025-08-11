import { IoHomeOutline } from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";
import { CgProfile } from "react-icons/cg";


export default function Sidebar(){
    return (
        <div className="w-screen pb-4 bg-[#121212] border-t border-white pt-3 fixed bottom-0 flex justify-around text-xl lg:w-[20%] lg:flex-col lg:text-2xl lg:h-screen lg:justify-start lg:static lg:border-r lg:border-white lg:p-3">
            <div className="flex flex-col justify-center items-center lg:flex-row lg:gap-4 lg:justify-start lg:mt-2 hover:bg-white/10 lg:p-2 lg:rounded-lg cursor-pointer">
                <IoHomeOutline/>
                Home
            </div>
            <div className="flex flex-col justify-center items-center lg:flex-row lg:gap-4 lg:justify-start lg:mt-2 hover:bg-white/10 lg:p-2 lg:rounded-lg cursor-pointer">
                <MdOndemandVideo/>
                My Courses
            </div>
            <div className="flex flex-col justify-center items-center lg:flex-row lg:gap-4 lg:justify-start lg:mt-2 hover:bg-white/10 lg:p-2 lg:rounded-lg cursor-pointer">
                <CgProfile/>
                Profile
            </div>
        </div>
    )
}