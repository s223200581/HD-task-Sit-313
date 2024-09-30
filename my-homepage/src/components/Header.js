// src/components/Header.js
import React from 'react';
import { Menu, Container, Icon, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase/firebaseConfig';  // Import Firebase auth and Google provider
import { signOut, signInWithPopup } from 'firebase/auth';  // Firebase signOut and Google login functions

const Header = ({ user }) => {
  const navigate = useNavigate();

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);  // Google sign-in
      alert('Logged in with Google successfully');
      navigate('/');  // Redirect to home page
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth);  // Sign the user out
      navigate('/login');  // Redirect to login page after signing out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header onClick={() => navigate('/')}>
          <Icon name='code' size='large' />
          DEV@Deakin 2024
        </Menu.Item>

        {/* Other Menu Items */}
        <Menu.Item name='home' onClick={() => navigate('/')} />
        <Menu.Item name='find-questions' onClick={() => navigate('/find-questions')} />

        {/* 'Post' Menu Item */}
        <Menu.Item name='post' onClick={() => navigate('/postpage')} />

        {/* 'Post with Code' Menu Item */}
        <Menu.Item name='post-with-code' onClick={() => navigate('/post-with-code')} />

        {/* Chat Room Menu Item */}
        {user && (
          <Menu.Item name='chat' onClick={() => navigate(`/chatroom/general`)}>
            Chat
          </Menu.Item>
        )}

        {/* Pricing Plans Menu Item */}
        <Menu.Item name='plans' onClick={() => navigate('/plans')} />

        {/* Video Pages */}
        <Menu.Item name='videos' onClick={() => navigate('/videos')}>
          Videos
        </Menu.Item>
        <Menu.Item name='upload-video' onClick={() => navigate('/upload-video')}>
          Upload Video
        </Menu.Item>

        {/* ChatGPT Assistant Menu Item */}
        <Menu.Item name="chatgpt-assistant" onClick={() => navigate('/chatgpt-assistant')}>
          ChatGPT Assistant
        </Menu.Item>

        {/* Two-Factor Auth Menu Item */}
        <Menu.Item name="two-factor-auth" onClick={() => navigate('/two-factor-auth')}>
          Two-Factor Auth
        </Menu.Item>

        {/* Google Login and Sign-out functionality */}
        {user ? (
          <Menu.Menu position='right'>
            {/* Sign Out Button */}
            <Menu.Item>
              <Button color='red' onClick={handleSignOut}>
                Sign Out
              </Button>
            </Menu.Item>
          </Menu.Menu>
        ) : (
          <Menu.Menu position='right'>
            {/* Google Login Button */}
            <Menu.Item>
              <Button color='google plus' onClick={handleGoogleSignIn}>
                Login with Google
              </Button>
            </Menu.Item>
            {/* Sign-in and Signup options */}
            <Menu.Item name='login' onClick={() => navigate('/login')} />
            <Menu.Item name='signup' onClick={() => navigate('/signup')} />
          </Menu.Menu>
        )}
      </Container>
    </Menu>
  );
};

export default Header;
