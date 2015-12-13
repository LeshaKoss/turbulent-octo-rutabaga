import React from 'react-native'
import User from './user/'
import Draft from './draft/'
import scene from './scene'

const {Navigator} = React

const _apiUrl = 'http://radiant-spire-1878.herokuapp.com/'

export default class Ui extends React.Component {
  componentWillMount() {
    this.setState({
      records: []
    })
    this._fetchList()
  }

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
          records={this.state.records}
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
    this
      ._fetchList()
      .then(() => {
        this.setState({filename})
        navigator.push({stage: 'draft'})
      })
  }

  _navigateToUser(navigator) {
    navigator.pop()
  }

  _createRecord(record) {
    const {records} = this.state
    records.push(record)
    this.setState({records})
  }

  _fetchList() {
    return fetch(_apiUrl + '/sounds')
      .then((response) => response.json())
      .then((data) => this.setState({records: data.sounds}))
  }
}
