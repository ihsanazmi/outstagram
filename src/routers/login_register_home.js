import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Login from '../screens/login'
import Register from '../screens/register'
import MainTab from './home_explore_profile_post'


const MainStack = createAppContainer(createStackNavigator(
    {
        login: Login,
        register: Register,
        home: MainTab
    },
    {
        initialRouteName: 'register',
        headerMode: 'none'
    }
))

export default MainStack