import React from 'react-native'
import Button from '../_lib/button/'
import style from './style'

const {View, TextInput, NativeModules, TouchableOpacity, Text} = React

export default class Draft extends React.Component {
  componentWillMount() {
    this.setState({title: ''})
  }

  render() {
    return <View style={style.container}>
      <View style={style.toolbar}>
        <TouchableOpacity onPress={this._onCancel.bind(this)} >
          <View style={style.button}>
            <Text style={style.buttonText}>
              ✖️
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onAccept.bind(this)} >
          <View style={style.button}>
            <Text style={style.buttonText}>
              ✔️
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={style.form}>
        <TextInput
          style={style.title}
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
          placeholder={'Title'}
        />
      </View>
    </View>
  }

  _onAccept() {
    const {title} = this.state
    NativeModules.Microphone.processTitle(title, (text) => {
      this.props.createRecord({
        title: text,
        filename: this.props.filename
      })
      this.props.navigateToUser()
    })
  }

  _onCancel() {
    this.props.navigateToUser()
  }
}
