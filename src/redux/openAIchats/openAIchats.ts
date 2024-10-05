import { createSlice } from '@reduxjs/toolkit';

import * as  openAIchatsActions from './openAIchatsActions';
import * as
  openAIchatsSelectors from './openAIchatsSelectors';
import { MessagesList } from './openAIchatsModel';


type OpenAIChatsInitialState = {
  messageList: MessagesList;
};

const initialState: OpenAIChatsInitialState = {
  messageList: [],
};

const propertiesSlice = createSlice({
  name: 'openAIChats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      openAIchatsActions.completeChat.fulfilled,
      (state, action) => {
        state.messageList = [...state.messageList, ...action.payload];
        return state;
      }
    );
  },
});

export {
  openAIchatsActions,
  openAIchatsSelectors
};

export default propertiesSlice.reducer;



