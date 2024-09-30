// src/components/TutorialDetail.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Header, List } from 'semantic-ui-react';

const TutorialDetail = () => {
  const location = useLocation();
  const { tutorial } = location.state;  // Get tutorial data from route state

  return (
    <div style={{ padding: '2rem' }}>
      <Header as="h1" textAlign="center">{tutorial.title}</Header>
      <Card fluid>
        <Card.Content>
          <Card.Meta>{tutorial.date}</Card.Meta>
          <Card.Description>{tutorial.content}</Card.Description>
        </Card.Content>
      </Card>

      <Header as="h3" style={{ marginTop: '2rem' }}>Comments:</Header>
      <List>
        {tutorial.comments?.map((comment, index) => (
          <List.Item key={index}>
            <Card fluid>
              <Card.Content>
                <Card.Meta>{comment.date}</Card.Meta>
                <Card.Description>{comment.text}</Card.Description>
              </Card.Content>
            </Card>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default TutorialDetail;
