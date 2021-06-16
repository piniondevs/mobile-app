import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Layout, Button, Input, Text } from '@ui-kitten/components';
import { Formik } from 'formik';
import Constants from 'expo-constants';
import * as yup from 'yup';

const OpinionForm = ({ submitHandler, onCancel }) => {
  let schema = yup.object().shape({
    title: yup.string().required().min(2),
    author: yup.string().required(),
    content: yup.string().required().min(2),
  });

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={{ marginBottom: 10 }}>
        New Todo
      </Text>
      <Formik
        validationSchema={schema}
        initialValues={{ title: '', author: '', content: '' }}
        onSubmit={submitHandler}>
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
          return (
            <Layout>
              <Input
                style={{ marginBottom: 10 }}
                size="large"
                placeholder="Enter Title"
                value={values.title}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
              />
              <Text status="danger" style={{ alignSelf: 'center' }}>
                {errors.title}
              </Text>
              <Input
                style={{ marginBottom: 10 }}
                size="large"
                placeholder="Your Name"
                value={values.author}
                onChangeText={handleChange('author')}
                onBlur={handleBlur('author')}
              />
              <Text status="danger" style={{ alignSelf: 'center' }}>
                {errors.author}
              </Text>
              <Input
                style={{ marginBottom: 10 }}
                size="large"
                placeholder="Give your opinion"
                value={values.content}
                multiline={true}
                numberOfLines={8}
                onChangeText={handleChange('content')}
                onBlur={handleBlur('content')}
              />
              <Text status="danger" style={{ alignSelf: 'center' }}>
                {errors.content}
              </Text>
              <Button
                status="success"
                onPress={handleSubmit}
                style={{ marginBottom: 5 }}>
                ADD
              </Button>
              <Button status="danger" onPress={onCancel}>
                CANCEL
              </Button>
            </Layout>
          );
        }}
      </Formik>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? Constants.statusBarHeight : null,
    flex: 1,
    padding: 10,
  },
});

export default OpinionForm;
