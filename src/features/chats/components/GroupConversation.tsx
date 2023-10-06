import { useForm } from 'react-hook-form';

import { Input } from '@/components/elements/input';
import { GroupMessages } from '@/lib/firebase';

interface GroupConversationProps {
  messages: GroupMessages[];
  onSubmit: (data: ChatInputProps) => void;
}

export type ChatInputProps = {
  message: string;
};

export const GroupConversation = ({ messages, onSubmit }: GroupConversationProps) => {
  const { register, handleSubmit } = useForm<ChatInputProps>();
  if (!messages) return <div> Nothing selected</div>;

  return (
    <div className="h-full w-full px-5 py-5 bg-accent">
      {messages?.map((msg) => <>{msg.content}</>)}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('message')} />
      </form>
    </div>
  );
};
