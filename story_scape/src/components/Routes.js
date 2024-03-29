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
import ErrorPage from './ErrorPage/ErrorPage'
import EditPost from './Posts/EditPost'

function Routes() {
  const {authetication}= useAuthValue()
    /**
     * Programmatical route creation with proper routing in case of no authentication and error handling
     */
    const router = createBrowserRouter([
        {
            path:'/',
            element:<Home/>,
            errorElement:<ErrorPage/>,
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
               {
                path:'/edit/:id',
                element:authetication?<EditPost/>:<Navigate to="/sign-in" replace />
               },
               {path:'/story',element:<Story/>}
            ]
        },{
          path:'/user-avatar',
          element:authetication?<UpdateAvatar/>:<Navigate to="/" replace />
        }
        
    ])
  return (
    <RouterProvider router={router}/>
  )
}

export default Routes