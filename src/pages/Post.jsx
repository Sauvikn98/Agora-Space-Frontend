import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Comment from '../components/Comments/Comment'
import PostDetailCard from '../components/Cards/PostDetailCard'

function Post() {
  return (
    <div className='bg-gray-300'>
        <Navbar/>
        <PostDetailCard/>
        <Comment/>
    </div>
  )
}

export default Post