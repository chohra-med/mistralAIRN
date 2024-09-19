import { createEntityAdapter } from '@reduxjs/toolkit';
import { Transaction } from '~/api/types';

export default createEntityAdapter<Transaction>({
  selectId: transaction => transaction.id,
});
