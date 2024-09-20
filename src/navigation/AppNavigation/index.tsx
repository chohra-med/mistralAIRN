import * as React from 'react';
import AppScreens, {AppScreensParamList} from './AppScreens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingScreen from '~/screens/SettingScreen';
import SettingsIcon from '../../assets/icons/iconSettings.svg';
import {useTranslation} from 'react-i18next';
import {useAppTheme} from '~/container/AppThemeProvider';
import PropertyNavigator from './PropertyNavigator';
import LikedPropertyList from '~/screens/LikedPropertyScreen/components/LikedPropertyList';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator<AppScreensParamList>();

const AppNavigation = () => {
  const {t} = useTranslation('common');
  const {colors} = useAppTheme();
  return (
    <Tab.Navigator initialRouteName={AppScreens.PROPERTY_NAVIGATOR}>
      <Tab.Screen
        name={AppScreens.PROPERTY_NAVIGATOR}
        component={PropertyNavigator}
        options={{
          title: t('propertyScreen.propertyTitle'),
          tabBarLabel: t('propertyScreen.propertyTitle'),
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({color, focused}): JSX.Element => {
            return (
              <Icon
                name={focused ? 'home' : 'home-outline'}
                size={24}
                color={color}
                testID="navigateToPropertyScreen"
              />
            );
          },
          tabBarAccessibilityLabel: t('propertyScreen.propertyTitle'),
        }}
      />
      <Tab.Screen
        name={AppScreens.LIKED_PROPERTY_SCREEN}
        component={LikedPropertyList}
        options={{
          title: t('likedPropertyScreen.likedPropertyTitle'),
          tabBarLabel: t('likedPropertyScreen.likedPropertyTitle'),
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({color, focused}): JSX.Element => {
            return (
              <Icon
                name={focused ? 'heart' : 'heart-outline'}
                size={24}
                color={color}
                testID="navigateToLikedPropertyScreen"
              />
            );
          },
          tabBarAccessibilityLabel: t('likedPropertyScreen.likedPropertyTitle'),
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
