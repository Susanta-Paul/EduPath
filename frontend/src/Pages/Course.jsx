import { useEffect, useState } from "react"
import { MdOutlineOndemandVideo } from "react-icons/md";
import { SiTicktick } from "react-icons/si";

export default function Course(){

    const [userRole, setUserRole]=useState("Instructor")
    
    const [course, setCourse]=useState({
        description: "This advanced React.js course is designed for experienced React developers seeking to master complex concepts and build highly performant, scalable, and maintainable applications. The curriculum delves beyond foundational principles, focusing on advanced state management, performance optimization, design patterns, testing, and modern tooling.",
        courseName: "Advanced React.js",
        duration: "2 Month",
        level:"Advanced",
        instructors: [{fullname: "Dr. Stang", username: ''},{fullname: "Dr. Smith", username: ''}],
        image: "https://static-assets.codecademy.com/assets/course-landing-page/meta/16x9/learn-advanced-react.jpg",
    })
    const [isEnroll, setIsEnroll]=useState(false)
    const [allVideos, setAllVideos]=useState([
        {id: "7", title: "name", order: 3},
        {id: "9", title: "name", order: 1},
        {id: "2", title: "name", order: 2},
    ])
    const [enrollment, setEnrollment]=useState({
        progress: 15,
        completedVideosIds: ["7"],
    })

    const [section, setSection]=useState("syllabus")

    const [overallProgrss, setOverallProgrss]=useState(75)

    useEffect(() => {
        const sorted = [...allVideos].sort((a, b) => a.order - b.order);
        
        // Compare before setting to avoid unnecessary re-renders
        if (JSON.stringify(sorted) !== JSON.stringify(allVideos)) {
            setAllVideos(sorted);
        }
    }, [allVideos]);

    return (
        <div className="p-5 pb-9">
            <div className="border-b border-white mb-5">
                <img src={course.image} alt="Course Thumbnail" className="rounded-lg" />
                <div className="font-bold text-3xl mt-4 mb-4">{course.courseName}</div>
            </div>


            <div className="flex justify-around">
                <span className="text-xl font-bold cursor-pointer p-1 rounded-lg"
                onClick={()=>{setSection("syllabus")}}
                style={section==="syllabus" ? { backgroundColor: "rgba(0, 157, 255, 0.5)"} : {}}
                > Syllabus </span>
                <span className="text-xl font-bold cursor-pointer p-1 rounded-lg"
                onClick={()=>{setSection("instructors")}}
                style={section==="instructors" ? { backgroundColor: "rgba(0, 157, 255, 0.5)" } : {}}
                > Instructors </span>
                <span className="text-xl font-bold cursor-pointer p-1 rounded-lg"
                onClick={()=>{setSection("progress")}}
                style={section==="progress" ? { backgroundColor: "rgba(0, 157, 255, 0.5)"} : {}}
                > Progress </span>
            </div>


            {
                section==="syllabus"?
                (
                    <div>
                        <h2 className="text-2xl font-bold mt-4">Course Overview</h2>
                        <p className="text-lg mt-4"> {course.description} </p>

                        <h2 className="text-2xl font-bold mt-4 mb-3">Course Outline</h2>
                        <div>
                            {allVideos.map((video, index)=>(
                                <div key={index}
                                className="flex items-center gap-3 text-2xl cursor-pointer mb-1 hover:bg-white/10 p-3"
                                >
                                    {isEnroll && enrollment?.completedVideosIds?.includes(video.id) && (
                                        <SiTicktick className="text-green-500"/>
                                    )}

                                    <MdOutlineOndemandVideo
                                    className="bg-white/10 rounded-lg"
                                    />
                                    <span>{video.order}</span>
                                    <span>{video.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ):(
                    section==="progress"?(
                        <div>
                            {isEnroll? (
                                <div className="text-2xl font-bold my-5">
                                    <h2 className="mb-5">Your Progress</h2>
                                    <div className="w-[80%] h-5 rounded-lg overflow-hidden border border-white ">
                                        <div className=" h-full bg-green-500"
                                        style={{width: `${enrollment.progress}%` }}></div> 
                                    </div><span className="mt-3"> {enrollment.progress}% </span>
                                </div>
                            ):(

                                userRole=="Student"?(
                                    <div className="text-3xl my-9">
                                        Enroll to  see Your progress
                                    </div>
                                ):(
                                    <div className="text-2xl font-bold my-5">
                                        <h2 className="mb-5">Overall Course Progress</h2>
                                        <div className="w-[80%] h-5 rounded-lg overflow-hidden border border-white ">
                                            <div className=" h-full bg-green-500"
                                            style={{width: `${overallProgrss}%` }}></div> 
                                        </div><span className="mt-3"> {overallProgrss}% </span>
                                    </div>
                                )
                            )}
                            
                        </div>
                    ):(
                        <div className="mt-4 pl-3">
                            <span className="text-2xl font-bold">Course Taught by: </span>
                            <div className="text-lg mt-2"> {course.instructors.map((teacher, index)=>(
                                <div> {index+1}. {teacher.fullname} </div>
                            ))} </div>
                            <span className="font-bold text-xl">Difficulty:</span><span className="text-xl"> {course.level} </span>
                        </div>
                    )
                )
            }
            
            
            {
                userRole==="Student"? (
                    <div className="cursor-pointer rounded-xl mt-4 flex justify-center items-center p-4 text-2xl font-bold"
                    style={{backgroundColor:"rgba(0, 153, 255, 1)"}}>
                        <button>{isEnroll?"Continue Learning":"Enroll Now"}</button>
                    </div>
                ):(
                    <div className="gap-y-4 mt-4 flex flex-col justify-center items-center text-2xl font-bold md:flex-row md:justify-around">
                        <button className="cursor-pointer rounded-xl p-4 w-[90%] md:w-[40%]" style={{backgroundColor:"rgba(0, 153, 255, 1)"}}> Add New Video </button>
                        <button className="cursor-pointer rounded-xl p-4 w-[90%] md:w-[40%]" style={{backgroundColor:"rgba(0, 153, 255, 1)"}}> Add New Quiz </button>
                    </div>
                )
            }
            
        </div>
    )
}