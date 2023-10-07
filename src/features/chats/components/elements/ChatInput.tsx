import React from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/elements/input';
import { cn } from '@/lib/tailwind-classname';

export type MessageInputProps = {
  message: string;
};

interface ChatInputProps {
  onSubmit: (data: MessageInputProps) => void;
  className?: string;
}

export const ChatInput = ({ onSubmit, className }: ChatInputProps) => {
  const { register, handleSubmit, reset } = useForm<MessageInputProps>();

  return (
    <form
      onSubmit={handleSubmit((val) => {
        reset();
        onSubmit(val);
      })}
      className={cn('flex gap-x-2', className)}
    >
      <Input className="w-[80%]" {...register('message')} />
      <Input
        className="w-[20%] bg-primary text-white font-semibold cursor-pointer hover:bg-primary-hover"
        type="submit"
        value="Submit"
      />
    </form>
  );
};
