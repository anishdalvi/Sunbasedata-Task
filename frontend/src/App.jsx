import React,{ useState } from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomerManagement from './components/CustomerManagement'
import Login from './components/Login';

const App = () => {
  const [authToken, setAuthToken] = useState('');

  const handleLogin = (token) => {
    setAuthToken(token);
  };

  return (
    <>
      <div className='mb-20'>
        {!authToken ? <Login onLogin={handleLogin} /> : <CustomerManagement authToken={authToken} setAuthToken={setAuthToken} />}
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
