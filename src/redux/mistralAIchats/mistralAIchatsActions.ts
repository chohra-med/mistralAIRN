import { createAsyncThunk } from '@reduxjs/toolkit';
import Logger from '~/utils/helpers/Logger';
import chatApi from '~/api/chatApi/chatApi';
import { AxiosError } from 'axios';
import { IMessage } from 'react-native-gifted-chat'
import { CompleteChatQuery, CompleteChatResponse } from './mistralAIchatsModel';
import { RootState } from '../rootReducer';
import { AI_CHAT, USER_CHAT } from '~/api/constant';



export const completeChatMistralAI = createAsyncThunk<
  CompleteChatResponse,
  CompleteChatQuery,
  { state: RootState }
>('mistralAIchats/completeChatMistralAI', async ({ prompt, index }) => {
  const userMessage: IMessage = {
    _id: index,
    text: prompt,
    createdAt: new Date().getTime(),
    user: USER_CHAT,
  }
  try {
    const response = await chatApi.completeChatMistralAI(prompt);
    console.log('Chat:', JSON.stringify(response.data, null, 2));
    const data = await response.data;

    const chatGptAnswer: IMessage = {
      _id: index + 1,
      text: data.choices[0].message.content,
      createdAt: new Date().getTime(),
      user: AI_CHAT,
    };

    return [userMessage, chatGptAnswer];
  } catch (error) {
    console.error('Error generating response:', error);
    Logger.recordError(error as Error);
    Logger.logApiError(error as AxiosError);
    throw error;
  }
});

// export const completeChat = createAsyncThunk<
//   CompleteChatResponse,
//   CompleteChatQuery,
//   { state: RootState }
// >('mistralAIchats/completeChat', async ({ prompt, index }) => {

//   try {
//     const userMessage: IMessage = {
//       _id: index,
//       text: prompt,
//       createdAt: new Date().getTime(),
//       user: USER_CHAT,
//     }

//     const response = await chatApi.completeChat(prompt);
//     const data = await response.data;

//     const chatGptAnswer: IMessage = {
//       _id: index + 1,
//       text: data.choices[0].message.content,
//       createdAt: new Date().getTime(),
//       user: AI_CHAT,
//     };

//     return [userMessage, chatGptAnswer];
//   } catch (error) {
//     console.error('Error generating response:', error);
//     Logger.recordError(error as Error);
//     Logger.logApiError(error as AxiosError);
//     throw error;
//   }
// });
