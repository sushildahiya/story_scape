import React from 'react'
import styles from '../../styles/story.module.css'

/**
 * Story component
 * @returns 
 */
function Story() {
  return (
    <div className={styles.storyContainer}>
      <h1>Everyone has a <br/>story to tell.</h1>
      <p>Story Scape is a home for human stories and ideas. Here, anyone can share insightful perspectives, useful knowledge, and life wisdom with the world—without building a mailing list or a following first. The internet is noisy and chaotic; Story Scape is quiet yet full of insight. It’s simple, beautiful, collaborative, and helps you find the right audience for whatever you have to say. </p> <p>We believe that what you read and write matters. Words can divide or empower us, inspire or discourage us. In a world where the most sensational and surface-level stories often win, we’re building a system that rewards depth, nuance, and time well spent. A space for thoughtful conversation more than drive-by takes, and substance over packaging.</p> <p>Ultimately, our goal is to deepen our collective understanding of the world through the power of writing.</p>
    </div>
  )
}

export default Story