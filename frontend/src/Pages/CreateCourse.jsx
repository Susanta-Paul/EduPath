export default function CreateCourse() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-6 sm:p-10">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Create New Course
        </h1>

        <form className="space-y-5">
          {/* Course Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Name
            </label>
            <input
              type="text"
              placeholder="Enter course name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Write a short description"
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            ></textarea>
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Level
            </label>
            <select
              className="w-full border text-black font-bold border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Select level
              </option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="cursor-pointer w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
