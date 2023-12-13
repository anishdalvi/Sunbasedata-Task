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
        <div className='w-[90%] mx-auto flex justify-center'>
            <div className='mt-20'>
                <h1 className="text-3xl font-bold uppercase">SunbaseData Login</h1>
                <div className='bg-yellow-200 rounded-xl px-4 py-1 mt-3'>
                    <p className='font-medium text-lg'>Demo Credentials</p>
                    <p><span className='pr-9'>Email:</span>  <span className='font-semibold'>test@sunbasedata.com</span></p>
                    <p><span className='pr-2'>Password:</span> <span className='font-semibold'>Test@123</span></p>
                </div>
                <div className='mt-10'>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        name="email"
                        className="block border-2 py-1 w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        className="block border-2 mt-2 py-1 w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleLogin} className='text-white font-semibold bg-blue-500 hover:bg-blue-800 rounded-lg px-3 py-1.5 mt-4 text-sm  float-right'>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
