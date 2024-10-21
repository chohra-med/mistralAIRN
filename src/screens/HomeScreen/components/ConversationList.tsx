import React, {useCallback, useEffect, useMemo, useState} from 'react';
import useActions from '~/hooks/useActions';
import {View} from 'react-native';
import {GiftedChat, IMessage, SendProps} from 'react-native-gifted-chat';

import {ActivityIndicator} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {
  mistralAIchatsActions,
  mistralAIchatsSelectors,
} from '~/redux/mistralAIchats/mistralAIchats';
import {AI_CHAT, USER_CHAT} from '~/api/constant';
import Logger from '~/utils/helpers/Logger';
import MainInput from './CustomizedInputProps';

const ConversationList: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setIsLoading] = useState(false);

  const mistralAiChats = useSelector(
    mistralAIchatsSelectors.selectAllMistralAIChats,
  );

  const [completeChatMistralAI] = useActions([
    mistralAIchatsActions.completeChatMistralAI,
  ]);

  useEffect(() => {
    // Load the initial chat messages
    setMessages(mistralAiChats);
  }, []);

  const onSend = useCallback(
    async (messagesToSend: IMessage[] = []) => {
      // append the message to send to the chat
      setMessages(previousMessages =>
        GiftedChat.append(messagesToSend, previousMessages),
      );
      setIsLoading(true);

      const index = messages.length + 1;

      completeChatMistralAI({prompt: messagesToSend[0].text, index})
        .unwrap()
        .then((newMessages: IMessage[][]) => {
          // Append the new messages to the chat
          setMessages(previousMessages =>
            GiftedChat.append(newMessages[1], previousMessages),
          );
        })
        .catch((error: Error) => {
          Logger.recordError(
            error,
            'Error generating response at ConversationList',
          );
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [
              {
                _id: index + 1,
                text: 'An error occurred while generating the response.',
                createdAt: new Date().getTime(),
                user: AI_CHAT,
              },
            ]),
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [messages, completeChatMistralAI],
  );

  const handleOnPressSend = useCallback(async (text: string) => {
    const newMessage: IMessage = {
      _id: messages.length + 1,
      text,
      createdAt: new Date().getTime(),
      user: USER_CHAT,
    };
    await onSend([newMessage]);
  }, []);
  const renderFooter = useCallback(() => {
    if (loading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#5BC0EB" />
        </View>
      );
    }
    return null;
  }, [loading]);

  const renderInput = useCallback((props: SendProps<IMessage>) => {
    return <MainInput onPressSend={handleOnPressSend} />;
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={USER_CHAT}
      renderChatFooter={renderFooter}
      renderInputToolbar={renderInput}
      showUserAvatar
      inverted={false}
      alwaysShowSend
      scrollToBottom
    />
  );
};

export default ConversationList;
