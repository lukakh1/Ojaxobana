import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
let colors = ['blue', 'green', 'pink', 'red'];
import { db } from '../Datas/patarebisData';

export default function OneAnswer({
  correctanswer,
  content,
  index,
  setIsclicked,
  isclicked,
  setBlurRadius,
  questionid,
}) {
  console.log(questionid, 'martla kide esaa');
  const [ind, setInd] = useState(-1);
  async function loadDB() {
    if (ind != -1) {
      db.transaction((tx) => {
        new Promise((resolve, reject) => {
          console.log(ind, questionid, 'llll');
          tx.executeSql(
            `UPDATE patarebisData SET answered = ${ind} WHERE id = ${questionid}`,
            [],
            resolve,
            (_, error) => reject(error)
          );
        });
      });
    }
  }

  useEffect(() => {
    console.log(ind, questionid, 'oneonswer2');
    loadDB();
  }, [ind]);
  return (
    <TouchableOpacity
      onPress={() => {
        setIsclicked(true);
        setInd(index);
        setBlurRadius(0);
      }}
      key={index}
      style={{
        width: '80%',
        minHeight: 35,
        backgroundColor: isclicked
          ? correctanswer == index
            ? 'green'
            : ind == index
            ? 'red'
            : 'white'
          : '#de5307',
        marginTop: 20,
        borderWidth: 1,
        borderColor: 1,
        borderRadius: 15,
        alignSelf: 'center',
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 5,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: '400',
          color: 'black',
        }}
      >
        {index + 1}.
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '400',
          marginLeft: 10,
          color: 'black',
        }}
      >
        {content}
      </Text>
    </TouchableOpacity>
  );
}
