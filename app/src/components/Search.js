import React from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  AsyncStorage,
  StyleSheet,
  StatusBar,
  Button,
  FlatList
} from 'react-native';
import firebase from 'firebase';
import RepoItem from './RepoItem';
import {connect} from 'react-redux'
import {
  signInAction,
  setSearchAction,
  setPageAction,
  apiRequestSuccessAction,
  apiRequestFailureAction
} from '../redux/actions/actions'
// import { WebView } from 'react-native-webview'; // ne rabotaet

const GithubStorageKey = '@Expo:GithubToken';

async function signOutAsync() {
  try {
    await AsyncStorage.removeItem(GithubStorageKey);
    await firebase.auth().signOut();
  } catch ({ message }) {
    alert('Error: ' + message);
  }
}

class Search extends React.Component {
  getRepos = () => {
    fetch(`https://api.github.com/search/repositories?q=${this.props.search}:name&sort=stars&order=desc&page=${this.props.page}&per_page=15`)
      .then(res => res.json())
      .then(json => {
        this.props.apiRequestSuccessAction(this.props.items.concat(json.items));
      })
      .catch((error) => {
        alert(error);
        this.props.apiRequestFailureAction();
      })
  };

  initNewRepos = () => {
    if (!this.props.loading) {
      this.props.setPageAction(this.props.page + 1);
      this.getRepos();
    }
  };

  onSubmitEditing = (e) => {
    this.props.setSearchAction(e.nativeEvent.text.replace(/ /g, '+'));
    this.getRepos();
  };

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
    const user = firebase.auth().currentUser || {};

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <Image source={{ uri: user.photoURL }} style={styles.image} />
          <Text style={styles.userName}>{user.displayName}</Text>
          <Button onPress={signOutAsync} title={'Logout'} style={styles.logout}/>
        </View>
        {this.props.search.length ?
          <View style={styles.content}>
            <Button onPress={() => this.props.setSearchAction('')} title={'Back'} style={styles.logout}/>
            {/*<View>*/}
            {/*<Modal*/}
            {/*visible={this.state.modalVisible}*/}
            {/*onRequestClose={() => {*/}
            {/*this.setState({modalVisible: false})*/}
            {/*}}*/}
            {/*>*/}
            {/*<View>*/}
            {/*<WebView*/}
            {/*source={{uri: this.state.urlForModal}}*/}
            {/*/>*/}
            {/*</View>*/}
            {/*</Modal>*/}
            {/*</View>*/}
            <FlatList
              style={styles.repoList}
              data={this.props.items}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              onEndReached={this.initNewRepos}
              onEndReachedThreshold={0.3}
              refreshing={this.props.loading}
            />
          </View>
          :
          <View style={styles.hello}>
            <TextInput style={styles.search} placeholderTextColor={'#000'} onSubmitEditing={this.onSubmitEditing} placeholder={'Search here...'}/>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hello: {
    minWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  repoList: {
    padding: 5
  },
  search: {
    minWidth: '100%',
    padding: 10,
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: '#cecece',
    width: 200
  },
  header: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    minWidth: '100%'
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 32,
    overflow: 'hidden',
    resizeMode: 'contain'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#ecf0f1',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    minWidth: '100%'
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  },
  userName: {
    width: 150,
    margin: 0,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#34495e'
  },
});

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
)(Search)