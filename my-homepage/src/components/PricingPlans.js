// src/components/PricingPlans.js
import React from 'react';
import { Grid, Card, Button, Icon, Header } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import './PricingPlans.css';

const PricingPlans = () => {
  const navigate = useNavigate();

  const handlePremiumSelection = (plan) => {
    // Redirect to the payment form with the selected plan information
    navigate('/payment', { state: { selectedPlan: plan } });
  };

  const plans = [
    {
      name: 'Free Plan',
      price: 'Free',
      description: [
        'Basic Post and Question features',
        'Community support',
      ],
      buttonLabel: 'Selected',
      buttonDisabled: true,
      icon: 'check circle',
      color: 'grey',
    },
    {
      name: 'Premium Plan - Basic',
      price: '$9.99/month',
      description: [
        'Customization (messages, banners, themes)',
        'Content controls & admin features',
        'Analytics Dashboard',
        '24/7 priority support',
      ],
      buttonLabel: 'Select Premium Basic',
      buttonDisabled: false,
      icon: 'star',
      color: 'yellow',
    },
    {
      name: 'Premium Plan - Advanced',
      price: '$19.99/month',
      description: [
        'All features of Basic',
        'Advanced Analytics',
        'Priority 1-on-1 support',
        'Personalized assistance',
      ],
      buttonLabel: 'Select Premium Advanced',
      buttonDisabled: false,
      icon: 'gem',
      color: 'blue',
    },
    {
      name: 'Premium Plan - Pro',
      price: '$29.99/month',
      description: [
        'All features of Advanced',
        'Dedicated Account Manager',
        'Custom Integrations',
        'Priority Response Time',
      ],
      buttonLabel: 'Select Premium Pro',
      buttonDisabled: false,
      icon: 'rocket',
      color: 'blue',
    }
  ];

  return (
    <div className="pricing-container">
      <Header as="h1" textAlign="center" className="pricing-header">
        Choose Your Plan
      </Header>
      <Grid container stackable columns={4} centered>
        {plans.map((plan, index) => (
          <Grid.Column key={index}>
            <Card centered className={`pricing-card ${plan.buttonDisabled ? 'selected-plan' : ''}`}>
              <Card.Content>
                <Icon name={plan.icon} size='huge' color={plan.color} />
                <Card.Header className="plan-name">{plan.name}</Card.Header>
                <Card.Meta className="plan-price">{plan.price}</Card.Meta>
                <Card.Description>
                  <ul className="plan-description">
                    {plan.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button 
                  fluid 
                  color={plan.color} 
                  disabled={plan.buttonDisabled} 
                  onClick={() => !plan.buttonDisabled && handlePremiumSelection(plan.name)}
                >
                  {plan.buttonLabel}
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

export default PricingPlans;
