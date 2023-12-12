import React from 'react'

const Login = () => {
  return (
    <div>
          <h1 className='text-3xl font-bold'> Login </h1>      
          <input type="text" placeholder='Enter your email' name='email' className='block border-2 my-2' />
          <input type="text" placeholder='Enter Password' name='password' className='block border-2 my-2' />
    </div>
  )
}

export default Login