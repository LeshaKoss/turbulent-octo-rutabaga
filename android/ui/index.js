import React from 'react-native'
import User from './user/'
import Draft from './draft/'
import scene from './scene'

const {Navigator} = React

let records = []
const _apiUrl = 'http://192.168.1.138:5000'

let fetchList = () => {
  fetch(_apiUrl + '/sounds')
    .then((response) => response.json())
    .then((data) => records = data.sounds)
}

export default class Ui extends React.Component {
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
          records={records}
          navigateToDraft={this._navigateToDraft.bind(this, navigator)}
        />
      case 'draft':
        return <Draft
          filename={this.state.filename}
          navigateToUser={this._navigateToUser.bind(this, navigator)}
          createRecord={this._createRecord.bind(this)}
        />
    }
  }

  _navigateToDraft(navigator, filename) {
    fetchList()
    this.setState({filename})
    navigator.push({stage: 'draft'})
  }

  _navigateToUser(navigator) {
    navigator.pop()
  }

  _createRecord(record) {
    records.push(record)
  }
}
