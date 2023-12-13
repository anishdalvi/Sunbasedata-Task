import React, { useState } from 'react';

const Login = ({ onAuthenticate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Call the onAuthenticate function from props to handle authentication
        onAuthenticate({ login_id: email, password });
    };

    return (
        <div>
            <h1 className='text-3xl font-bold'>Login</h1>
            <input
                type="text"
                placeholder='Enter your email'
                name='email'
                className='block border-2 my-2'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder='Enter Password'
                name='password'
                className='block border-2 my-2'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
