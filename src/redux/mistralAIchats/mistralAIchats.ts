import { createSlice } from '@reduxjs/toolkit';

import * as  mistralAIchatsActions from './mistralAIchatsActions';
import * as
  mistralAIchatsSelectors from './mistralAIchatsSelectors';
import { MessagesList } from './mistralAIchatsModel';


type MistralAIChatsInitialState = {
  messageList: MessagesList;
};

const initialState: MistralAIChatsInitialState = {
  messageList: [],
};

const propertiesSlice = createSlice({
  name: 'mistralAIChats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(
    //   mistralAIchatsActions.completeChatMistralAI.fulfilled,
    //   (state, action) => {
    //     state.messageList = [...state.messageList, ...action.payload];
    //     return state;
    //   }
    // );
    builder.addCase(
      mistralAIchatsActions.completeChatMistralAI.fulfilled,
      (state, action) => {
        state.messageList = [...state.messageList, ...action.payload];
        return state;
      }
    );
  },
});

export {
  mistralAIchatsActions,
  mistralAIchatsSelectors
};

export default propertiesSlice.reducer;



