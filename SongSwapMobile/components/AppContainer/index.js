import React from 'react'; 
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Main from '../../containers/Main';
import History from '../../containers/History';
import User from '../../containers/User'; 
import Received from '../../containers/Received';

const screens = { 
    'Swap': { 
      screen: Main,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name='exchange' size={20} color={tintColor}/> 
        )
      }
    },
    'Last Song': { 
      screen: Received ,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name='undo' size={20} color={tintColor}/> 
        )
      }
    },
    'Received': { 
      screen: History,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name='history' size={20} color={tintColor}/> 
        )
      }
    },
    'User': {
      screen: User,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name='user' size={20} color={tintColor} />
        )
      }
    }
}

const MainNavigator = createBottomTabNavigator(screens, { initialRouteName: 'Swap' }); 
const AppContainer = createAppContainer(MainNavigator); 

export default AppContainer; 