import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
// import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
const screen = Dimensions.get('screen');

export default function VerificationScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phonenum, setPhonenum] = useState('');
  //   const [verified, setVerified] = useState(false)
  async function fetchData() {
    let user = await AsyncStorage.getItem('user');
    if (user) {
      console.log(user);
      navigation.navigate('Home');
    }
  }

  useEffect(() => {
    fetchData();
    return () => {
      console.log('This will be logged on unmount');
    };
  }, []);

  async function storeData() {
    const user = { phonenum, name };
    try {
      console.log('object');
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  }
  return (
    <View
      style={{
        justifyContent: 'center',
        flexDirection: 'column',
        width: screen.width - 40,
        marginHorizontal: 20,
        height: '100%',
      }}
    >
      <Text style={{ fontSize: 40, alignSelf: 'center' }}>გამარჯობა!</Text>
      <Text style={{ fontSize: 20, alignSelf: 'center', marginTop: 20 }}>
        გთხოვთ შეიყვანოთ ინფორმაცია!
      </Text>
      <TextInput
        editable
        maxLength={10}
        style={{
          padding: 10,
          marginTop: 10,
          fontSize: 30,
          borderBottomColor: 'black',
          borderBottomWidth: 2,
        }}
        placeholder={'ზედმეტსახელი'}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        editable
        maxLength={13}
        style={{
          padding: 10,
          marginTop: 10,
          fontSize: 30,
          borderBottomColor: 'black',
          borderBottomWidth: 2,
        }}
        placeholder={'ნომერი'}
        onChangeText={(text) => setPhonenum(text)}
      />
      <TouchableOpacity
        style={{
          backgroundColor:
            name.length && phonenum.length ? 'blue' : 'lightblue',
          justifyContent: 'center',
          paddingVertical: 15,
          position: 'absolute',
          bottom: 40,
          alignSelf: 'center',
          width: '80%',
        }}
        onPress={() => {
          if (name.length && phonenum.length) {
            storeData();
            navigation.navigate('Home');
          }
        }}
      >
        <Text style={{ fontSize: 20, color: 'white', alignSelf: 'center' }}>
          გაგრძელება
        </Text>
      </TouchableOpacity>
    </View>
  );
}
