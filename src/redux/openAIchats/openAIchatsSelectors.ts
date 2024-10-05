import { createSelector } from '@reduxjs/toolkit';
import { RootState, } from '../store';



const selectOpenAIChatsState = (state: RootState) => state.openAIchats;

export const selectAllOpenAIChats = createSelector(
    [selectOpenAIChatsState],
    (openAIchats) => openAIchats.messageList
);
