import React from 'react-native'

const {StyleSheet} = React

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'grey',
  },

  returnRecord: {
    backgroundColor: 'white',
    alignItems: 'center',
  },

  returnButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    margin: 5,
  },
})
