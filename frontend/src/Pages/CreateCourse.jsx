import { useState } from "react"
import apiRequest from "../Components/ApiRequest.js"
import {useNavigate} from "react-router-dom"

export default function CreateCourse() {

  const [error, setError]=useState("")
  const navigate=useNavigate()
  const [isUploading, setIsUploading]=useState(false)

  async function handleUpload(e) {

    setIsUploading(true)

    e.preventDefault()

    const image = e.target.image.files[0]
    const courseName = e.target.courseName.value.trim()
    const description = e.target.description.value.trim()
    const level = e.target.level.value
    const duration = e.target.duration.value
    const unit = e.target.unit.value

    if (!courseName || !description || !level || !image || !duration || !unit ) {
      alert("Please fill all fields and upload an image")
      return
    }

    const formData = new FormData()
    formData.append("image", image)
    formData.append("courseName", courseName)
    formData.append("description", description)
    formData.append("level", level)
    formData.append("duration", duration)
    formData.append("unit", unit)
    formData.append("instructors[]", localStorage.getItem("userId"))

    try {
      const response= await apiRequest("post", "/instructor/createcourse", formData )

      if(response.status==201){
        console.log(response.data)
        alert("Course Successfully createad")
        navigate("/mycourses")
      }

    } catch (error) {
      console.error(error)
      if(error.status==400){
          setError(error.response?.data?.errors[0].msg)
      }else{
          setError(`${error.response?.data?.errors}. Try Agin`)
      }
    }finally{
      setIsUploading(false)
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-6 sm:p-10">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Create New Course
        </h1>

        <form className="space-y-5 text-black" onSubmit={(e)=>handleUpload(e)} >
          {/* Course Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Name
            </label>
            <input
              type="text"
              placeholder="Enter course name"
              name="courseName"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Write a short description"
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Duration
          </label>
          <div className="flex items-center">
            <div>
              <input
                type="number"
                name="duration"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <select
              name="unit"
              className="w-full border text-black font-bold border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Select Unit
              </option>
              <option value="Hours">Hours</option>
              <option value="Days">Days</option>
              <option value="Months">Months</option>
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Level
            </label>
            <select
              name="level"
              className="w-full border text-black font-bold border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Select level
              </option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Submit Button */}

          <div className="text-xl text-red-500" >{error}</div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={isUploading}
              className="cursor-pointer w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all"
            >
              {isUploading?"Creating...":"Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
