import { openAIApiAxios } from '../Api';
import { ROUTE_CHAT_COMPLETION } from './routes';
import { Config } from 'react-native-config'
class chatApi {

  completeChat(prompt: string) {
    const newMessage: any = {
      role: 'user',
      content: prompt,
    };
    const body = JSON.stringify({
      messages: [newMessage],
      model: 'gpt-3.5-turbo',
      // Stream API

      stream: false,
    });
    return openAIApiAxios(ROUTE_CHAT_COMPLETION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Config.OPEN_AI_TOKEN}`,
      },
      data: body,
    });


  }
}
export default new chatApi();
