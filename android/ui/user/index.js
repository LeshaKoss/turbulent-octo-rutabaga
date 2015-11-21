import React from 'react-native'
import Recorder from './recorder/'
import RecordList from './record_list/'
import scene from './scene'

const {Navigator} = React

export default class User extends React.Component {
  render() {
    return <Navigator
      initialRoute={{stage: 'recorder'}}
      renderScene={this._renderScene.bind(this)}
      configureScene={() => scene}
    />
  }

  _renderScene(route, navigator) {
    switch (route.stage) {
      case 'recorder':
        return <Recorder
          navigateToDraft={this.props.navigateToDraft}
          navigateToRecordList={this._navigateToRecordList.bind(this, navigator)}
        />
      case 'recordList':
        return <RecordList
          records={this.props.records}
          navigateToRecorder={this._navigateToRecorder.bind(this, navigator)}
        />
    }
  }

  _navigateToRecordList(navigator) {
    navigator.push({stage: 'recordList'})
  }

  _navigateToRecorder(navigator) {
    navigator.pop()
  }
}

