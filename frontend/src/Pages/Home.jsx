import { useEffect, useState } from "react";
import CourseCard from "../Components/CourseCard.jsx";


export default function Home(){

    const [username, setUsername]=useState("Sarah")
    const [allCourses, setAllCourses]= useState([
        {duration: "6 Month", level: "Beginner", title:"Calculas I", instructors: ["Dr. Gilbert Stang", "Prof. Walter Lewin"], image: "https://study.com/cimages/videopreview/videopreview-full/zdlidyvu1w.jpg"},
        {duration: "6 Month", level: "Beginner", title:"programming", instructors: ["Dr. Gilbert Stang", "Prof. Walter Lewin"], image: "https://study.com/cimages/videopreview/videopreview-full/zdlidyvu1w.jpg"},
        {duration: "6 Month", level: "Beginner", title:"React", instructors: ["Dr. Gilbert Stang", "Prof. Walter Lewin"], image: "https://study.com/cimages/videopreview/videopreview-full/zdlidyvu1w.jpg"},
        {duration: "6 Month", level: "Beginner", title:"Mathematics", instructors: ["Dr. Gilbert Stang", "Prof. Walter Lewin"], image: "https://study.com/cimages/videopreview/videopreview-full/zdlidyvu1w.jpg"},
        {duration: "6 Month", level: "Beginner", title:"NExt.js", instructors: ["Dr. Gilbert Stang", "Prof. Walter Lewin"], image: "https://study.com/cimages/videopreview/videopreview-full/zdlidyvu1w.jpg"},
        {duration: "6 Month", level: "Beginner", title:"Machine Learning", instructors: ["Dr. Gilbert Stang", "Prof. Walter Lewin"], image: "https://study.com/cimages/videopreview/videopreview-full/zdlidyvu1w.jpg"},
        {duration: "6 Month", level: "Advanced", title:"Blockchain", instructors: ["Dr. Gilbert Stang", "Prof. Walter Lewin"], image: "https://study.com/cimages/videopreview/videopreview-full/zdlidyvu1w.jpg"},
    ])

    const [featured, setFeatured]=useState([
        {duration: "6 Month", level: "Beginner", title:"Calculas I", instructors: ["Dr. Gilbert Stang", "Prof. Walter Lewin"], image: "https://study.com/cimages/videopreview/videopreview-full/zdlidyvu1w.jpg"},
        {duration: "6 Month", level: "Beginner", title:"Calculas I", instructors: ["Dr. Gilbert Stang", "Prof. Walter Lewin"], image: "https://study.com/cimages/videopreview/videopreview-full/zdlidyvu1w.jpg"},
        {duration: "6 Month", level: "Beginner", title:"Calculas I", instructors: ["Dr. Gilbert Stang", "Prof. Walter Lewin"], image: "https://study.com/cimages/videopreview/videopreview-full/zdlidyvu1w.jpg"},
    ])

    const [titleSearch, setTitleSearch]=useState("")
    const [searchCourses, setSearchCourses]=useState([])

    useEffect(()=>{

        // generate 3 random value
        const first=Math.floor(Math.random() * allCourses.length-1)
        const second=Math.floor(Math.random() * allCourses.length-1)
        const third=Math.floor(Math.random() * allCourses.length-1)

        setFeatured([allCourses[first], allCourses[second], allCourses[third]])

    }, [allCourses])

    useEffect(()=>{

        if(titleSearch===""){
            setSearchCourses([])
        }

        const filteredCourse= allCourses.filter(course=>course.title.toLowerCase().includes(titleSearch.toLowerCase()))

        setSearchCourses(filteredCourse)

    }, [titleSearch])

    return (
        <div className="w-full p-5">
            <h1 className="text-3xl ml-6 font-bold">Hi, {username} </h1>
            
            <div>
                <h1 className="text-4xl ml-6 font-bold underline text-center mb-8 md:text-5xl">Featured Courses</h1>
                <div className="flex flex-wrap justify-around gap-y-9">
                    {featured.map((course, index)=>(
                        <CourseCard 
                            title={course.title} 
                            duration={course.duration} 
                            level={course.level}
                            instructors={course.instructors}
                            image={course.image}
                            key={index}
                        />
                    ))}
                </div>
            </div>


            <div className="mt-20">
                <div className="flex flex-col items-center mb-9">
                    <h1 className="text-4xl ml-6 font-bold underline mb-8 md:text-5xl">All Courses</h1>
                    <input type="text" placeholder="Search for course"
                        className="w-[90%] border border-white text-xl "
                        onChange={(e)=>{setTitleSearch(e.target.value)}}
                     />
                </div>
                <div className="flex flex-wrap justify-around gap-y-9">
                    {
                        searchCourses.length==0?
                        (allCourses.map((course, index)=>(
                        <CourseCard 
                            title={course.title} 
                            duration={course.duration} 
                            level={course.level}
                            instructors={course.instructors}
                            image={course.image}
                            key={index}
                        />
                    ))):(
                        searchCourses.map((course, index)=>(
                        <CourseCard 
                            title={course.title} 
                            duration={course.duration} 
                            level={course.level}
                            instructors={course.instructors}
                            image={course.image}
                            key={index}
                        />
                    ))
                    )
                    
                    }
                </div>
            </div>
        </div>
    )
}