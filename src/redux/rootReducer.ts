import { combineReducers } from '@reduxjs/toolkit';
import mistralAIchatsReducer from './mistralAIchats/mistralAIchats';
import appConfigReducer from './appConfig/appConfig';

const rootReducer = combineReducers({
  mistralAIchats: mistralAIchatsReducer,
  appConfig: appConfigReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
