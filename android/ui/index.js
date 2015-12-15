import React from 'react-native'
import User from './user/'
import Draft from './draft/'
import scene from './scene'

const {Navigator, NativeModules} = React

const _apiUrl = 'http://radiant-spire-1878.herokuapp.com/'

export default class Ui extends React.Component {
  componentWillMount() {
    this.setState({
      records: []
    })

    this._updateList()
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
          createRecord={this._createRecord.bind(this, navigator)}
          cancelRecord={this._cancelRecord.bind(this, navigator)}
        />
    }
  }

  _navigateToDraft(navigator, filename) {
    this.setState({filename})
    navigator.push({stage: 'draft'})
  }

  _navigateToUser(navigator) {
    navigator.pop()
    this._updateList()
  }

  _createRecord(navigator, record) {
    this._navigateToUser(navigator)

    const {filename, title} = record
    NativeModules.RecordModel.create(filename, title, () => {
      this._updateList()
      // const {records} = this.state
      // records.push(record)
      // this.setState({records})
    })
  }

  _cancelRecord(navigator) {
    this._navigateToUser(navigator)
  }

  _updateList(callback) {
    NativeModules.RecordModel.readList((response) => {
      const data = JSON.parse(response)
      if (data) {
        this.setState({records: data.sounds})
        this.forceUpdate()
        if (callback) {
          callback()
        }
      }
    })
  }
}
