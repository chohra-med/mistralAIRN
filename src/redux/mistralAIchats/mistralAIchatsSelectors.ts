import { createSelector } from '@reduxjs/toolkit';
import { RootState, } from '../store';



const selectMistralAIChatsState = (state: RootState) => state.mistralAIchats;

export const selectAllMistralAIChats = createSelector(
    [selectMistralAIChatsState],
    (mistralAIchats) => mistralAIchats.messageList
);
