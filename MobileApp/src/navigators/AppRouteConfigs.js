import {
  createStackNavigator
} from 'react-navigation-stack';
import LogIn from './../screens/LogIn';

const AppRouteConfigs = createStackNavigator({
  LoggedOut: { screen: LogIn },
  LogIn: { screen: LogIn },
});

export default AppRouteConfigs;