// import React, {Component} from 'react';
// import { connect } from 'react-redux';
// import Home from '../components/Home';
// import Search from '../components/Search';
// import Profile from '../components/Profile';
//
// import { StackNavigator, addNavigationHelpers } from 'react-navigation';
//
// export const Navigator = new StackNavigator({
//   Home: {screen: Home},
//   Search: {screen: Search},
//   Profile: {screen: Profile},
// }, {
//   initialRouteName: 'Home',
// });
//
// class Nav extends Component {
//   render() {
//     return (
//       <Navigator
//         navigation={addNavigationHelpers({
//           dispatch: this.props.dispatch,
//           state: this.props.navigation,
//         })}
//       />
//     )
//   }
// }
//
// const mapStateToProps = state => ({
//   navigation: state.navigation,
// })
//
// export default connect(mapStateToProps)(Nav)