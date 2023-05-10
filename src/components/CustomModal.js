import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { db } from '../Datas/patarebisData';

export default function CustomModal({ setModalVisible, navigation }) {
  const [homeData, setHomeData] = useState();
  const [correctData, setCorrectData] = useState([]);
  const [wrongData, setWrongData] = useState([]);
  async function loadDB() {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM patarebisData WHERE answered = -1',
        [],
        (_, d) => {
          setHomeData(d.rows._array);
        }
      );
      tx.executeSql(
        'SELECT * FROM patarebisData WHERE correct = answered',
        [],
        (_, d) => {
          setCorrectData(d.rows._array);
        }
      );
      tx.executeSql(
        'SELECT * FROM patarebisData WHERE answered != correct AND answered != -1',
        [],
        (_, d) => {
          setWrongData(d.rows._array);
        }
      );
    });
  }

  useEffect(() => {
    loadDB();
  }, []);
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#04101666',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
      }}
    >
      <View
        style={{
          width: '80%',
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 10,
          position: 'absolute',
          zIndex: 10,
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            position: 'absolute',
            width: 20,
            height: 20,
            right: 5,
            top: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <Text style={{ fontSize: 20 }}>x</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('Questions', { homedata: homeData, from: 0 });
          }}
        >
          <Text>პასუხგაუცემელი კითხვები</Text>
        </TouchableOpacity>
        {correctData.length > 0 && (
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('Questions', {
                homedata: correctData,
                from: 1,
              });
            }}
          >
            <Text>სწორად გაცემული კითხვები</Text>
          </TouchableOpacity>
        )}
        {wrongData.length > 0 && (
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('Questions', {
                homedata: wrongData,
                from: -1,
              });
            }}
          >
            <Text>არასწორად გაცემული კითხვები</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    width: '80%',
    height: 50,
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
});
