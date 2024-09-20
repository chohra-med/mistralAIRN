import { combineReducers } from '@reduxjs/toolkit';
import propertiesReducer from './properties/properties';
import appConfigReducer from './appConfig/appConfig';

const rootReducer = combineReducers({
  properties: propertiesReducer,
  appConfig: appConfigReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
