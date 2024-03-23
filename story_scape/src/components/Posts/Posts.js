import React from 'react'
import PostCard from '../PostsCard/PostCard'
import { useDataValue } from '../../context/dataContext'

/** Component to render all post on homepage  */
function Posts() {
    const {posts} = useDataValue()
  return (
    <div>{posts.map((item)=><PostCard post={item}/>)}</div>
  )
}

export default Posts