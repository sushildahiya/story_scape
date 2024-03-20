import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthValue } from '../context/userAuthentication'
import { useDataValue } from '../context/dataContext'

function Home() {
  const {authetication}=useAuthValue()
  const navigation = useNavigate()
  useEffect(()=>{
    if(authetication&& authetication.avatar.length===0){
      navigation('/user-avatar')
    }
},[authetication])
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