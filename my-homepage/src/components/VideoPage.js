// src/components/VideoPage.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import './VideoPage.css'; // Create a CSS file for styling

const VideoPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videoCollection = collection(db, 'videos');
      const videoSnapshot = await getDocs(videoCollection);
      const videoList = videoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVideos(videoList);
    };

    fetchVideos();
  }, []);

  const incrementViewCount = async (videoId, currentViews) => {
    const videoRef = doc(db, 'videos', videoId);
    await updateDoc(videoRef, { views: currentViews + 1 });
  };

  const rateVideo = async (videoId, rating) => {
    const videoRef = doc(db, 'videos', videoId);
    await updateDoc(videoRef, { rating });
  };

  return (
    <div className="video-page">
      <h2>Demo Videos</h2>
      <div className="video-list">
        {videos.map(video => (
          <div key={video.id} className="video-card">
            <video
              src={video.url}
              controls
              onPlay={() => incrementViewCount(video.id, video.views)}
              width="400"
            />
            <p>Views: {video.views}</p>
            <p>Rating: {video.rating ? video.rating : 'No ratings yet'}</p>
            <div>
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} onClick={() => rateVideo(video.id, star)}>
                  {star} ★
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPage;
