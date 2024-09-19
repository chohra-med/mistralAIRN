import React, { useCallback, useEffect, useState } from 'react';
import { Transaction } from '~/api/types';
import { useSelector } from 'react-redux';
import useActions from '~/hooks/useActions';
import { transactionActions, transactionsSelectors } from '~/redux/transactions/transactions';
import { NB_TRANSACTIONS_PER_PAGE } from '~/api/constant';


export const useTransactions = () => {
  const transactions: Transaction[] = useSelector(transactionsSelectors.selectAllTransactions);
  const [getTransactions] = useActions([transactionActions.getTransactions]);

  const [transactionsOffset, setTransactionsOffset] = useState(10);
  const [isLoading, setIsLoading] = useState(false);


  const fetchNextTransactionList = useCallback(
    () => {
      setIsLoading(true);
      getTransactions({ offset: transactionsOffset }).then(() => {
        setTransactionsOffset(prevOffset => prevOffset + NB_TRANSACTIONS_PER_PAGE);
        setIsLoading(false);
      });

    },
    [getTransactions, transactionsOffset, setIsLoading, isLoading],
  );

  useEffect(() => {
    getTransactions({ offset: 0 })
  }, []);

  return { transactions, fetchNextTransactionList, isLoading };
};
