import React from 'react-native'
import style from './style'

const {View, NativeModules, TouchableOpacity, Text} = React

export default class Recorder extends React.Component {
  render() {
    return <View style={style.container}>
      <View style={style.progress}>
        <TouchableOpacity
          onPressIn={this._onRecordStart.bind(this)}
          onPressOut={this._onRecordStop.bind(this)}
        >
          <View style={style.button}>
            <Text style={style.text}>
              Record
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={this._onShowAll.bind(this)} >
        <View style={style.showAllButton}>
          <Text style={style.showAllText}>
            Show all
          </Text>
        </View>
      </TouchableOpacity>
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
