import { UserData } from '@/lib/firebase';

interface NotificationDisplayProps {
  user: UserData;
}

export const NotificationDisplay = ({ user }: NotificationDisplayProps) => {
  return <div>{user.displayName}</div>;
};
