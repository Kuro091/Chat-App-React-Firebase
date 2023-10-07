import { Eye, EyeOff } from 'lucide-react';
import React from 'react';

import { GroupMessage } from '@/lib/firebase';
import { cn } from '@/lib/tailwind-classname';
import { formatDate } from '@/utils/formatDate';

interface ChatDisplayProps {
  message: GroupMessage;
  className?: string;
  inverted?: boolean;
}

const SeenIcon = ({ read }: { read: boolean }) => {
  if (read) {
    return <Eye color="green"></Eye>;
  }
  return <EyeOff color="blue" />;
};

export const ChatDisplay = ({ message, className, inverted }: ChatDisplayProps) => {
  if (inverted) {
    return (
      <div className={cn('flex gap-x-2 items-center', className)}>
        <SeenIcon read={message.read} />
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">{formatDate(message.timestamp)}</span>
          <span className="font-semibold self-end">{message.senderDisplayName}</span>
          <div className="self-end">{message.content}</div>
        </div>
        <img src={message.photoUrl} alt="user" className="w-10 h-10 rounded-full" />
      </div>
    );
  }

  return (
    <div className={cn('flex gap-x-2 items-center', className)}>
      <SeenIcon read={message.read} />
      <img src={message.photoUrl} alt="user" className="w-10 h-10 rounded-full" />
      <div className="flex flex-col">
        <span className="text-xs text-gray-400">{formatDate(message.timestamp)}</span>
        <span className="font-semibold">{message.senderDisplayName}</span>
        <div>{message.content}</div>
      </div>
    </div>
  );
};
