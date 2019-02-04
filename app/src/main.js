import React from 'react';
import {
  StyleSheet
} from 'react-native';
// import getGithubTokenAsync from '../getGithubTokenAsync';
// import firebase from 'firebase';
// import {FontAwesome as Icon} from '@expo/vector-icons';
import RepoItem from './components/RepoItem';
import Home from './components/Home';
import Search from './components/Search';
import {connect} from 'react-redux'
import {
  signInAction,
  setSearchAction,
  setPageAction,
  apiRequestSuccessAction,
  apiRequestFailureAction
} from './redux/actions/actions'
// import { WebView } from 'react-native-webview'; // ne rabotaet

// const GithubStorageKey = '@Expo:GithubToken';
// const firebaseConfig = {
//   apiKey: "AIzaSyD6RBDRKTWj58rlvvZM9sax9CX1tw3MqMY",
//   authDomain: "gapp-fff70.firebaseapp.com",
//   databaseURL: "https://gapp-fff70.firebaseio.com",
//   projectId: "gapp-fff70",
//   storageBucket: "gapp-fff70.appspot.com",
//   messagingSenderId: "607238868331"
// };
//
// function initializeFirebase() {
//   // Prevent reinitializing the app in snack.
//   if (!firebase.apps.length) {
//     return firebase.initializeApp(firebaseConfig);
//   }
// }
//
// async function signInAsync(token) {
//   try {
//     if (!token) {
//       const token = await getGithubTokenAsync();
//       if (token) {
//         await AsyncStorage.setItem(GithubStorageKey, token);
//         return signInAsync(token);
//       } else {
//         return;
//       }
//     }
//     const credential = firebase.auth.GithubAuthProvider.credential(token);
//     return firebase.auth().signInAndRetrieveDataWithCredential(credential);
//   } catch ({ message }) {
//     alert(message);
//   }
// }
//
// async function signOutAsync() {
//   try {
//     await AsyncStorage.removeItem(GithubStorageKey);
//     await firebase.auth().signOut();
//   } catch ({ message }) {
//     alert('Error: ' + message);
//   }
// }
//
// async function attemptToRestoreAuthAsync() {
//   let token = await AsyncStorage.getItem(GithubStorageKey);
//   if (token) {
//     console.log('Sign in with token', token);
//     return signInAsync(token);
//   }
// }

class Main extends React.Component {
  // componentDidMount() {
  //   this.setupFirebaseAsync();
  // }
  //
  // setupFirebaseAsync = async () => {
  //   initializeFirebase();
  //
  //   firebase.auth().onAuthStateChanged(async auth => {
  //     const isSignedIn = !!auth;
  //     this.props.signInAction(isSignedIn);
  //     if (!isSignedIn) {
  //       attemptToRestoreAuthAsync();
  //     }
  //   });
  // };
  //
  // getRepos = () => {
  //   fetch(`https://api.github.com/search/repositories?q=${this.props.search}:name&sort=stars&order=desc&page=${this.props.page}&per_page=15`)
  //     .then(res => res.json())
  //     .then(json => {
  //       this.props.apiRequestSuccessAction(this.props.items.concat(json.items));
  //     })
  //     .catch((error) => {
  //       alert(error);
  //       this.props.apiRequestFailureAction();
  //     })
  // };
  //
  // initNewRepos = () => {
  //   if (!this.props.loading) {
  //     this.props.setPageAction(this.props.page + 1);
  //     this.getRepos();
  //   }
  // };
  //
  // onSubmitEditing = (e) => {
  //   this.props.setSearchAction(e.nativeEvent.text.replace(/ /g, '+'));
  //   this.getRepos();
  // };
  //
  // openWebview = (item) => {
  //   this.setState({
  //     urlForModal: item.html_url,
  //     modalVisible: true
  //   })
  // };

  _keyExtractor = (item, index) => item.html_url;

  _renderItem = ({item}) => (
    <RepoItem
      name={item.name}
      description={item.description}
      forks_count={item.forks_count}
      stargazers_count={item.stargazers_count}
      // onPress={() => this.openWebview(item)}
    />
  );

  render() {
    if (this.props.isSignedIn) {
      return (
        <Search />
        // {/*<View style={styles.container}>*/}
        //   {/*<StatusBar hidden={true} />*/}
        //   {/*<View style={styles.header}>*/}
        //     {/*<Image source={{ uri: user.photoURL }} style={styles.image} />*/}
        //     {/*<Text style={styles.userName}>{user.displayName}</Text>*/}
        //     {/*<Button onPress={signOutAsync} title={'Logout'} style={styles.logout}/>*/}
        //   {/*</View>*/}
        //   {/*{this.props.search.length ?*/}
        //     {/*<View style={styles.content}>*/}
        //       {/*<Button onPress={() => this.props.setSearchAction('')} title={'Back'} style={styles.logout}/>*/}
        //       {/*<View>*/}
        //       {/*<Modal*/}
        //       {/*visible={this.state.modalVisible}*/}
        //       {/*onRequestClose={() => {*/}
        //       {/*this.setState({modalVisible: false})*/}
        //       {/*}}*/}
        //       {/*>*/}
        //       {/*<View>*/}
        //       {/*<WebView*/}
        //       {/*source={{uri: this.state.urlForModal}}*/}
        //       {/*/>*/}
        //       {/*</View>*/}
        //       {/*</Modal>*/}
        //       {/*</View>*/}
        //       {/*<FlatList*/}
        //         {/*style={styles.repoList}*/}
        //         {/*data={this.props.items}*/}
        //         {/*keyExtractor={this._keyExtractor}*/}
        //         {/*renderItem={this._renderItem}*/}
        //         {/*onEndReached={this.initNewRepos}*/}
        //         {/*onEndReachedThreshold={0.3}*/}
        //         {/*refreshing={this.props.loading}*/}
        //       {/*/>*/}
        //     {/*</View>*/}
        //     {/*:*/}
        //     {/*<View style={styles.hello}>*/}
        //       {/*<TextInput style={styles.search} placeholderTextColor={'#000'} onSubmitEditing={this.onSubmitEditing} placeholder={'Search here...'}/>*/}
        //     {/*</View>*/}
        //   {/*}*/}
        // {/*</View>*/}
      )
    }
    return (
      <Home />
      // <View style={styles.loginContainer}>
      //   <Icon.Button name="github" color="black" backgroundColor="transparent" onPress={() => signInAsync()}>
      //     Sign In with Github
      //   </Icon.Button>
      // </View>
    );
  }
}

// const styles = StyleSheet.create({
//   hello: {
//     minWidth: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10
//   },
//   repoList: {
//     padding: 5
//   },
//   search: {
//     minWidth: '100%',
//     padding: 10,
//     fontSize: 20,
//     borderRadius: 5,
//     backgroundColor: '#cecece',
//     width: 200
//   },
//   header: {
//     flex: 0.1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderBottomWidth: 1,
//     minWidth: '100%'
//   },
//   image: {
//     width: 48,
//     height: 48,
//     borderRadius: 32,
//     overflow: 'hidden',
//     resizeMode: 'contain'
//   },
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     justifyContent: 'flex-start',
//     backgroundColor: '#ecf0f1',
//   },
//   content: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     justifyContent: 'flex-start',
//     minWidth: '100%'
//   },
//   loginContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1'
//   },
//   userName: {
//     width: 150,
//     margin: 0,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'left',
//     color: '#34495e'
//   },
// });

const mapStateToProps = store => {
  return {
    isSignedIn: store.isSignedIn,
    items: store.items,
    search: store.search,
    page: store.page,
    loading: store.loading,
    // modalVisible: false,
    // urlForModal: ''
  }
};

const mapDispatchToProps = dispatch => ({
  signInAction: signed => dispatch(signInAction(signed)),
  setSearchAction: string => dispatch(setSearchAction(string)),
  setPageAction: page => dispatch(setPageAction(page)),
  apiRequestSuccessAction: items => dispatch(apiRequestSuccessAction(items)),
  apiRequestFailureAction: () => dispatch(apiRequestFailureAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)