import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useAuthValue } from '../context/userAuthentication'

function Home() {
  const {authetication}=useAuthValue()
  return (
    <>
    <Navbar/>
    <main>
        <Outlet/> 
    </main>
    </>
  )
}

export default Home