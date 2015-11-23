import React from 'react-native'
import Button from '../../_lib/button/'
import style from './style'

const {View, Text, ListView, NativeModules} = React

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
      <Button onPress={this._onShowRecorder.bind(this)}>
        🎤
      </Button>
      <View style={style.list}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(row) => {
            return <View>
              <Button onPress={this._onPlay.bind(this, row.filename)}>
                ⏯
              </Button>
              <Text>{row.title}</Text>
            </View>
          }}
        />
      </View>
    </View>
  }

  _onShowRecorder() {
    this.props.navigateToRecorder()
  }

  _onPlay(filename) {
    NativeModules.Microphone.startPlaying(filename, () => {
      this.setState({playing: true})
    })
  }
}
