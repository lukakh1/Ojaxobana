import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function OneAnswer({ correctanswer, content, index, colors }) {
  //   console.log(content);
  return (
    <TouchableOpacity
      onPress={() => {
        if (index == correctanswer) {
          for (const i = 0; i < 4; i = i + 1) {
            if (i == correctanswer) {
              colors[i] = 'green';
            } else {
              colors[i] = 'white';
            }
          }
          console.log(colors);
        }
      }}
      key={index}
      style={{
        width: '80%',
        minHeight: 35,
        backgroundColor: colors[index],
        marginTop: 20,
        borderWidth: 1,
        borderColor: 1,
        borderRadius: 15,
        alignSelf: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
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
