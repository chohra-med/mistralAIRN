import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {Transaction} from '~/api/types';
import {ActivityIndicator, Divider} from 'react-native-paper';
import {NB_TRANSACTIONS_PER_PAGE} from '~/api/constant';
import TransactionListItem, {
  TRANSACTION_ITEM_HEIGHT,
} from './TransactionListItem';
import {useNavigation} from '@react-navigation/native';
import AppScreens from '~/navigation/AppNavigation/AppScreens';
import {OnAppScreenNavigationProps} from '~/navigation/types';

interface TransactionListProps {
  transactions: Transaction[];
  fetchNextTransactionList: () => void;
  isLoading: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  fetchNextTransactionList,
  isLoading,
}) => {
  const navigation = useNavigation<OnAppScreenNavigationProps>();

  const onPressTransaction = useCallback(
    (transactionID: Transaction['id']) => {
      navigation.navigate({
        name: AppScreens.TRANSACTION_ITEM_SCREEN,
        params: {
          transactionID: transactionID,
        },
      });
    },
    [navigation],
  );

  const renderSpinner = useCallback(() => {
    if (isLoading) {
      // Show loader at the end of list when fetching next page data.
      return <ActivityIndicator size={'large'} />;
    }
    return null;
  }, [isLoading]);

  const getItemLayout = useCallback(
    (data: Transaction[] | null | undefined, index: number) => ({
      length: TRANSACTION_ITEM_HEIGHT,
      offset: TRANSACTION_ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  const renderTransactionItem = useCallback(
    ({item}: {item: Transaction}) => {
      return (
        <TransactionListItem
          onPress={onPressTransaction}
          transactionId={item.id}
          size={item.size}
          fee={item.fee}
        />
      );
    },
    [onPressTransaction, transactions],
  );

  return (
    <FlatList
      data={transactions}
      ItemSeparatorComponent={() => <Divider />}
      initialNumToRender={NB_TRANSACTIONS_PER_PAGE}
      maxToRenderPerBatch={NB_TRANSACTIONS_PER_PAGE}
      renderItem={renderTransactionItem}
      keyExtractor={(item: Transaction) => item.id}
      onEndReached={fetchNextTransactionList}
      onEndReachedThreshold={0.8}
      getItemLayout={getItemLayout}
      ListFooterComponent={renderSpinner} // Loader when loading next page.
    />
  );
};

export default React.memo(TransactionList);
