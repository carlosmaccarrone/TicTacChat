import { SessionProvider } from '@/contexts/SessionContext';
import { HashRouter } from 'react-router-dom';
import AppRoutes from '@/routes/AppRoutes';

function App() {
  return (
    <SessionProvider>
    	<HashRouter>
      	<AppRoutes />
    	</HashRouter>
    </SessionProvider>
  );
}

export default App;