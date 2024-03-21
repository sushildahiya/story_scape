import React from 'react'
import PostCard from '../PostsCard/PostCard'
import { useDataValue } from '../../context/dataContext'


function Posts() {
    const {posts} = useDataValue()
  return (

    <div>{posts.map((item)=><PostCard post={item}/>)}</div>
  )
}

export default Posts