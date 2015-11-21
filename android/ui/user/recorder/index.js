import React from 'react-native'
import Button from '../../_lib/button/'
import style from './style'

const {View} = React

export default class Recorder extends React.Component {
  render() {
    return <View style={style.container}>
      <View style={style.progress}>
        <Button onPress={this._onRecord.bind(this)}>
          🎤
        </Button>
      </View>
      <Button onPress={this._onShowAll.bind(this)}>
        Show all
      </Button>
    </View>
  }

  _onRecord() {
    this.props.navigateToDraft()
  }

  _onShowAll() {
    this.props.navigateToRecordList()
  }
}

