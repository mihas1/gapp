import React from 'react';
import { Image, Text, View, AsyncStorage, StyleSheet } from 'react-native';
import getGithubTokenAsync from './getGithubTokenAsync';
import firebase from 'firebase';
import { FontAwesome as Icon } from '@expo/vector-icons';

const GithubStorageKey = '@Expo:GithubToken';

const firebaseConfig = {
  apiKey: "AIzaSyD6RBDRKTWj58rlvvZM9sax9CX1tw3MqMY",
  authDomain: "gapp-fff70.firebaseapp.com",
  databaseURL: "https://gapp-fff70.firebaseio.com",
  projectId: "gapp-fff70",
  storageBucket: "gapp-fff70.appspot.com",
  messagingSenderId: "607238868331"
};

function initializeFirebase() {
  // Prevent reinitializing the app in snack.
  if (!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
  }
}

async function signInAsync(token) {
  try {
    if (!token) {
      const token = await getGithubTokenAsync();
      if (token) {
        await AsyncStorage.setItem(GithubStorageKey, token);
        return signInAsync(token);
      } else {
        return;
      }
    }
    const credential = firebase.auth.GithubAuthProvider.credential(token);
    return firebase.auth().signInAndRetrieveDataWithCredential(credential);
  } catch ({ message }) {
    alert(message);
  }
}

async function signOutAsync() {
  try {
    await AsyncStorage.removeItem(GithubStorageKey);
    await firebase.auth().signOut();
  } catch ({ message }) {
    alert('Error: ' + message);
  }
}

async function attemptToRestoreAuthAsync() {
  let token = await AsyncStorage.getItem(GithubStorageKey);
  if (token) {
    console.log('Sign in with token', token);
    return signInAsync(token);
  }
}

export default class App extends React.Component {
  state = { isSignedIn: false };

  componentDidMount() {
    this.setupFirebaseAsync();
  }

  setupFirebaseAsync = async () => {
    initializeFirebase();

    firebase.auth().onAuthStateChanged(async auth => {
      const isSignedIn = !!auth;
      this.setState({ isSignedIn });
      if (!isSignedIn) {
        attemptToRestoreAuthAsync();
      }
    });
  };

  render() {
    if (this.state.isSignedIn) {
      const user = firebase.auth().currentUser || {};

      return (
        <View style={styles.container}>
          <Image source={{ uri: user.photoURL }} style={styles.image} />
          <Text style={styles.paragraph}>Welcome {user.displayName}</Text>
          <Text style={styles.paragraph} onPress={signOutAsync}>
            Logout
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Icon.Button name="github" color="black" backgroundColor="transparent" onPress={() => signInAsync()}>
          Sign In with Github
        </Icon.Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
