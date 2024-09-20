import * as React from 'react';
import AppScreens, {AppScreensParamList} from './AppScreens';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '~/screens/HomeScreen';
import PropertyScreen from '~/screens/HomeScreen/screens/PropertyScreen';

const Stack = createStackNavigator<AppScreensParamList>();

const options = {
  animationEnabled: true,
  headerShown: false,
};

const PropertyNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={AppScreens.PROPERTY_SCREEN}>
      <Stack.Screen
        name={AppScreens.PROPERTY_SCREEN}
        component={HomeScreen}
        options={options}
      />
      <Stack.Group>
        <Stack.Screen
          name={AppScreens.PROPERTY_ITEM_SCREEN}
          component={PropertyScreen}
          options={options}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default PropertyNavigator;
