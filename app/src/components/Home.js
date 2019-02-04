import React from 'react';
import {
  View,
  AsyncStorage,
  StyleSheet,
} from 'react-native';
import getGithubTokenAsync from '../../getGithubTokenAsync';
import firebase from 'firebase';
import {FontAwesome as Icon} from '@expo/vector-icons';
import {connect} from 'react-redux'
import {signInAction} from '../redux/actions/actions'

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

async function attemptToRestoreAuthAsync() {
  let token = await AsyncStorage.getItem(GithubStorageKey);
  if (token) {
    console.log('Sign in with token', token);
    return signInAsync(token);
  }
}

class Home extends React.Component {
  componentDidMount() {
    this.setupFirebaseAsync();
  }

  setupFirebaseAsync = async () => {
    initializeFirebase();

    firebase.auth().onAuthStateChanged(async auth => {
      const isSignedIn = !!auth;
      this.props.signInAction(isSignedIn);
      if (!isSignedIn) {
        attemptToRestoreAuthAsync();
      }
    });
  };

  render() {
    return (
      <View style={styles.loginContainer}>
        <Icon.Button name="github" color="black" backgroundColor="transparent" onPress={() => signInAsync()}>
          Sign In with Github
        </Icon.Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  }
});

const mapStateToProps = store => store;

const mapDispatchToProps = dispatch => ({
  signInAction: signed => dispatch(signInAction(signed))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)