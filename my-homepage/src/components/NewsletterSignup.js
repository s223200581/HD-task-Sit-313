import React from 'react';
import { Input, Button } from 'semantic-ui-react';

const NewsletterSignup = () => (
  <div className="newsletter-signup">
    <h2>SIGN UP FOR OUR DAILY INSIDER</h2>
    <Input action={{ color: 'blue', labelPosition: 'right', icon: 'send', content: 'Subscribe' }} placeholder='Enter your email...' />
  </div>
);

export default NewsletterSignup;
