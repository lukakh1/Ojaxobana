import { View, Text, TouchableOpacity } from 'react-native';
export default function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}>
        <TouchableOpacity style={{height: 100, backgroundColor: 'black', borderBottomColor: 'red', borderWidth: 3, paddingHorizontal: 30}}>
          <Text style={{fontSize: 30, color: "white"}}>all the questions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ height: 100, backgroundColor: 'black', paddingHorizontal: 30}}>
          <Text style={{fontSize: 30, color: "white"}}>find categories</Text>
        </TouchableOpacity>
      </View>
    );
  }