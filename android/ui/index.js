import React from 'react-native'
import Recorder from './recorder'
import Draft from './draft'
import User from './user'
import scene from './scene'
import style from './style'

const {Component, Navigator} = React

export default class Ui extends Component {
  render() {
    return <Navigator
      initialRoute={{stage: 'recorder'}}
      renderScene={this._renderScene.bind(this)}
      configureScene={() => scene}
    />
  }

  _renderScene(route, navigator) {
    debugger
    switch (route.stage) {
      case 'recorder':
        return <Recorder navigator={navigator} />
      case 'draft':
        return <Draft navigator={navigator} />
      case 'user':
        return <User navigator={navigator} />
    }
  }
}

