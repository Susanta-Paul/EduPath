import { useEffect, useState } from "react";
import CourseCard from "../Components/CourseCard.jsx";
import apiRequest from "../Components/ApiRequest.js"


export default function Home(){

    const [username, setUsername]=useState(localStorage.getItem("username"))
    const [allCourses, setAllCourses]= useState([])

    const [featured, setFeatured]=useState([])

    const [titleSearch, setTitleSearch]=useState("")
    const [searchCourses, setSearchCourses]=useState([])

    useEffect(()=>{
        async function browseCourses(){

            try {
                const response = await apiRequest("get", "/user/allcourses" )
                console.log(response.data)
                setAllCourses(response.data.allCourses)
            } catch (error) {
                console.error("some error occur", error)
            }

        }
        browseCourses()
    },[])

    useEffect(()=>{

        if(allCourses.length==0){
            return
        }

        // generate 3 random value
        const first = Math.floor(Math.random() * (allCourses.length - 1));
        const second = Math.floor(Math.random() * (allCourses.length - 1));
        const third = Math.floor(Math.random() * (allCourses.length - 1));


        setFeatured([allCourses[first], allCourses[second], allCourses[third]])

    }, [allCourses])

    useEffect(()=>{

        if(titleSearch===""){
            setSearchCourses([])
        }

        const filteredCourse= allCourses.filter(course=>course.courseName.toLowerCase().includes(titleSearch.toLowerCase()))

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
                            id={course._id}
                            title={course.courseName} 
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
                            title={course.courseName} 
                            duration={course.duration} 
                            level={course.level}
                            instructors={course.instructors}
                            image={course.image}
                            id={course._id}
                            key={index}
                        />
                    ))):(
                        searchCourses.map((course, index)=>(
                        <CourseCard 
                            id={course._id}
                            title={course.courseName} 
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