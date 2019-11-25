import React, { Component } from 'react'
// import { Text, View } from 'react-native'
import MainStack from './src/routers/login_register_home'
import 'react-native-gesture-handler'

import Reducers from './src/redux/reducers/index'
import {Provider } from 'react-redux'
import {createStore} from 'redux'

const store = createStore(Reducers)

export default class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <MainStack/>
      </Provider>
    )
  }
}
