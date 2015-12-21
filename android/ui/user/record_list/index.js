import React from 'react-native'
import RecordItem from '../record_item/'
import style from './style'

const {View, Text, ListView, NativeModules, TouchableOpacity} = React

export default class RecordList extends React.Component {
  componentWillMount() {
    const dateSource = new ListView.DataSource({
      rowHasChanged: (row, newRow) => row.title !== newRow.title}
    )

    this.setState({
      dataSource: dateSource.cloneWithRows(this.props.records),
    })
  }

  render() {
    return <View style={style.container}>
      <TouchableOpacity onPress={this._onShowRecorder.bind(this)} >
        <View style={style.returnRecord}>
          <View style={style.returnButton}>
            <Text style={style.returnText}>
              Record
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={style.list}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(row) => {
            return <RecordItem
              title={row.title}
              onPlay={this._onPlay.bind(this, row.filename)}
              onStop={this._onStop.bind(this)}
            />
          }}
        />
      </View>
    </View>
  }

  _onShowRecorder() {
    this.props.navigateToRecorder()
  }

  _onPlay(filename, callback, stopPlayingCallback) {
    NativeModules.RecordModel.readById(filename, (stringUri) => {
      NativeModules.Microphone.startPlaying(stringUri, () => {
        callback()
        NativeModules.Microphone.suddenlyStoppedPlaying(stopPlayingCallback)
        NativeModules.Microphone.playsNewSound(stopPlayingCallback)
      })
    })
  }

  _onStop(callback) {
    NativeModules.Microphone.stopPlaying(callback)
  }
}
