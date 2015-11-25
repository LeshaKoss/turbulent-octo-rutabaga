import React from 'react-native'
import style from './style'

const {View, Text, TouchableOpacity} = React

export default class RecordItem extends React.Component {
  render() {
    return <TouchableOpacity onPress={this.props.onPlay}>
      <View style={style.container}>
        <View style={style.playButton}>
          <Text style={style.playButtonText}>
            Play
          </Text>
        </View>
        <Text style={style.title}>{this.props.title}</Text>
      </View>
    </TouchableOpacity>
  }
}
