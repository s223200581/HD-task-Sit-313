import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import ArticleCard from './ArticleCard';

const articles = [
  { id: 1, title: 'Article 1', image: 'https://picsum.photos/200', description: 'React or Vue', author: 'Author 1', rating: 5 },
  { id: 2, title: 'Article 2', image: 'https://picsum.photos/201', description: 'NodeJS', author: 'Author 2', rating: 4.5 },
  { id: 3, title: 'Article 3', image: 'https://picsum.photos/202', description: 'React Hooks', author: 'Author 3', rating: 4 },
];

const FeaturedArticles = () => (
  <div className="featured-section">
    <h2>Featured Articles</h2>
    <Grid columns={3} doubling>
      {articles.map((article) => (
        <Grid.Column key={article.id}>
          <ArticleCard article={article} />
        </Grid.Column>
      ))}
    </Grid>
    <Button secondary className="see-all-button">See all articles</Button>
  </div>
);

export default FeaturedArticles;
