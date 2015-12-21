import React from 'react-native'

const {StyleSheet} = React

export default StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: 'grey',
  },

  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 50,
  },

  form: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },

  title: {
    height: 60,
    fontSize: 25,
    borderColor: 'gray',
    borderWidth: 1,
  },
})
