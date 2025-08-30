import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import NicknamePage from '@/pages/Nickname/NicknamePage';
import { useSession } from '@/contexts/SessionContext';
import GamePlayPage from '@/pages/GamePlay/GamePlay';
import ChatRoomPage from '@/pages/ChatRoom/ChatRoom';
import PrivateLayout from '@/layouts/PrivateLayout';
import Spinner from '@/components/Spinner/Spinner';

function NicknameRoute({ checkNickname, redirectTo }) {
  const { hasNickname, sessionLoading } = useSession();
  if (sessionLoading) return <Spinner />;
  return checkNickname(hasNickname) ? <Outlet /> : <Navigate to={redirectTo} replace />;
}

function PrivateRoute() {
  return <NicknameRoute checkNickname={(hasNickname) => hasNickname} redirectTo="/" />;
}

function PublicRoute() {
  return <NicknameRoute checkNickname={(hasNickname) => !hasNickname} redirectTo="/chatroom" />;
}

export default function AppRoutes() {
  return (
    <Routes>

      <Route element={<PublicRoute />}>
        <Route path="/" element={<NicknamePage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<PrivateLayout navbarType="chat" />}>
          <Route path="/chatroom" element={<ChatRoomPage />} />
        </Route>
        <Route element={<PrivateLayout navbarType="game" />}>
          <Route path="/gameplay" element={<GamePlayPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}