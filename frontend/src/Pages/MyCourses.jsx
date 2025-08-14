import { useEffect, useState } from "react";
import CourseCard from "../Components/CourseCard.jsx";

export default function MyCourses() {
  const [myCourses, setMyCourses] = useState([
    { courseName: "derr", duration: "Month", level: "veg", instructors: ["dr. stang"], image: "" } ,
    { courseName: "math", duration: "2 Month", level: "non-veg", instructors: ["dr. stang"], image: "" } ,
    { courseName: "science", duration: "3 Month", level: "veg", instructors: ["dr. stang"], image: "" },
  ]);

  const [titleSearch, setTitleSearch] = useState("");
  const [searchCourses, setSearchCourses] = useState([]);

  useEffect(() => {
    if (titleSearch.trim() === "") {
      setSearchCourses([]);
      return;
    }

    const filteredCourse = myCourses.filter((course) =>
      course?.courseName?.toLowerCase().includes(titleSearch.toLowerCase())
    );

    setSearchCourses(filteredCourse);
  }, [titleSearch, myCourses]);

  const coursesToShow = titleSearch.trim() === "" ? myCourses : searchCourses;

  return (
    <div className="mt-20">
      <div className="flex flex-col items-center mb-9">
        <h1 className="text-4xl ml-6 font-bold underline mb-8 md:text-5xl">
          All Courses created By You
        </h1>
        <div className="flex flex-col items-center gap-y-5 w-full md:flex-row md:justify-around">
          <input
            type="text"
            placeholder="Search for course"
            className="w-[90%] border border-white text-xl md:w-[50%] "
            onChange={(e) => setTitleSearch(e.target.value)}
          />
          <button className="text-xl font-bold bg-blue-400 p-2 rounded-lg cursor-pointer">Create New Course</button>
        </div>
        
      </div>

      <div className="flex flex-wrap justify-around gap-y-9">
        {coursesToShow.length > 0 ? (
          coursesToShow.map((course, index) => (
            <CourseCard
              title={course.courseName}
              duration={course.duration}
              level={course.level}
              instructors={course.instructors}
              image={course.image}
              key={index}
            />
          ))
        ) : (
          <p className="text-lg text-gray-400 mt-5">No courses found.</p>
        )}
      </div>
    </div>
  );
}
