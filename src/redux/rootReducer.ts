import { combineReducers } from '@reduxjs/toolkit';
import blocksReducer from './blocks/blocks';
import transactionsReducer from './transactions/transactions';
import appConfigReducer from './appConfig/appConfig';

const rootReducer = combineReducers({
  blocks: blocksReducer,
  transactions: transactionsReducer,
  appConfig: appConfigReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
