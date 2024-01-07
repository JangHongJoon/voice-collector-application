import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Dimensions, Platform, Linking} from 'react-native';
import WebView from 'react-native-webview';
import SendIntentAndroid from 'react-native-send-intent';
import Toast from 'react-native-toast-message';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App = () => {

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{uri: 'http://172.18.131.96:3000'}}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});