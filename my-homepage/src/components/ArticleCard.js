import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';

const ArticleCard = ({ article }) => (
  <Card>
    <Image src={article.image} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{article.title}</Card.Header>
      <Card.Meta>{article.description}</Card.Meta>
      <Card.Description>
        <Icon name="star" /> {article.rating} <span>Author's name: {article.author}</span>
      </Card.Description>
    </Card.Content>
  </Card>
);

export default ArticleCard;
