import React from 'react-native'
import User from './user/'
import Draft from './draft/'
import scene from './scene'

const {Component, Navigator} = React

export default class Ui extends Component {
  render() {
    return <Navigator
      initialRoute={{stage: 'user'}}
      renderScene={this._renderScene.bind(this)}
      configureScene={() => scene}
    />
  }

  _renderScene(route, navigator) {
    switch (route.stage) {
      case 'user':
        return <User
          navigateToDraft={this._navigateToDraft.bind(this, navigator)}
        />
      case 'draft':
        return <Draft
          navigateToUser={this._navigateToUser.bind(this, navigator)}
        />
    }
  }

  _navigateToDraft(navigator) {
    navigator.push({stage: 'draft'})
  }

  _navigateToUser(navigator) {
    navigator.pop()
  }
}

