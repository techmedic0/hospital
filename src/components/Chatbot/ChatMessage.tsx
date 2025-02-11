import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    sender: 'user' | 'ai';
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAI = message.sender === 'ai';

  return (
    <div
      className={`flex items-start gap-4 p-4 animate-fade-in ${
        isAI ? 'bg-background-mint dark:bg-background-dark/50' : ''
      }`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 
                    ${isAI ? 'bg-primary-teal' : 'bg-primary-blue'}`}>
        {isAI ? (
          <Bot className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <p className="font-medium text-sm text-text-heading dark:text-text-light">
          {isAI ? 'MedCare AI' : 'You'}
        </p>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-text-body dark:text-text-light">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;