import {Dimensions, Navigator} from 'react-native'

export default Object.assign({}, Navigator.SceneConfigs.FloatFromRight, {
  springTension: 100,
  springFriction: 1,
})

