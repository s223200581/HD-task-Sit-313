// src/components/QuestionCard.js

import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const QuestionCard = ({ question }) => {
  const navigate = useNavigate();

  // Navigate to detailed view when card is clicked
  const handleViewQuestion = () => {
    navigate(`/question/${question.id}`, { state: { question } });
  };

  return (
    <Card>
      <Card.Content>
        <Card.Header>{question.title}</Card.Header>
        <Card.Meta>{question.date}</Card.Meta>
        <Card.Description>{question.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button basic color="blue" onClick={handleViewQuestion}>
          View Question
        </Button>
      </Card.Content>
    </Card>
  );
};

export default QuestionCard;
