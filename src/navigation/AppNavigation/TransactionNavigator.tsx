import * as React from 'react';
import AppScreens, {AppScreensParamList} from './AppScreens';
import TransactionScreen from '~/screens/TransactionScreen';
import TransactionItemScreen from '~/screens/TransactionScreen/screens/TransactionItemScreen';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator<AppScreensParamList>();

const options = {
  animationEnabled: true,
  headerShown: false,
};

const TransactionNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={AppScreens.TRANSACTION_SCREEN}>
      <Stack.Screen
        name={AppScreens.TRANSACTION_SCREEN}
        component={TransactionScreen}
        options={options}
      />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name={AppScreens.TRANSACTION_ITEM_SCREEN}
          component={TransactionItemScreen}
          options={options}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default TransactionNavigator;
