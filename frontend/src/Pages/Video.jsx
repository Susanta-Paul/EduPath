import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../Components/VideoPlayer";

export default function Video() {
  const { videoId } = useParams();

  const [video, setVideo] = useState({
    title: "FIRST VIDEO",
    course: {courseName: "Introduction to programming"},
    order: 1,
    views: 10000,
    publicUrl: {
      fileId: "Kuch bhi",
      url: "https://ik.imagekit.io/susanta80/1755414045688-14175507_3840_2160_30fps_L-qtvw9kS.mp4?tr=orig",
      name: "Patah nahi ",
    },
  });

  const [allComments, setAllComments] = useState([
    {
      username: "Alex",
      content: "Great Video !",
      video: "mongoID",
      createdAt: "2 hours ago",
    },
    {
      username: "Sam",
      content: "Thanks for the explanation 🙌",
      video: "mongoID",
      createdAt: "1 hour ago",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setAllComments([
      ...allComments,
      {
        username: "You",
        content: newComment,
        video: videoId,
        createdAt: "Just now",
      },
    ]);
    setNewComment("");
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#121212] text-white p-4">
        {/* Video Player */}
        <VideoPlayer />

      {/* Video Info */}
      <div className="w-full max-w-4xl mt-4 p-4 bg-[#1e1e1e] shadow rounded-xl">
        <h1 className="text-xl sm:text-2xl font-semibold">{video.course.courseName}: {video.title}</h1>
        <p className="text-gray-400 mt-1">
          {video.views.toLocaleString()} views
        </p>
      </div>

      {/* Comments Section */}
      <div className="w-full max-w-4xl mt-6 p-4 bg-[#1e1e1e] shadow rounded-xl">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Comments</h2>

        {/* Add Comment */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 p-2 rounded-lg bg-[#2c2c2c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Post
          </button>
        </div>

        {/* Show Comments */}
        <div className="space-y-3">
          {allComments.map((comment, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#2c2c2c] rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <span className="font-semibold text-blue-400">
                  {comment.username}
                </span>
                <p className="text-gray-200">{comment.content}</p>
              </div>
              <span className="text-gray-400 text-sm">{comment.createdAt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
