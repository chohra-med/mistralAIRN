import * as React from 'react';
import AppScreens, {AppScreensParamList} from './AppScreens';
import {createStackNavigator} from '@react-navigation/stack';
import BlockScreen, { PropertyScreen } from '~/screens/PropertyScreen';
import BlockItemScreen from '~/screens/PropertyScreen/PropertyItemScreen';
import PropertyItemScreen from '~/screens/PropertyScreen/PropertyItemScreen';
import LikedPropertyList from '~/screens/LikedPropertyScreen/components/LikedPropertyList';

const Stack = createStackNavigator<AppScreensParamList>();

const options = {
  animationEnabled: true,
  headerShown: false,
};

const LikedPropertyNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={AppScreens.LIKED_PROPERTY_SCREEN}>
      <Stack.Screen
        name={AppScreens.LIKED_PROPERTY_SCREEN}
        component={LikedPropertyList}
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

export default LikedPropertyNavigator;
