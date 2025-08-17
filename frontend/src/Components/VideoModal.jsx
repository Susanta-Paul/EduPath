import { useState } from 'react';
import Modal from 'react-modal';
import apiRequest from './ApiRequest';
import { useNavigate } from 'react-router-dom';

export default function VideoModal({modalIsOpen, afterOpenModal, closeModal, courseId, order}){

    const [title, setTitle] = useState("");
    const [video, setVideo] = useState(null);
    const [uploading, setUploading] = useState(false);
    const navigate=useNavigate()

    const handleSubmit = async (e) => {
        setUploading(true)
        e.preventDefault();

        if (!video) {
        alert("Please select a video");
        return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("video", video);
        formData.append("course", courseId);
        formData.append("order", order);

        try {

            const response=await apiRequest("post", "/instructor/uploadvideo", formData)

            console.log(response.data)

            alert("video Successfully uploaded")
            navigate("/mycourses")
        
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#ef4444", // Tailwind red-500
            padding: "2rem",
            width: "50%", // lg:w-1/2 equivalent
            borderRadius: "0.5rem",
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // dark overlay
        },
    };




    return (
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="fixed inset-0 bg-white/10 bg-opacity-50 flex items-center justify-center"
        className="bg-black h-auto w-[90%] lg:w-1/2 p-9 rounded-lg"
      >
        <div className='flex text-xl justify-around md:text-3xl'>
            <div className='font-bold underline text-white'>Add New Video</div>
            <button className='font-bold p-3 bg-gray-500 text-white rounded-lg cursor-pointer' onClick={closeModal} >Close</button>
        </div>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
            <div className='text-white mb-4 flex flex-col gap-4 lg:flex-row'>
                <label className='font-bold text-xl'>Title of the Video</label>
                <input
                type="text"
                placeholder="Enter title"
                value={title}
                required
                className='border border-white'
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className='text-white  flex flex-col gap-4 lg:flex-row'>
                <label className='font-bold text-xl'>Upload the Video File</label>
                <input
                type="file"
                accept="video/*"
                required
                onChange={(e) => setVideo(e.target.files[0])}
                />
            </div>
            <button className='cursor-pointer font-bold bg-blue-400 p-3 rounded-lg mt-4'
            disabled={uploading}
            > {uploading? "Uploading...": "Upload"} </button>
        </form>
      </Modal>
    )
}