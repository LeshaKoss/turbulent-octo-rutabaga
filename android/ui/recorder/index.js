import React from 'react-native'
import Button from '../button'
import style from './style'

const {View} = React

export default class Recorder extends React.Component {
  render() {
    return <View style={style.container}>
      <Button onPress={this._onMicPress.bind(this)}>
        🎤
      </Button>
      <Button onPress={this._onArrowPress.bind(this)}>
        ➡️
      </Button>
    </View>
  }

  _onMicPress() {
    this.props.navigator.push({stage: 'draft'})
  }

  _onArrowPress() {
    this.props.navigator.push({stage: 'user'})
  }
}

