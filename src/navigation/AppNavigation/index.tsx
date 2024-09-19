import * as React from 'react';
import AppScreens, {AppScreensParamList} from './AppScreens';
import BlockScreen from '~/screens/BlockScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingScreen from '~/screens/SettingScreen';
import TransactionNavigator from './TransactionNavigator';
import SettingsIcon from '../../assets/icons/iconSettings.svg';
import TransactionsIcon from '../../assets/icons/iconTransactions.svg';
import BlocksIcon from '../../assets/icons/iconBlocks.svg';
import {useTranslation} from 'react-i18next';
import {useAppTheme} from '~/container/AppThemeProvider';
import BlockNavigator from './BlockNavigator';

const Tab = createBottomTabNavigator<AppScreensParamList>();

const AppNavigation = () => {
  const {t} = useTranslation('common');
  const {colors} = useAppTheme();
  return (
    <Tab.Navigator initialRouteName={AppScreens.BLOCK_NAVIGATOR}>
      <Tab.Screen
        name={AppScreens.BLOCK_NAVIGATOR}
        component={BlockNavigator}
        options={{
          title: t('blockScreen.blockTitle'),
          tabBarLabel: t('blockScreen.blockTitle'),
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({color}): JSX.Element => {
            return <BlocksIcon fill={color} testID="navigateToBlockScreen" />;
          },
          tabBarAccessibilityLabel: t('blockScreen.blockTitle'),
        }}
      />
      <Tab.Screen
        name={AppScreens.TRANSACTION_NAVIGATOR}
        component={TransactionNavigator}
        options={{
          title: t('transactionsScreen.transactionTitle'),
          tabBarLabel: t('transactionsScreen.transactionTitle'),
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({color}): JSX.Element => {
            return (
              <TransactionsIcon
                stroke={color}
                testID="navigateToTransactionScreen"
              />
            );
          },
          tabBarAccessibilityLabel: t('transactionsScreen.transactionTitle'),
        }}
      />
      <Tab.Screen
        name={AppScreens.SETTING_SCREEN}
        component={SettingScreen}
        options={{
          title: t('settingScreen.settingTitle'),
          tabBarLabel: t('settingScreen.settingTitle'),
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({color}): JSX.Element => {
            return (
              <SettingsIcon testID="navigateToSettingsScreen" fill={color} />
            );
          },
          tabBarAccessibilityLabel: t('settingScreen.settingTitle'),

          // tabBarIcon: ({color}) => <SettingsIcon height={70} fill={color} />,
          // headerTitle: t('settingScreen.settingTitle'),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation;
