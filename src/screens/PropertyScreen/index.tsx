import {useCallback, useContext, useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import { useProperties} from '~/hooks/useProperties';
import useActions from '~/hooks/useActions';
import { propertiesActions} from '~/redux/properties/properties';
import {containerStyle} from '~/theme/globalStyling/cards';
import { Property } from '~/api/types';
import { useNavigation } from '@react-navigation/native';
import AppScreens from '~/navigation/AppNavigation/AppScreens';
import { OnAppScreenNavigationProps } from '~/navigation/types';
import PropertyList from './components/PropertyList';

export const PropertyScreen = (): JSX.Element => {
  const {properties} = useProperties();

  console.log('properties', properties);
  if (!properties?.length) {
    // Show loader when fetching first page data.
    return <ActivityIndicator size={'large'} />;
  }

  return (
    <SafeAreaView style={containerStyle.container} testID="screen.blockScreen">
      <PropertyList properties={properties} />
    </SafeAreaView>
  );
};



export default PropertyScreen;
