import { useState } from 'react'
import './App.css'
import CustomerManagement from './components/CustomerManagement'
import Login from './components/Login';

function App() {
  const [authToken, setAuthToken] = useState('');

  // Function to handle authentication and set the token
  const handleAuthentication = async (loginData) => {
    try {
      const response = await fetch('api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const authData = await response.json();
      setAuthToken(authData.token);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div>
      {/* Pass the authentication function to the Login component */}
      <Login onAuthenticate={handleAuthentication} />
      {/* Pass the authentication token to the CustomerManagement component */}
      <CustomerManagement authToken={authToken} />
    </div>
  );
}

export default App;
