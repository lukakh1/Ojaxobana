import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
let colors = ['blue', 'green', 'pink', 'red'];

export default function OneAnswer({
  correctanswer,
  content,
  index,
  setIsclicked,
  isclicked,
}) {
  const [ind, setInd] = useState();
  return (
    <TouchableOpacity
      onPress={() => {
        setIsclicked(true);
        setInd(index);
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
          : colors[index],
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
