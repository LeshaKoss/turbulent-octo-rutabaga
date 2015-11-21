import React from 'react-native'
import Button from '../../_lib/button/'
import style from './style'

const {View, Text} = React

export default class RecordList extends React.Component {
  render() {
    return <View style={style.container}>
      <Button onPress={this._onShowRecorder.bind(this)}>
        🎤
      </Button>
      <View style={style.list}>
        <Text>Nothing here yet</Text>
      </View>
    </View>
  }

  _onShowRecorder() {
    this.props.navigateToRecorder()
  }
}

