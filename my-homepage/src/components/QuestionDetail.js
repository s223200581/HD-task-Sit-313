// src/components/QuestionDetail.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Header, List } from 'semantic-ui-react';

const QuestionDetail = () => {
  const location = useLocation();
  const { question } = location.state;  // Get question data from route state

  return (
    <div style={{ padding: '2rem' }}>
      <Header as="h1" textAlign="center">{question.title}</Header>
      <Card fluid>
        <Card.Content>
          <Card.Meta>{question.date}</Card.Meta>
          <Card.Description>{question.description}</Card.Description>
        </Card.Content>
      </Card>

      <Header as="h3" style={{ marginTop: '2rem' }}>Responses:</Header>
      <List>
        {question.responses?.map((response, index) => (
          <List.Item key={index}>
            <Card fluid>
              <Card.Content>
                <Card.Meta>{response.date}</Card.Meta>
                <Card.Description>{response.text}</Card.Description>
              </Card.Content>
            </Card>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default QuestionDetail;
