import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Video, AVPlaybackStatus } from 'expo-av';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Audio } from 'expo-av';
import { db } from '../Datas/patarebisData';

export default function HomeScreen({ navigation }) {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [sound, setSound] = useState();
  const [homedata, sethomedata] = useState();

  async function loadDB() {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM patarebisData', [], (_, d) => {
        sethomedata(d.rows._array);
        // console.log(d.rows._array);
      });
    });
  }

  useEffect(() => {
    loadDB();
  }, []);

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/musics/ps1.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#89CFF0',
        marginTop: getStatusBarHeight(),
      }}
    >
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: '#89CFF0',
          marginTop: 60,
        }}
        onPress={() => navigation.navigate('Questions')}
      >
        <View
          style={{
            backgroundColor: '#F9F6EE',
            marginLeft: 18,
            width: '85%',
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            height: 80,
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
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'red',
          }}
          onPress={() => {
            playSound();
          }}
        />
        <View
          style={{
            backgroundColor: '#F9F6EE',
            marginLeft: 28,
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            height: 80,
            marginTop: 10,
            width: '85%',
            position: 'absolute',
            zIndex: -1,
          }}
        ></View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: '#89CFF0',
          bottom: 60,
          position: 'absolute',
        }}
        onPress={() => navigation.navigate('Questions', { homedata: homedata })}
      >
        <View
          style={{
            backgroundColor: '#F9F6EE',
            marginLeft: 18,
            width: '100%',
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            height: 80,
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
        </View>
        <View
          style={{
            backgroundColor: '#F9F6EE',
            marginLeft: 28,
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            height: 80,
            marginTop: 10,
            width: '100%',
            position: 'absolute',
            zIndex: -1,
          }}
        ></View>
      </TouchableOpacity>
      {/* <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        shouldPlay={true}
        useNativeControls={false}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    top: 500,
    left: '10%',
    bottom: 0,
    right: '10%',
  },
});
