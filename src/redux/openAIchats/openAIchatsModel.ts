import {
    IMessage,
} from 'react-native-gifted-chat';

// Messages List Type
export type MessagesList = IMessage[];

export type ChatActorEnum = 'user' | 'ai'

export type CompleteChatResponse = IMessage[]
export type CompleteChatQuery = {
    prompt: string;
    index: number;
}
