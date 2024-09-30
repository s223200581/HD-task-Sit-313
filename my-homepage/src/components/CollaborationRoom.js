// src/components/CollaborationRoom.js
import React, { useState, useEffect } from 'react';
import ChatRoom from './ChatRoom';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const CollaborationRoom = ({ roomId }) => {
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      const roomRef = doc(db, 'rooms', roomId);
      const roomSnap = await getDoc(roomRef);
      if (roomSnap.exists()) {
        setRoomData(roomSnap.data());
      }
    };
    fetchRoomData();
  }, [roomId]);

  return (
    <div className="collaboration-room">
      {roomData && (
        <>
          <h2>{roomData.name}</h2>
          <ChatRoom roomId={roomId} />
        </>
      )}
    </div>
  );
};

export default CollaborationRoom;
