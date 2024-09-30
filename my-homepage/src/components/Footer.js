// src/components/Footer.js

import React from 'react';
import { Container, Grid, Segment, List, Header, Icon } from 'semantic-ui-react';

const Footer = () => {
  return (
    <Segment inverted vertical style={{ padding: '2em 0em', marginTop: '2em', textAlign: 'center' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={4}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a' href='/sitemap'>Sitemap</List.Item>
                <List.Item as='a' href='/contact'>Contact Us</List.Item>
                <List.Item as='a' href='/terms'>Terms and Conditions</List.Item>
                <List.Item as='a' href='/privacy'>Privacy Policy</List.Item>
              </List>
            </Grid.Column>

            <Grid.Column width={4}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a' href='/services/web-development'>Web Development</List.Item>
                <List.Item as='a' href='/services/mobile-development'>Mobile Development</List.Item>
                <List.Item as='a' href='/services/cloud-computing'>Cloud Computing</List.Item>
                <List.Item as='a' href='/services/data-analysis'>Data Analysis</List.Item>
              </List>
            </Grid.Column>

            <Grid.Column width={4}>
              <Header inverted as='h4' content='Contact' />
              <List link inverted>
                <List.Item as='a' href='mailto:support@devdeakin.com'>
                  <Icon name='mail' /> support@devdeakin.com
                </List.Item>
                <List.Item as='a' href='tel:+1234567890'>
                  <Icon name='phone' /> +1 (123) 456-7890
                </List.Item>
                <List.Item as='a' href='https://maps.google.com/?q=123+Deakin+St,+Melbourne,+VIC,+Australia' target='_blank'>
                  <Icon name='map marker alternate' /> 123 Deakin St, Melbourne, VIC, Australia
                </List.Item>
              </List>
            </Grid.Column>

            <Grid.Column width={4}>
              <Header inverted as='h4' content='Follow Us' />
              <List link inverted>
                <List.Item as='a' href='https://www.facebook.com' target='_blank'>
                  <Icon name='facebook' /> Facebook
                </List.Item>
                <List.Item as='a' href='https://www.twitter.com' target='_blank'>
                  <Icon name='twitter' /> Twitter
                </List.Item>
                <List.Item as='a' href='https://www.linkedin.com' target='_blank'>
                  <Icon name='linkedin' /> LinkedIn
                </List.Item>
                <List.Item as='a' href='https://www.instagram.com' target='_blank'>
                  <Icon name='instagram' /> Instagram
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};

export default Footer;
