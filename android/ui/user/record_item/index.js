import React from 'react-native'
import style from './style'

const {View, Text, TouchableOpacity} = React

export default class RecordItem extends React.Component {
  componentWillMount() {
    this.setState({playing: false})
  }

  render() {
    return <TouchableOpacity onPress={this._onPress.bind(this)}>
      <View style={style.container}>
        <View style={style.playButton}>
          <Text style={style.playButtonText}>
            {this.state.playing ? 'Stop' : 'Play'}
          </Text>
        </View>
        <Text style={style.title}>{this.props.title}</Text>
      </View>
    </TouchableOpacity>
  }

  _onPress() {
    if (this.state.playing) {
      this.props.onStop(() => {
        this.setState({playing: false})
        this.forceUpdate()
      })
    } else {
      this.props.onPlay(
        () => {
          this.setState({playing: true})
          this.forceUpdate()
        },
        () => {
          this.setState({playing: false})
          this.forceUpdate()
        }
      )
    }
  }
}
