import { SessionProvider } from '@/contexts/SessionContext';
import { SocketProvider } from '@/contexts/SocketContext';
import { HashRouter } from 'react-router-dom';
import AppRoutes from '@/routes/AppRoutes';

function App() {
  return (
		<SocketProvider>
		  <SessionProvider>
		    <HashRouter>
		      <AppRoutes />
		    </HashRouter>
		  </SessionProvider>
		</SocketProvider>
  );
}

export default App;