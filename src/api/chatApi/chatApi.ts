import { mistralAIApiAxios } from '../Api';
import { ROUTE_CHAT_COMPLETION } from './routes';
import { Config } from 'react-native-config'

class chatApi {

  async completeChatMistralAI(prompt: string) {
    const newMessage: any = {
      role: 'user',
      content: prompt,
    };

    const requestBody = {
      model: "mistral-small-latest",
      messages: [newMessage],


    }
    return mistralAIApiAxios(ROUTE_CHAT_COMPLETION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Config.MISTRAL_AI_TOKEN}`,
      },
      data: requestBody
    })

  }
}
export default new chatApi();
