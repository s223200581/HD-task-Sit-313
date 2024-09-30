// src/components/ImageUpload.js
import React, { useState } from 'react';
import { Button, Input } from 'semantic-ui-react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase/firebaseConfig';
import './ImageUpload.css';  // Import custom CSS for styling

const ImageUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [filename, setFilename] = useState('');  // To display the selected file name

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilename(selectedFile.name);  // Update filename
    }
  };

  const handleUpload = () => {
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      }, 
      (error) => {
        console.error('Upload failed:', error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          onUploadComplete(downloadURL);  // Pass the download URL to the parent component
        });
      }
    );
  };

  return (
    <div className="image-upload">
      <label>Add an image:</label>
      <div className="image-upload-container">
        <Input
          type="text"
          value={filename}
          placeholder="No file selected"
          readOnly
          className="file-name-input"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          id="file-upload"
          hidden
        />
        <label htmlFor="file-upload">
          <Button content="Browse" as="span" />
        </label>
        <Button onClick={handleUpload} primary disabled={!file}>Upload</Button>
      </div>
      {progress > 0 && <p>Upload progress: {progress}%</p>}
    </div>
  );
};

export default ImageUpload;
