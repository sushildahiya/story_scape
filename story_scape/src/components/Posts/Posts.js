import React from 'react'
import PostCard from '../PostsCard/PostCard'
import { useDataValue } from '../../context/dataContext'
import styles from '../../styles/post.module.css'
import { DNA } from 'react-loader-spinner'

/** Component to render all post on homepage  */
function Posts() {
    const {posts,loading} = useDataValue()
  return (
    <>{
      loading? <div className={styles.loader}><DNA
      visible={true}
      height="120"
      width="120"
      ariaLabel="dna-loading"
      wrapperClass="dna-wrapper"
      /></div>: <div>{posts.map((item)=><PostCard post={item}/>)}</div>
    }
    </>
  )
}

export default Posts