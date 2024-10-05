import { combineReducers } from '@reduxjs/toolkit';
import openAIchatsReducer from './openAIchats/openAIchats';
import appConfigReducer from './appConfig/appConfig';

const rootReducer = combineReducers({
  openAIchats: openAIchatsReducer,
  appConfig: appConfigReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
