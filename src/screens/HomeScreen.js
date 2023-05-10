import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';
import CustomModal from '../components/CustomModal';
import { db } from '../Datas/patarebisData';
import Header from '../components/Header';

const screen = Dimensions.get('screen');

export default function HomeScreen({ navigation }) {
  const [homeData, setHomeData] = useState();
  const [correctData, setCorrectData] = useState([]);
  const [wrongData, setWrongData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
        flex: 1,
        backgroundColor: '#BF40BF',
        marginTop: getStatusBarHeight(),
        paddingBottom: getBottomSpace(),
      }}
    >
      <Header back={false} navigation={navigation} />
      <View
        style={{
          height: screen.height - getStatusBarHeight() - 80,
          justifyContent: 'space-evenly',
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#F9F6EE',
            marginLeft: 18,
            width: screen.width - 46,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            height: '12%',
            justifyContent: 'center',
          }}
          onPress={() => {
            if (wrongData.length > 0 || correctData.length > 0) {
              console.log('anu shveba');
              setModalVisible(true);
            } else {
              navigation.navigate('Questions', { homedata: homeData, from: 0 });
            }
          }}
        >
          <Text
            style={{
              fontSize: 60,
              color: 'black',
              fontFamily: 'Asomtavruli',
              alignSelf: 'center',
            }}
          >
            პატარები
          </Text>
        </TouchableOpacity>
        <Image
          resizeMode='contain'
          style={{
            width: screen.width,
            height: '50%',
            // marginTop: '20%',
          }}
          source={require('../../assets/splash.png')}
        />
        <View style={{ bottom: 20, justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, alignSelf: 'center' }}>მალე...</Text>
          <View
            style={{
              backgroundColor: '#F9F6EE',
              marginLeft: 18,
              width: screen.width - 46,
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 10,
              height: 80,
              backgroundColor: 'gray',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 60,
                color: 'black',
                fontFamily: 'Asomtavruli',
                alignSelf: 'center',
              }}
            >
              დიდები
            </Text>
          </View>
        </View>
      </View>
      {modalVisible && (
        <CustomModal
          setModalVisible={setModalVisible}
          navigation={navigation}
          homeData={homeData}
          correctData={correctData}
          wrongData={wrongData}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
