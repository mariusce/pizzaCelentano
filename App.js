/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import configureStore from './src/store/configureStore';
import {Provider} from 'react-redux';

// TODO: remove these helper commands
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps is deprecated and will be removed',
  'Warning: Slider has been extracted from react-native core',
  'Warning: componentWillReceiveProps has been renamed, and is not recommended',
  'Warning: componentWillUpdate is deprecated and will be removed',
  'Warning: ViewPagerAndroid has been extracted from react-native core and will be removed',
  'Warning: componentWillMount is deprecated and will be removed in the next major version',
  // componentWillMount is used in CartA, B
]);

// import MainNavigatorA or MainNavigatorB to preview design differnces
import MainNavigator from './src/navigation/MainNavigatorA';

import firebase from 'react-native-firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDHniTq0NiiH0X2k17Fq1MSGhDoyDGxlZQ",
  authDomain: "celentano-pizza-app.firebaseapp.com",
  databaseURL: "https://celentano-pizza-app.firebaseio.com",
  projectId: "celentano-pizza-app",
  storageBucket: "celentano-pizza-app.appspot.com",
  messagingSenderId: "27109620916",
  appId: "1:27109620916:android:b5f375a9be9397f0e06be1"
};

firebase.initializeApp(firebaseConfig, 'celentano-pizza-app');

const thisApp = firebase.app('celentano-pizza-app');

export const firestoreForThisApp = firebase.firestore(thisApp);
export const authForThisApp = firebase.auth(thisApp);

const store = configureStore();

// APP
const App = () => (
                  <Provider store={store}>
                    <MainNavigator />
                  </Provider>
                  );

export default App;
