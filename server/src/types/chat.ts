export type MessageStatus = 'sending' | 'sent' | 'error';

export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    status: MessageStatus;
}

export interface ChatError {
    message: string;
    code?: string;
    retry?: () => Promise<void>;
}

export interface ChatState {
    messages: Message[];
    isLoading: boolean;
    error: ChatError | null;
}
