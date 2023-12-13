// frontend/src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('api/authenticate', {
                login_id: email,
                password,
            });
            onLogin(response.data.access_token);
        } catch (error) {
            console.error('Login error:', error);
           
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold">Login</h1>
            <input
                type="text"
                placeholder="Enter your email"
                name="email"
                className="block border-2 my-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="block border-2 my-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default Login;
