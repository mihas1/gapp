import React from 'react';
import {Provider} from 'react-redux'
import {store} from './src/redux/store/store'
import Main from './src/main';
import Navigator from './src/navigation/Navigator'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
        {/*<Navigator />*/}
      </Provider>
    );
  }
}