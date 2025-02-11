import React, { useState, useRef, useEffect } from 'react';
import { Bot, X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';

// Dummy responses for demonstration
const dummyResponses = [
  "Hello! I'm MedCare AI, your virtual healthcare assistant. How can I help you today?",
  "Our hospital is open 24/7 for emergencies. For regular appointments, we're open Monday to Friday, 8 AM to 8 PM.",
  "You can book an appointment through our online system or by calling us at (555) 123-4567.",
  "We offer a wide range of medical services including emergency care, primary care, specialized surgery, and more.",
  "I understand your concern. Would you like me to help you schedule an appointment with one of our specialists?",
];

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ id: string; content: string; sender: 'user' | 'ai' }>>([
    { id: '1', content: "Hello! I'm MedCare AI, your virtual healthcare assistant. How can I help you today?", sender: 'ai' },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage = { id: Date.now().toString(), content, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setIsTyping(true);
    
    setTimeout(() => {
      const randomResponse = dummyResponses[Math.floor(Math.random() * dummyResponses.length)];
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'ai' as const,
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out
                    ${isMinimized ? 'w-16 h-16' : 'w-[calc(100%-2rem)] md:w-[400px] h-[500px] max-w-[400px]'}`}>
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="w-16 h-16 rounded-full bg-primary-teal hover:bg-glow-teal text-white
                     shadow-lg hover:shadow-glow transition-all duration-300
                     flex items-center justify-center"
        >
          <Bot className="w-8 h-8" />
        </button>
      ) : (
        <div className="flex flex-col h-full rounded-xl shadow-xl bg-background-light dark:bg-background-dark overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-primary-teal/20 dark:border-primary-teal/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-teal flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-text-heading dark:text-text-light">MedCare AI</h3>
                <p className="text-sm text-text-body dark:text-text-light/80">Healthcare Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-2 hover:bg-background-mint dark:hover:bg-primary-teal/20 rounded-lg transition-colors duration-300"
            >
              <X className="w-5 h-5 text-text-heading dark:text-text-light" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-2">
              {messages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </div>
      )}
    </div>
  );
};

export default Chatbot;