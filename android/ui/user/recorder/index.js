import React from 'react-native'
import Button from '../../_lib/button/'
import style from './style'

const {View, NativeModules} = React

export default class Recorder extends React.Component {
  render() {
    return <View style={style.container}>
      <View style={style.progress}>
        <Button
          onPressIn={this._onRecordStart.bind(this)}
          onPressOut={this._onRecordStop.bind(this)}
        >
          🎤
        </Button>
      </View>
      <Button onPress={this._onShowAll.bind(this)}>
        Show all
      </Button>
    </View>
  }

  _onRecordStart() {
    NativeModules.Microphone.startRecording((filename) => {
      this.setState({recording: true})
    })
  }

  _onRecordStop() {
    NativeModules.Microphone.stopRecording((filename) => {
      this.setState({recording: false})
      this.props.navigateToDraft(filename)
    })
  }

  _onShowAll() {
    this.props.navigateToRecordList()
  }
}

