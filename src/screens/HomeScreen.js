import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

export default function HomeScreen({ navigation }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
      }}
    >
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: 'black',
          borderBottomColor: 'red',
          borderWidth: 3,
          paddingHorizontal: 30,
        }}
        onPress={() => navigation.navigate('Questions')}
      >
        <Text style={{ fontSize: 30, color: 'white' }}>all the questions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ height: 100, backgroundColor: 'black', paddingHorizontal: 30 }}
      >
        <Text style={{ fontSize: 30, color: 'white' }}>find categories</Text>
      </TouchableOpacity>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
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
