import React from 'react';
import { Card, Text, Layout } from '@ui-kitten/components';

const CardComponent = ({ title, content, author, date, time }) => {
  const Header = (props) => (
    <Layout {...props}>
      <Text category="h4">{title}</Text>
      <Text category="label">By {author}</Text>
    </Layout>
  );

  const Footer = (props) => (
    <Layout {...props}>
      <Text category="s2">
        {time} hrs on {date}
      </Text>
    </Layout>
  );

  return (
    <Card
      style={{ marginBottom: 6 }}
      disabled={true}
      header={Header}
      footer={Footer}>
      <Text category="p1">{content}</Text>
    </Card>
  );
};

export default CardComponent;
