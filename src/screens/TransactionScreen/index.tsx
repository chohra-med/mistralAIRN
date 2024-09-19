import {ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTransactions} from '~/hooks/useTransactions';
import TransactionList from './components/TransactionList';
import {containerStyle} from '~/theme/globalStyling/cards';

export const TransactionScreen = (): JSX.Element => {
  const {transactions, fetchNextTransactionList, isLoading} = useTransactions();

  if (!transactions.length && isLoading) {
    // Show loader when fetching first page data.
    return <ActivityIndicator size={'small'} />;
  }

  return (
    <SafeAreaView
      testID="screen.transactionScreen"
      style={containerStyle.container}>
      <TransactionList
        transactions={transactions}
        fetchNextTransactionList={fetchNextTransactionList}
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
};

export default TransactionScreen;
