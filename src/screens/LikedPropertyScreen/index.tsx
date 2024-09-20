import {SafeAreaView} from 'react-native-safe-area-context';
import {containerStyle} from '~/theme/globalStyling/cards';
import LikedPropertyList from './components/LikedPropertyList';

export const LikedPropertyScreen = (): JSX.Element => {
  return (
    <SafeAreaView
      testID="screen.transactionScreen"
      style={containerStyle.container}>
      <LikedPropertyList />
    </SafeAreaView>
  );
};

export default LikedPropertyScreen;
