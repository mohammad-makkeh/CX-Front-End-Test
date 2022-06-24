import { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

                                    //give the login page the ability change the app state
  return loggedIn == false ? <Login setLoggedIn={setLoggedIn}/> : <Dashboard />
}

export default App;
