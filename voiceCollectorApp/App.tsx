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
        source={{uri: 'https://localhost:3000'}}
        originWhitelist={['http://*', 'https://*', 'intent://*']}
        // onShouldStartLoadWithRequest={openExternalLink}
        onShouldStartLoadWithRequest={(event) => {
            console.log('onShouldstart');
            console.log(event.url);
            if (event.url.startsWith("http")) {
                Linking.openURL(event.url);
            }
            if (
                Platform.OS === 'android' &&
                event.url.startsWith("intent")
            ) {
                SendIntentAndroid.openChromeIntent(event.url)
                    // SendIntentAndroid.openAppWithUri(event.url)
                    .then((isOpened) => {
                        if (!isOpened) {
                            Toast.show({text1 : '앱 실행에 실패했습니다'});
                        }
                        return false;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                return false;
            }
            if (Platform.OS === 'ios') {
                return true;
            }
            return true;
        }}

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