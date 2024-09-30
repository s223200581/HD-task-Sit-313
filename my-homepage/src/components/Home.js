import React from 'react';
import FeaturedArticles from './FeaturedArticles';
import FeaturedTutorials from './FeaturedTutorials';
import NewsletterSignup from './NewsletterSignup';
import { Container } from 'semantic-ui-react';

const Home = () => {
  return (
    <div>
      {/* Main container for the homepage */}
      <Container style={{ paddingTop: '7em' }}>
        {/* Featured Articles Section */}
        <FeaturedArticles />
        
        {/* Featured Tutorials Section */}
        <FeaturedTutorials />
        
        {/* Newsletter Signup Section */}
        <NewsletterSignup />
      </Container>
    </div>
  );
};

export default Home;
