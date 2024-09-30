import React, { useState } from 'react';
import { storage, db } from '../firebase/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import './VideoUpload.css'; // Create a CSS file for styling

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!videoFile || !name || !topic || !description) {
      alert('Please fill all the details and select a video to upload.');
      return;
    }

    const storageRef = ref(storage, `videos/${videoFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, videoFile);

    uploadTask.on(
      'state_changed',
      snapshot => {
        setUploading(true);
      },
      error => {
        console.error('Upload error:', error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, 'videos'), {
          name: name,
          topic: topic,
          description: description,
          url: downloadURL,
          views: 0,
          rating: 0,
          createdAt: serverTimestamp(), // Automatically adds the current timestamp
        });
        setUploading(false);
        setVideoFile(null);
        setName('');
        setTopic('');
        setDescription('');
        alert('Video uploaded successfully');
      }
    );
  };

  return (
    <div className="video-upload">
      <h2>Upload Demo Video</h2>
      <form className="upload-form">
        <input 
          type="text" 
          placeholder="Your Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Topic" 
          value={topic} 
          onChange={(e) => setTopic(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!videoFile || uploading}>
          {uploading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  );
};

export default VideoUpload;
