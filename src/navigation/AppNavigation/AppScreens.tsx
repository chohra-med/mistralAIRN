import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Block, Transaction} from '~/api/types';

export enum AppScreens {
  TABBED_APP = 'TabbedApp',
  BLOCK_SCREEN = 'BlockScreen',
  SETTING_SCREEN = 'SettingScreen',
  TRANSACTION_NAVIGATOR = 'TransactionNavigator',
  BLOCK_NAVIGATOR = 'BlockNavigator',
  TRANSACTION_SCREEN = 'TransactionScreen',
  TRANSACTION_ITEM_SCREEN = 'TransactionItemScreen',
  BLOCK_ITEM_SCREEN = 'BlockItemScreen',
}

export type AppScreensParamList = {
  [AppScreens.TABBED_APP]: undefined;
  [AppScreens.BLOCK_SCREEN]: undefined;
  [AppScreens.SETTING_SCREEN]: undefined;
  [AppScreens.BLOCK_NAVIGATOR]: undefined;
  [AppScreens.TRANSACTION_NAVIGATOR]: undefined;
  [AppScreens.TRANSACTION_SCREEN]: undefined;
  [AppScreens.TRANSACTION_ITEM_SCREEN]: {transactionID: Transaction['id']};
  [AppScreens.BLOCK_ITEM_SCREEN]: {blockID: Block['id']};
};

export type AppScreenProps<T extends AppScreens> = {
  navigation: StackNavigationProp<AppScreensParamList, T>;
  route: RouteProp<AppScreensParamList, T>;
};
export default AppScreens;
