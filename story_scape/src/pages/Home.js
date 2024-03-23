import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'


/**
 * Home page component
 */
function Home() {
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