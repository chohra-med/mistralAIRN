import * as React from 'react';
import AppScreens, {AppScreensParamList} from './AppScreens';
import {createStackNavigator} from '@react-navigation/stack';
import BlockScreen from '~/screens/BlockScreen';
import BlockItemScreen from '~/screens/BlockScreen/BlockItemScreen';

const Stack = createStackNavigator<AppScreensParamList>();

const options = {
  animationEnabled: true,
  headerShown: false,
};

const BlockNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={AppScreens.TRANSACTION_SCREEN}>
      <Stack.Screen
        name={AppScreens.BLOCK_SCREEN}
        component={BlockScreen}
        options={options}
      />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name={AppScreens.BLOCK_ITEM_SCREEN}
          component={BlockItemScreen}
          options={options}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default BlockNavigator;
