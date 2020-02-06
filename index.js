/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// firebase.Options = Object.assign({}, firebase.Options, {
//   apiKey: 'AIzaSyDHniTq0NiiH0X2k17Fq1MSGhDoyDGxlZQ',
//   appId: 'celentano-pizza-app',
//   databaseURL: 'https://celentano-pizza-app.firebaseio.com',
//   projectId: 'celentano-pizza-app'
// });

AppRegistry.registerComponent(appName, () => App);
