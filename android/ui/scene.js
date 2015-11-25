import React from 'react-native'

const {Navigator} = React

export default Object.assign({}, Navigator.SceneConfigs.FloatFromRight, {
  springTension: 100,
  springFriction: 1,
})
