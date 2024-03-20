import React from 'react'
import {Navigate, RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from '../pages/Home'
import Signin from './Signin/Signin'
import Signup from './Signup/Signup'
import WritePost from './Writepost/WritePost'
// import Post from './Post/Post'
import Story from './Story/Story'
import UpdateAvatar from './Signin/UpdateAvatar'
import Posts from './Posts/Posts'
import Post from './Posts/Post'
import { useAuthValue } from '../context/userAuthentication'

function Routes() {
  const {authetication}= useAuthValue()

    const router = createBrowserRouter([
        {
            path:'/',
            element:<Home/>,
            children:[
                {path:'/',
                element:<Posts/>},
                {
                    path:'/sign-in',
                    element:authetication?<Navigate to="/" replace />:<Signin/>
                },
               {
                path:'/sign-up',
                element:authetication?<Navigate to="/" replace />:<Signup/>
               },
               {
                path:'/write',
                element:authetication?<WritePost/>:<Navigate to="/sign-in" replace />
               },
               {
                path:'/post/:id',
                element:<Post/>
               },
               {path:'/story',element:<Story/>}
            ]
        },{
          path:'/user-avatar',
          element:<UpdateAvatar/>
        }
        
    ])
  return (
    <RouterProvider router={router}/>
  )
}

export default Routes