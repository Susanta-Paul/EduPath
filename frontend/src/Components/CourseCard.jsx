

export default function CourseCard({title, instructors, level, duration, image}){
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
                <div>{instructors.map((teacher)=>(`${teacher}, `))}</div>
            </div>
            <div className="text-xl">
                <div className="flex gap-3">
                    <span>· {duration} </span>
                    <span>· {level} </span>
                    </div>
            </div>
            <div className="mt-4 text-2xl flex justify-center">
                <button className="w-[90%] cursor-pointer p-2 bg-white/15 font-bold rounded-lg">View Course</button>
            </div>
        </div>
    )
}