import {NavLink, useNavigate} from "react-router-dom"

export default function CourseCard({id, title, instructors, level, duration, image}){

    const navigate=useNavigate()

    function gotocourse(){
        navigate(`/course/${id}`)
    }

    return (
        <div className="w-[90%] p-4 bg-white/15 rounded-xl md:w-[40%] lg:w-[30%] hover:scale-[1.1] ">
            <div className="overflow-hidden rounded-lg w-full max-h-45">
                <img src={image} alt="Course Logo" />
            </div>
            
            <div className="text-xl ">
                <span className="font-bold">{title}</span>
            </div>
            <div className="text-xl flex gap-2">
                <span className="font-bold">Instructors:</span> 
                <div>{instructors.map((teacher)=>(`${teacher.fullname}, `))}</div>
            </div>
            <div className="text-xl">
                <div className="flex gap-3">
                    <span>· {duration.number} {duration.unit} </span>
                    <span>· {level} </span>
                    </div>
            </div>
            <div className="mt-4 text-2xl flex justify-center">
                <button onClick={gotocourse}  className="w-[90%] cursor-pointer p-2 bg-white/15 font-bold rounded-lg">View Course</button>
            </div>
        </div>
    )
}