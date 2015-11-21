import React from 'react-native'
import style from './style'

const {TouchableOpacity, View, Text} = React

export default class Button extends React.Component {
  render() {
    return <TouchableOpacity onPress={this.props.onPress}>
      <View style={style.view}>
        <Text style={style.text}>
          {this.props.children}
        </Text>
      </View>
    </TouchableOpacity>
  }
}

