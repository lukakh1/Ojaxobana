import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Video, Audio } from 'expo-av';
import { Images, Videos, Audios } from './Images';
import OneAnswer from './OneAnswer';
import Header from '../components/Header';
const screen = Dimensions.get('screen');

export default function OneQuestion({ item, currentPage, navigation }) {
  const video = useRef(null);
  const answers = item.answers.split('.');
  console.log(item.id, 'ai esaa');
  const [isclicked, setIsclicked] = useState(false);
  const [sound, setSound] = useState();
  const [soundStarted, setSoundStarted] = useState(false);
  const [blurRadius, setBlurRadius] = useState(10);

  async function playSound(requirement) {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(requirement);
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
        width: screen.width,
        height: screen.height,
      }}
    >
      <Header back={true} navigation={navigation} />
      <ScrollView
        contentContainerStyle={{
          // width: '80%',
          backgroundColor: '#BF40BF',
          height: screen.height + 70,
        }}
      >
        <View
          style={{
            width: '94%',
            alignSelf: 'center',
            marginTop: 30,
            // borderWidth: 2,
            borderColor: 'black',
          }}
        >
          {Videos[item.id.toString() + '.mp4'] ? (
            <Video
              ref={video}
              style={{
                width: '100%',
                height: 200,
                alignSelf: 'center',
              }}
              source={Videos[item.id.toString() + '.mp4']}
              shouldPlay={true}
              useNativeControls={true}
            />
          ) : Images[item.id.toString() + '.jpg'] ? (
            !Images[item.id.toString() + '-2.jpg'] ? (
              <Animated.Image
                resizeMode='contain'
                style={{ width: '100%', height: 200 }}
                source={Images[item.id.toString() + '.jpg']}
                blurRadius={item.is_blured == 1 ? blurRadius : 0}
              />
            ) : isclicked ? (
              <Animated.Image
                resizeMode='contain'
                style={{ width: '100%', height: 200 }}
                source={Images[item.id.toString() + '-2.jpg']}
                blurRadius={item.is_blured == 1 ? blurRadius : 0}
              />
            ) : (
              <Animated.Image
                resizeMode='contain'
                style={{ width: '100%', height: 200 }}
                source={Images[item.id.toString() + '.jpg']}
                blurRadius={item.is_blured == 1 ? blurRadius : 0}
              />
            )
          ) : Audios[item.id.toString() + '.mp3'] ? (
            <TouchableOpacity
              style={{
                width: 100,
                alignSelf: 'center',
                backgroundColor: soundStarted ? '#800020' : 'green',
              }}
              onPress={() => {
                playSound(Audios[item.id.toString() + '.mp3']);
                setSoundStarted(!soundStarted);
              }}
            >
              <Text
                style={{ fontSize: 20, color: 'white', alignSelf: 'center' }}
              >
                {soundStarted ? 'stop' : 'start'}
              </Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>

        <View
          style={{
            width: '90%',
            marginTop: 30,
            alignSelf: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              fontWeight: 'bold',
              fontFamily: 'Helvetica',
            }}
          >
            {item.question}
          </Text>
        </View>

        {answers &&
          answers.map((content, index) => (
            <OneAnswer
              correctanswer={item.correct}
              content={content}
              index={index}
              isclicked={isclicked}
              setIsclicked={setIsclicked}
              setBlurRadius={setBlurRadius}
              questionid={item.id}
              key={content.id}
            />
          ))}
      </ScrollView>
    </View>
  );
  // };
}
