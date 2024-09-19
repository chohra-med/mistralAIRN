import {t} from 'i18next';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {List} from 'react-native-paper';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Block, Transaction} from '~/api/types';
import StyledText from '~/components/Text';
import {useAppTheme} from '~/container/AppThemeProvider';

interface TransactionListItemProps {
  onPress: (blockId: string) => void;
  size: Transaction['size'];
  fee: Transaction['fee'];
  transactionId: Block['id'];
}

export const TRANSACTION_ITEM_HEIGHT = verticalScale(55);

const TransactionListItem: React.FC<TransactionListItemProps> = ({
  size,
  onPress,
  transactionId,
  fee,
}) => {
  const {colors} = useAppTheme();

  const onBlockListItemPress = useCallback(() => {
    onPress(transactionId);
  }, [onPress]);

  const renderFee = useMemo(
    () => (
      <View>
        <StyledText h5>
          {t('transactionsScreen.feeAmount')}
          <StyledText h5 bold textColor={colors.primary}>
            {' : '}
            {fee}
          </StyledText>
        </StyledText>
      </View>
    ),
    [fee, t],
  );

  const renderSize = useMemo(
    () => (
      <View style={styles.sizeContainer}>
        <List.Icon icon="arrow-split-horizontal" />
        <StyledText h5>{size}</StyledText>
      </View>
    ),
    [size],
  );

  return (
    <List.Item
      testID={`transaction.${transactionId}`}
      title={transactionId}
      titleEllipsizeMode="middle"
      titleStyle={styles.titleStyle}
      right={() => renderSize}
      description={renderFee}
      onPress={onBlockListItemPress}
      style={styles.listContainerStyle}
    />
  );
};

const styles = StyleSheet.create({
  listContainerStyle: {
    maxHeight: TRANSACTION_ITEM_HEIGHT,
  },
  sizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleStyle: {
    maxWidth: moderateScale(250),
  },
});
export default React.memo(TransactionListItem);
