import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import reportImg from './../assets/DashboardImg/Report.png'; // Ensure this path is correct

const Dashboardsection = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [prediction, setPrediction] = useState(null);  // Added state for prediction

  // Handle dropzone file drop
  const onDrop = useCallback(
    acceptedFiles => {
      setIsDraggingOver(false);
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setUploadedFile(file);
        // Simulate upload progress
        setIsUploading(true);
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            console.log('File uploaded:', file);
          }
        }, 300);
      }
    },
    [],
  );

  const handleGenerateReport = async () => {
    if (!uploadedFile) {
      alert('Please upload an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      setIsUploading(true);
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend returned an error:", errorData);
        alert("Backend Error: " + (errorData.error || "Unknown error"));
        return;
      }

      const result = await response.json();
      console.log('Prediction result:', result);
      setPrediction(result.prediction); // Update prediction state
      alert(`Prediction: ${result.prediction}`);
    } catch (error) {
      console.error("Network or other error while making prediction:", error);
      alert("Something went wrong while giving prediction.");
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/jpg',
    maxFiles: 1,
    onDragEnter: () => setIsDraggingOver(true),
    onDragLeave: () => setIsDraggingOver(false),
  });

  return (
    <div className="bg-white py-10 px-6 md:px-20">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Upload Image of affected part of skin:</h2>

      <div className="flex flex-col md:flex-row items-start md:space-x-10">
        {/* Left Side - Upload Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed border-gray-300 rounded-md p-10 text-center cursor-pointer transition duration-300 ease-in-out ${isDraggingOver ? 'bg-gray-50 border-green-500' : 'bg-white'}`}
        >
          <input {...getInputProps()} />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <p className="text-gray-700">{isDragActive ? 'Drop it here...' : 'Drag and Drop Files or Browse'}</p>
          <p className="text-gray-500 text-sm">(Only jpg, jpeg, png supported)</p>
        </div>

        {/* Right Side - Report Image */}
        <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center items-center">
          <div className="relative w-100 h-100 rounded-md overflow-hidden shadow-md">
            <img src={reportImg} alt="Report Illustration" className="absolute inset-0 w-full h-full object-contain" />
          </div>
        </div>
      </div>

      {/* Generate Report Button */}
      <div className="mt-4">
        <button onClick={handleGenerateReport} className={`bg-green-500 text-white py-3 px-6 mt-[-30px] rounded-lg transition-all duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`} disabled={!uploadedFile || isUploading}>
          GENERATE REPORT
        </button>
      </div>

      {/* Display Prediction */}
      {prediction && (
        <div className="mt-8">
          <p className="text-gray-700">Prediction: {prediction}</p>
        </div>
      )}

      {/* Uploading Progress */}
      {isUploading && (
        <div className="mt-8">
          <p className="text-gray-700 mb-2">Uploading...</p>
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-green-500 h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${uploadProgress}%` }}></div>
          </div>
          <p className="text-gray-500 text-sm mt-1">{uploadProgress}%</p>
        </div>
      )}

      {/* Uploaded File Info */}
      {uploadedFile && !isUploading && (
        <div className="mt-8">
          <p className="text-gray-700">Uploaded File: {uploadedFile.name}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboardsection;