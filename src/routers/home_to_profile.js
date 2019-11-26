import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import ProfileDetail from '../screens/profileDetail'
import Home from '../screens/home'

const home_to_profile = createAppContainer(createStackNavigator(
    {
        home: Home,
        detail: ProfileDetail
    },
    {
        headerMode:'none'
    }
))

export default home_to_profile