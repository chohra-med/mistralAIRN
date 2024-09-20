import * as React from 'react';
import AppScreens, {AppScreensParamList} from './AppScreens';
import {createStackNavigator} from '@react-navigation/stack';
import  { PropertyScreen } from '~/screens/PropertyScreen';
import PropertyItemScreen from '~/screens/PropertyScreen/PropertyItemScreen';

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
        component={PropertyScreen}
        options={options}
      />
      <Stack.Group >
        <Stack.Screen
          name={AppScreens.PROPERTY_ITEM_SCREEN}
          component={PropertyItemScreen}
          options={options}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default PropertyNavigator;
