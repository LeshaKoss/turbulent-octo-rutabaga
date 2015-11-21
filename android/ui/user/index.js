import React from 'react-native'
import Button from '../button'
import style from './style'

const {View} = React

export default class User extends React.Component {
  render() {
    debugger
    return <View style={style.container}>
      <Button onPress={this._onArrowPress.bind(this)}>
        ⬅️
      </Button>
    </View>
  }

  _onArrowPress() {
    this.props.navigator.pop()
  }
}

