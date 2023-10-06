import { Route, Routes } from 'react-router-dom';

import { ChatPage } from './ChatPage';

export const ChatRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ChatPage />} />
    </Routes>
  );
};
