import React from 'react-native'
import style from './style'

const {Text, View, Animated} = React

export default class InstagramForSounds extends React.Component {
  componentWillMount() {
    const angle = new Animated.Value(0)
    this.setState({angle})
  }

  componentDidMount() {
    Animated.timing(
      this.state.angle,
      {
        toValue: 10000,
        duration: 10000
      }
    ).start()
  }

  render() {
    const animation = {
      transform: [
        {rotate: this.state.angle.interpolate({
          inputRange: [0, 1],
          outputRange: [
            '0deg', '360deg'
          ],
        })},
      ],
    }

    return (
      <View style={style.container}>
        <Animated.View style={animation}>
          <Text style={style.poop}>
            💩
          </Text>
        </Animated.View>
      </View>
    );
  }
}

