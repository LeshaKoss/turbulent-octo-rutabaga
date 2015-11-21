import React from 'react-native'
import Button from '../_lib/button/'
import style from './style'

const {View, TextInput} = React

export default class Draft extends React.Component {
  componentWillMount() {
    this.setState({title: ''})
  }

  render() {
    return <View style={style.container}>
      <TextInput
        style={style.title}
        onChangeText={(title) => this.setState({title})}
        value={this.state.title}
      />
      <Button onPress={this._onAccept.bind(this)}>
        ✔️
      </Button>
      <Button onPress={this._onCancel.bind(this)}>
        ✖️
      </Button>
    </View>
  }

  _onAccept() {
    const {title} = this.state
    this.props.createRecord({title})
    this.props.navigateToUser()
  }

  _onCancel() {
    this.props.navigateToUser()
  }
}

