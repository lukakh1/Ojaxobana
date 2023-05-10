import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const screen = Dimensions.get('screen');

export default function Header({ back, navigation }) {
  return (
    <View
      style={{
        height: 80,
        width: screen.width,
        justifyContent: 'center',
        backgroundColor: 'white',
        flexDirection: 'column',
        borderBottomColor: 'black',
        borderBottomWidth: 3,
      }}
    >
      {back && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <Text
            style={{
              position: 'absolute',
              left: 10,
              backgroundColor: 'red',
              fontSize: 20,
            }}
          >
            უკან
          </Text>
        </TouchableOpacity>
      )}
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 40,
          position: 'absolute',
        }}
      >
        ოჯახობანა
      </Text>
    </View>
  );
}
