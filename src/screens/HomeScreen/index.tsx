import {SafeAreaView} from 'react-native-safe-area-context';

import {containerStyle} from '~/theme/globalStyling/cards';
import PropertyList from './components/PropertyList';

export const HomeScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={containerStyle.container} testID="screen.homeScreen">
      <PropertyList />
    </SafeAreaView>
  );
};

export default HomeScreen;
