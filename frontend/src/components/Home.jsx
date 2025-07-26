import React, { useState } from 'react'
import { FaRegFileWord } from "react-icons/fa";
import axios from 'axios';

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convert,setConvert] = useState("");
  const [downloadError, setDownloadError] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0] || null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   if (!selectedFile) {
      setConvert("Please select a file to convert.");
      return;
    }
    const formData=new FormData();
    formData.append("file", selectedFile);
    try {
      const response=await axios.post("http://localhost:3000/convertFile",formData,{
      responseType:"blob",
      });

      console.log(response.data);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(url);
      const link = document.createElement('a');
      console.log(link);
      link.href = url;
      console.log(link);
      link.setAttribute('download', selectedFile.name.replace(/\.[^/.]+$/, "")+".pdf"); // Change file extension to .pdf
      console.log(link);
      document.body.appendChild(link);
      console.log(link);
      link.click();
      link.parentNode.removeChild(link);
      setSelectedFile(null);
      setDownloadError("");
      setConvert("File converted successfully!");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        
       setDownloadError("Error occured",error.response.data.message);
      }
      else{
        setConvert("");
      }
     
    }
  };

  return (
    <>
      <div className='max-w-screen-2xl mx-auto container px-6 py-3 md:px-40'>
        <div className='flex h-screen items-center justify-center'>
          <div className='flex flex-col items-center border-2 border-dashed px-8 py-10 border-indigo-400 rounded-lg shadow-lg w-full max-w-md'>
            <h1 className='text-4xl font-bold text-center mb-4'>Convert Word to PDF Online</h1>
            <p className='text-base text-center mb-8'>
              Easily convert Word documents to PDF format online, without
              having to install any software.
            </p>
            <label
              htmlFor="fileInput"
              className="cursor-pointer bg-blue-500 text-white px-4 py-6 rounded-lg hover:bg-blue-600 w-full flex items-center justify-center shadow-lg text-2xl font-semibold mb-6"
            >
              <FaRegFileWord className="mr-3 text-3xl" />
              <span className="truncate max-w-[70%] overflow-hidden whitespace-nowrap text-ellipsis">
                {selectedFile ? selectedFile.name : "Choose File"}
              </span>
            </label>
            <input
              type="file"
              accept=".doc,.docx"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={handleSubmit}
              disabled={!selectedFile}
              className={`w-full text-white bg-blue-500 hover:bg-blue-700 duration-300 font-bold px-4 py-2 rounded text-lg
                ${!selectedFile ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Convert File
            </button>
            { convert && ( <div className='text-green-500 text-center'>
              {convert}
            </div>
            )}
           
             { downloadError && ( <div className='text-red-500 text-center'>
              {downloadError}
            </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
