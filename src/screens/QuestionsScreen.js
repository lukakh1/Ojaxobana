import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  AppRegistry,
} from 'react-native';
import OneQuestion from '../components/OneQuestion';
import DataStore from '../stores/DataStore';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

AppRegistry.registerComponent('main', () => App);

export default function QuestionsScreen({ route }) {
  const FlatlistRef = useRef();
  const [currentPage, setcurrentPage] = useState(0);
  const [viewableItems, setviewableItems] = useState([]);
  // console.log(route.params.homedata);
  const patarebisData = route.params.homedata;

  const handleNext = () => {
    if (currentPage == patarebisData.length - 1) return;

    FlatlistRef.current.scrollToIndex({
      animated: true,
      index: currentPage + 1,
    });
  };

  const handleBack = () => {
    if (currentPage == 0) return;

    FlatlistRef.current.scrollToIndex({
      animated: true,
      index: currentPage - 1,
    });
  };

  const handleviewableItemsChanged = useRef(({ viewableItems }) => {
    setviewableItems(viewableItems);
  });

  useEffect(() => {
    if (!viewableItems[0] || currentPage === viewableItems[0].index) return;
    setcurrentPage(viewableItems[0].index);
  }, [viewableItems]);

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: getStatusBarHeight(),
        backgroundColor: 'purple',
      }}
    >
      <FlatList
        data={patarebisData}
        contentContainerStyle={{ paddingBottom: 200 }}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) =>
          item?.id ? item.id.toString() : index.toString()
        }
        renderItem={(item) => (
          <OneQuestion item={item} currentPage={currentPage} />
        )}
        ref={FlatlistRef}
        onViewableItemsChanged={handleviewableItemsChanged.current}
        viewabilityConfig={viewConfigRef.current}
        scrollEnabled={false}
        initialNumToRender={5}
      />
      <View
        style={{
          width: '100%',
          // position: 'absolute',
          bottom: 0,
          marginBottom: 10,
          marginTop: 10,
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          style={{
            width: '40%',
            height: 50,
            marginHorizontal: '5%',
            backgroundColor: '#800020',
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            justifyContent: 'center',
          }}
          onPress={() => {
            handleBack();
          }}
        >
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              fontWeight: '500',
              fontFamily: 'Helvetica',
              color: 'white',
            }}
          >
            უკან
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '40%',
            height: 50,
            marginHorizontal: '5%',
            backgroundColor: 'green',
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            justifyContent: 'center',
          }}
          onPress={() => {
            handleNext();
          }}
        >
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              fontWeight: '500',
              fontFamily: 'Helvetica',
              color: 'white',
            }}
          >
            წინ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
