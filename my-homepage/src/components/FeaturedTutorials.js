import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import TutorialCard from './TutorialCard';

const tutorials = [
  { id: 1, title: 'Tutorial 1', image: 'https://picsum.photos/203', description: 'Jest', username: 'user1', rating: 5 },
  { id: 2, title: 'Tutorial 2', image: 'https://picsum.photos/204', description: 'React Router', username: 'user2', rating: 4.5 },
  { id: 3, title: 'Tutorial 3', image: 'https://picsum.photos/205', description: 'Express', username: 'user3', rating: 4.9 },
];

const FeaturedTutorials = () => (
  <div className="featured-section">
    <h2>Featured Tutorials</h2>
    <Grid columns={3} doubling>
      {tutorials.map((tutorial) => (
        <Grid.Column key={tutorial.id}>
          <TutorialCard tutorial={tutorial} />
        </Grid.Column>
      ))}
    </Grid>
    <Button secondary className="see-all-button">See all tutorials</Button>
  </div>
);

export default FeaturedTutorials;
