import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {Block} from '~/api/types';
import BlockListItem, {ITEM_HEIGHT} from './BlockListItem';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {OnAppScreenNavigationProps} from '~/navigation/types';
import AppScreens from '~/navigation/AppNavigation/AppScreens';

interface BlockListProps {
  blocks: Block[];
}

const BlockList: React.FC<BlockListProps> = ({blocks}) => {
  const navigation = useNavigation<OnAppScreenNavigationProps>();

  const onPressBlock = useCallback(
    (blockId: Block['id']) => {
      navigation.navigate({
        name: AppScreens.BLOCK_ITEM_SCREEN,
        params: {
          blockID: blockId,
        },
      });
    },
    [navigation],
  );

  const getItemLayout = useCallback(
    (data: Block[] | null | undefined, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  const renderBlockItem = useCallback(
    ({item}: {item: Block}) => {
      return (
        <BlockListItem
          onPress={onPressBlock}
          blokId={item.id}
          timestamp={item.timestamp}
          generator={item.generator}
        />
      );
    },
    [onPressBlock, blocks],
  );

  return (
    <FlatList
      ItemSeparatorComponent={() => <Divider />}
      data={blocks}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      renderItem={renderBlockItem}
      keyExtractor={(item: Block) => item?.id}
      getItemLayout={getItemLayout}
    />
  );
};

export default React.memo(BlockList);
