import {SafeAreaView} from 'react-native-safe-area-context';

import {containerStyle} from '~/theme/globalStyling/cards';
import ConversationList from './components/ConversationList';

export const HomeScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={containerStyle.container} testID="screen.homeScreen">
      <ConversationList />
    </SafeAreaView>
  );
};

export default HomeScreen;
