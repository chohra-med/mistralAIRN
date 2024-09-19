import {useCallback, useContext, useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useBlocks} from '~/hooks/useBlocks';
import useActions from '~/hooks/useActions';
import {blocksActions} from '~/redux/blocks/blocks';
import {GetBlocksResponse} from '~/redux/blocks/blocksModel';
import BlockList from './components/BlockList';
import {containerStyle} from '~/theme/globalStyling/cards';
import StyledButton from '~/components/Button';
import ButtonComponent from '~/components/DocMorrisButton';
import {Text} from 'react-native-paper';

export const BlockScreenView = (): JSX.Element => {
  const {blocks} = useBlocks();
  const [onNewBlockAdded] = useActions([blocksActions.onNewBlockAdded]);

  const [isEnable, setIsEnable] = useState(false);
  const onPressButton = useCallback(() => {
    console.log('Button Pressed');
    setIsEnable(prevState => !prevState);
  }, []);

  const onPressDocmorris = useCallback(() => {
    console.log(' Button Pressed Docmorris');
    setIsEnable(prevState => !prevState);
  }, []);

  

  if (!blocks.length) {
    // Show loader when fetching first page data.
    return <ActivityIndicator size={'large'} />;
  }

  return (
    <SafeAreaView style={containerStyle.container} testID="screen.blockScreen">
      <StyledButton onPress={onPressButton} title="Press Me" />
      <View style={{height: 20}} />
      <ButtonComponent
        buttonKey={'test'}
        onPress={onPressDocmorris}
        text="DocMorris"
        variant={'primary'}
      />
      <View style={{height: 20}} />
      <Text>{isEnable ? 'Enabled' : 'Disabled'}</Text>
      {/* <BlockList blocks={blocks} /> */}
    </SafeAreaView>
  );
};

const BlockScreen = (): JSX.Element => {
  return (
      <BlockScreenView />
  );
};

export default BlockScreen;
