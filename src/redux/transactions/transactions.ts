import { createSlice } from '@reduxjs/toolkit';

import * as  transactionActions from './transactionsActions';
import * as transactionsSelectors from './transactionsSelectors';
import transactionsAdapter from './transactionsAdapter';

const initialState = transactionsAdapter.getInitialState();


const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      transactionActions.getTransactions.fulfilled,
      (state, action) => {
        if (action.payload) {
          const { meta, data } = action.payload;
          if (meta.offset === 0) {
            // overwrite all transactions with initial load
            transactionsAdapter.setAll(state, data);
          } else {
            // pagination add transactions
            transactionsAdapter.addMany(state, data);
          }
        }
      },
    );


  },
});

export { transactionActions, transactionsSelectors };

export default transactionsSlice.reducer;



