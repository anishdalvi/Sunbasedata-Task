import { useState } from 'react'
import './App.css'
import CustomerManagement from './components/CustomerManagement'

function App() {
  

  return (
    <div className='w-[90%] mx-auto'>
      <h1 className='text-2xl'> Start </h1>      
      <CustomerManagement />
      
    </div>
  )
}

export default App
