/*
   Popup / Alert component which does not cover the whole screen
 */
import {t} from 'i18next';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {List} from 'react-native-paper';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Account, Block} from '~/api/types';
import StyledText from '~/components/Text';
import {useAppTheme} from '~/container/AppThemeProvider';
import {convertTimeStamp} from '~/utils/helpers/timeUtils';

interface BlockListItemProps {
  onPress: (blockId: string) => void;
  timestamp: Block['timestamp'];
  generator: Account;
  blokId: Block['id'];
}

export const ITEM_HEIGHT = verticalScale(55);

const BlockListItem: React.FC<BlockListItemProps> = ({
  timestamp,
  onPress,
  blokId,
  generator,
}) => {
  const {colors} = useAppTheme();

  const onBlockListItemPress = useCallback(() => {
    onPress(blokId);
  }, [onPress]);

  const renderSendInfo = useMemo(
    () => (
      <View>
        <StyledText h5>
          {t('blockScreen.sender')}
          <StyledText h5 bold textColor={colors.primary}>
            {' : '}
            {generator.name}
          </StyledText>
        </StyledText>
        <StyledText
          ellipsizeMode="middle"
          p
          numberOfLines={1}
          style={styles.titleStyle}>
          {generator.address}
        </StyledText>
      </View>
    ),
    [generator.address, generator.name, t],
  );

  const renderDate = useMemo(
    () => <StyledText p>{convertTimeStamp(timestamp)}</StyledText>,
    [convertTimeStamp, timestamp],
  );

  return (
    <List.Item
      testID={`block.${blokId}`}
      title={blokId}
      titleEllipsizeMode="middle"
      titleStyle={styles.titleStyle}
      right={() => renderDate}
      description={renderSendInfo}
      onPress={onBlockListItemPress}
      style={styles.listContainerStyle}
    />
  );
};

const styles = StyleSheet.create({
  listContainerStyle: {
    maxHeight: ITEM_HEIGHT,
  },
  titleStyle: {
    maxWidth: moderateScale(250),
  },
});
export default React.memo(BlockListItem);
