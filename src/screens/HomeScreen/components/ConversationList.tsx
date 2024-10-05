import React, {useCallback, useEffect, useMemo, useState} from 'react';
import useActions from '~/hooks/useActions';
import {View, Text, StyleSheet} from 'react-native';
import {GiftedChat, IMessage, Send, SendProps} from 'react-native-gifted-chat';

import {ActivityIndicator, Icon} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {
  openAIchatsActions,
  openAIchatsSelectors,
} from '~/redux/openAIchats/openAIchats';
import {useTranslation} from 'react-i18next';
import {AI_CHAT, USER_CHAT} from '~/api/constant';
import Logger from '~/utils/helpers/Logger';

const ConversationList: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setIsLoading] = useState(false);

  const {t} = useTranslation();
  const openAiChats = useSelector(openAIchatsSelectors.selectAllOpenAIChats);

  const [completeChat] = useActions([openAIchatsActions.completeChat]);

  useEffect(() => {
    // Load the initial chat messages
    setMessages(openAiChats);
  }, []);

  const onSend = useCallback(
    async (messagesToSend: IMessage[] = []) => {
      // append the message to send to the chat
      setMessages(previousMessages =>
        GiftedChat.append(messagesToSend, previousMessages),
      );
      setIsLoading(true);

      const index = messages.length + 1;

      completeChat({prompt: messagesToSend[0].text, index})
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
    [messages, completeChat],
  );

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

  const renderSend = useCallback((props: SendProps<IMessage>) => {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <Icon source="send" color="blue" size={30} />
        </View>
      </Send>
    );
  }, []);

  const renderScrollToBottom = useCallback(() => {
    return <Icon source="chevron-down" size={36} color="#5BC0EB" />;
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={USER_CHAT}
      renderSend={renderSend}
      renderChatFooter={renderFooter}
      placeholder={t('homeScreen.inputPlaceholder')}
      // renderBubble={this.renderBubble}
      // renderInputToolbar={this.renderInputToolbar}
      showUserAvatar
      inverted={false}
      alwaysShowSend
      scrollToBottom
      scrollToBottomComponent={renderScrollToBottom}
    />
  );
};

export default ConversationList;

const styles = StyleSheet.create({
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  sendIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#5BC0EB',
  },
});
