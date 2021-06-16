import React from 'react';
import { StyleSheet, FlatList, Modal } from 'react-native';
import { Layout, Text, Spinner } from '@ui-kitten/components';
import axios from 'axios';

import TopBar from './components/TopBar';
import CardComponent from './components/CardComponent';
import OpinionForm from './components/OpinionForm';

function Main() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  const getOpinions = () => {
    setLoading(true);
    axios
      .get('https://trash-opinons.herokuapp.com/get-opinions')
      .then((res) => {
        setData(res.data.reverse());
        setLoading(false);
      })
      .catch(console.error);
  };

  const addOpinion = (vals) => {
    const date = new Date();

    const payload = {
      title: vals.title,
      content: vals.content,
      author: vals.author,
      date: date.toDateString(),
      time: `${date.getHours().toString()}:${date.getMinutes().toString()}`,
    };

    let jsonned = JSON.stringify(payload);
    let parsed = JSON.parse(jsonned);

    axios
      .post(`https://trash-opinons.herokuapp.com/add-opinion`, payload)
      .then((res) => {
        console.log(res);
        setModalVisible(false);
        getOpinions();
      })
      .catch(console.error);
  };

  React.useEffect(() => {
    getOpinions();
  }, []);

  if (loading) {
    return (
      <>
        <TopBar disabled={true} />
        <Layout style={styles.center}>
          <Spinner />
          <Text style={{ marginTop: 5 }}>Loading</Text>
        </Layout>
      </>
    );
  } else {
    return (
      <>
        <TopBar onAdd={() => setModalVisible(true)} onRefresh={getOpinions} />

        <Modal visible={modalVisible} animationType="slide">
          <OpinionForm
            submitHandler={(vals) => addOpinion(vals)}
            onCancel={() => setModalVisible(false)}
          />
        </Modal>

        <Layout style={{ flex: 1 }}>
          <Layout style={styles.container}>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <CardComponent
                  title={item.title}
                  content={item.content}
                  author={item.author}
                  date={item.date}
                  time={item.time}
                />
              )}
            />
          </Layout>
        </Layout>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
