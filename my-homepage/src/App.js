// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import PricingPlans from './components/PricingPlans';
import Payment from './components/Payment';
import FindQuestionPage from './components/FindQuestionPage';
import PostPage from './components/PostPage';
import PostWithCodePage from './components/PostWithCodePage';
import ForgotPassword from './components/ForgotPassword';
import ChatRoom from './components/ChatRoom';
import CollaborationRoom from './components/CollaborationRoom';
import VideoPage from './components/VideoPage';
import VideoUpload from './components/VideoUpload';
import ChatGPTAssistant from './components/ChatGPTAssistant';  // Import ChatGPT Assistant
import TwoFactorAuth from './components/TwoFactorAuth';  // Add Two-Factor Auth import
import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = React.useState(null);

  // Track the authenticated user with Firebase Auth
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Header user={user} />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />  {/* Forgot password route */}

        {/* Protected routes */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/plans" element={user ? <PricingPlans /> : <Navigate to="/login" />} />
        <Route path="/payment" element={user ? <Payment /> : <Navigate to="/login" />} />
        <Route path="/find-questions" element={user ? <FindQuestionPage /> : <Navigate to="/login" />} />
        <Route path="/postpage" element={user ? <PostPage /> : <Navigate to="/login" />} />
        <Route path="/post-with-code" element={user ? <PostWithCodePage /> : <Navigate to="/login" />} />
        <Route path="/chatroom/:roomId" element={user ? <ChatRoom user={user.email} /> : <Navigate to="/login" />} />
        <Route path="/collaboration-room/:roomId" element={user ? <CollaborationRoom user={user.email} /> : <Navigate to="/login" />} />
        
        {/* Video-related routes */}
        <Route path="/videos" element={user ? <VideoPage /> : <Navigate to="/login" />} />  {/* Video Viewing Page */}
        <Route path="/upload-video" element={user ? <VideoUpload /> : <Navigate to="/login" />} />  {/* Video Uploading Page */}
        
        {/* ChatGPT Assistant Route */}
        <Route path="/chatgpt-assistant" element={user ? <ChatGPTAssistant /> : <Navigate to="/login" />} />  {/* ChatGPT Assistant Route */}

        {/* Two-Factor Auth Route */}
        <Route path="/two-factor-auth" element={user ? <TwoFactorAuth /> : <Navigate to="/login" />} />  {/* Two-Factor Auth Route */}
        
        {/* Catch-all route: Redirect to login if not found */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
