import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';

const TutorialCard = ({ tutorial }) => (
  <Card>
    <Image src={tutorial.image} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{tutorial.title}</Card.Header>
      <Card.Meta>{tutorial.description}</Card.Meta>
      <Card.Description>
        <Icon name="star" /> {tutorial.rating} <span>Username: {tutorial.username}</span>
      </Card.Description>
    </Card.Content>
  </Card>
);

export default TutorialCard;
