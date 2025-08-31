import { SessionProvider } from '@/contexts/SessionContext';
import { UsersProvider } from '@/contexts/UsersContext';
import { HashRouter } from 'react-router-dom';
import AppRoutes from '@/routes/AppRoutes';

function App() {
  return (
  	<UsersProvider>
	    <SessionProvider>
	    	<HashRouter>
	      	<AppRoutes />
	    	</HashRouter>
	    </SessionProvider>
    </UsersProvider>
  );
}

export default App;