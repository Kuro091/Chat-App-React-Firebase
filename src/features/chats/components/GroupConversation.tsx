import { useEffect, useRef } from 'react';
import { useAuth } from 'reactfire';

import { GroupMessage } from '@/lib/firebase';

import { ChatDisplay } from './elements/ChatDisplay';
import { ChatInput, MessageInputProps } from './elements/ChatInput';

interface GroupConversationProps {
  messages: (GroupMessage & { messageId: string })[];
  onSubmit: (data: MessageInputProps) => void;
}

export const GroupConversation = ({ messages, onSubmit }: GroupConversationProps) => {
  const { currentUser } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!messages) return <></>;

  return (
    <div className="h-full px-16 py-5 bg-accent flex flex-col ">
      <div className="flex flex-col gap-y-5 overflow-auto pb-5">
        <h1 className="text-2xl font-semibold">Group Chat</h1>
        {messages.map((message) => {
          const isFromSender = message.sender === currentUser?.uid;
          if (isFromSender) {
            return (
              <ChatDisplay
                key={message.timestamp}
                message={{ ...message, sender: 'You', photoUrl: currentUser?.photoURL || '' }}
                className="self-end pr-12"
                inverted
              />
            );
          }
          return (
            <ChatDisplay className="self-start flex-1" key={message.timestamp} message={message} />
          );
        })}
        <div ref={scrollRef}></div>
      </div>

      <ChatInput className="w-full mt-auto" onSubmit={onSubmit} />
    </div>
  );
};
