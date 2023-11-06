import React from 'react'
import NavBar from '../components/NavBar'
import PostCard from '../components/PostCard'

const BlogPage: React.FC = () => {
  return (
    <div>
        <NavBar/>
        <div className='m-3 flex flex-wrap justify-center'>
            <PostCard/>
        </div>
    </div>
  )
}

export default BlogPage