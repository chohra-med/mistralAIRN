import { createAsyncThunk } from '@reduxjs/toolkit';
import transactionsApi from '~/api/transactionsApi/transactionsApi';
import Logger from '~/utils/helpers/Logger';
import { GetTransactionsPayload, GetTransactionsResponse } from './transactionsModel';



export const getTransactions = createAsyncThunk<
  GetTransactionsResponse,
  GetTransactionsPayload
>(
  'transactions/getTransactions',
  async (payload) => {
    try {
      const response = await transactionsApi.getTransactions(payload);
      return response.data;
    } catch (error) {
      Logger.trace('loadAllTransactions: Error occurred');
      Logger.recordError(error as Error);
    }
  },
);




