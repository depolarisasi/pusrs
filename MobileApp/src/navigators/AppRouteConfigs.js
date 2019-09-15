import {
  createStackNavigator
} from 'react-navigation-stack';
import LoggedOut from './../screens/LoggedOut';
import LogIn from './../screens/LogIn';
import SignUp from './../screens/SignUp';
import Home from './../screens/Home';

const AppRouteConfigs = createStackNavigator({
  LoggedOut: { screen: LoggedOut },
  LogIn: { screen: LogIn },
  SignUp: { screen: SignUp },
  Home: { screen: Home },
});

export default AppRouteConfigs;