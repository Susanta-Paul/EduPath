import { useEffect, useState } from "react";
import CourseCard from "../Components/CourseCard.jsx";

export default function MyEnrollment() {
  const [myEnrollment, setMyEnrollment] = useState([
    { course: { courseName: "derr", duration: "Month", level: "veg", instructors: ["dr. stang"], image: "" } },
    { course: { courseName: "math", duration: "2 Month", level: "non-veg", instructors: ["dr. stang"], image: "" } },
    { course: { courseName: "science", duration: "3 Month", level: "veg", instructors: ["dr. stang"], image: "" } },
  ]);

  const [titleSearch, setTitleSearch] = useState("");
  const [searchCourses, setSearchCourses] = useState([]);

  useEffect(() => {
    if (titleSearch.trim() === "") {
      setSearchCourses([]);
      return;
    }

    const filteredCourse = myEnrollment.filter((enroll) =>
      enroll?.course?.courseName?.toLowerCase().includes(titleSearch.toLowerCase())
    );

    setSearchCourses(filteredCourse);
  }, [titleSearch, myEnrollment]);

  const coursesToShow = titleSearch.trim() === "" ? myEnrollment : searchCourses;

  return (
    <div className="mt-20">
      <div className="flex flex-col items-center mb-9">
        <h1 className="text-4xl ml-6 font-bold underline mb-8 md:text-5xl">
          All Your Enrolled Courses
        </h1>
        <input
          type="text"
          placeholder="Search for course"
          className="w-[90%] border border-white text-xl"
          onChange={(e) => setTitleSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-around gap-y-9">
        {coursesToShow.length > 0 ? (
          coursesToShow.map((enroll, index) => (
            <CourseCard
              title={enroll?.course.courseName}
              duration={enroll?.course.duration}
              level={enroll?.course.level}
              instructors={enroll?.course.instructors}
              image={enroll?.course.image}
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
