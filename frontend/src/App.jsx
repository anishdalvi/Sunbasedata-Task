import React,{ useState } from 'react'
import './App.css'
import CustomerManagement from './components/CustomerManagement'
import Login from './components/Login';

const App = () => {
  const [authToken, setAuthToken] = useState('');

  const handleLogin = (token) => {
    setAuthToken(token);
  };

  return (
    <div>
      {!authToken ? <Login onLogin={handleLogin} /> : <CustomerManagement authToken={authToken} />}
    </div>
  );
};

export default App;
