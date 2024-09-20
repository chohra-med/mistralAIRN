import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { Property} from '~/api/types';

export enum AppScreens {
  TABBED_APP = 'TabbedApp',
  PROPERTY_SCREEN = 'PropertyScreen',
  LIKED_PROPERTY_SCREEN = 'LikedPropertyScreen',
  PROPERTY_ITEM_SCREEN = 'PropertyItemScreen',
  PROPERTY_NAVIGATOR = 'PropertyNavigator',
  SETTING_SCREEN = 'SettingScreen',

}

export type AppScreensParamList = {
  [AppScreens.TABBED_APP]: undefined;
  [AppScreens.PROPERTY_SCREEN]: undefined;
  [AppScreens.SETTING_SCREEN]: undefined;
  [AppScreens.LIKED_PROPERTY_SCREEN]: undefined;
  [AppScreens.PROPERTY_NAVIGATOR]: undefined;
  [AppScreens.PROPERTY_ITEM_SCREEN]: {propertyID: Property['id']};
};

export type AppScreenProps<T extends AppScreens> = {
  navigation: StackNavigationProp<AppScreensParamList, T>;
  route: RouteProp<AppScreensParamList, T>;
};
export default AppScreens;
