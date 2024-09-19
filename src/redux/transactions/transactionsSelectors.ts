import { RootState } from '../store';
import { Transaction } from 'api/types';
import transactionsAdapter from './transactionsAdapter';


const transactionsSelectors = transactionsAdapter.getSelectors<RootState>(
  (state) => state.transactions
)

// And then use the selectors to retrieve values
export const selectAllTransactions = transactionsSelectors.selectAll


export const selectTransactionById =
  (transactionId: Transaction['id']) => (state: RootState) =>
    transactionsSelectors.selectById(state, transactionId);


