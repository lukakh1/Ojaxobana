import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import Images from './Images';
import OneAnswer from './OneAnswer';
const screen = Dimensions.get('screen');

export default function OneQuestion({ item, currentPage }) {
  const eachItem = item.item;
  const answers = eachItem.answers.split('.');
  const [isclicked, setIsclicked] = useState(false);
  const blurRadius = isclicked ? 0 : 10;
  return (
    <View
      style={{
        width: screen.width,
        height: screen.height,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          // width: '80%',
          backgroundColor: 'purple',
          height: screen.height + 70,
        }}
      >
        {Images[eachItem.id.toString() + '.jpg'] && (
          <View
            style={{
              width: '94%',
              alignSelf: 'center',
              marginTop: 30,
              // borderWidth: 2,
              borderColor: 'black',
            }}
          >
            <Image
              resizeMode='contain'
              style={{ width: '100%', height: 200 }}
              // source={require(`../../assets/images/${eachItem.id}.jpg`)}
              source={require(`../../assets/images/1.jpg`)}
              blurRadius={eachItem.is_blured == 1 ? blurRadius : 0}
            />
          </View>
        )}

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
            {eachItem.question}
          </Text>
        </View>

        {answers &&
          answers.map((item, index) => (
            <OneAnswer
              correctanswer={eachItem.correct}
              content={item}
              index={index}
              key={index}
              isclicked={isclicked}
              setIsclicked={setIsclicked}
            />
          ))}
      </ScrollView>
    </View>
  );
}
