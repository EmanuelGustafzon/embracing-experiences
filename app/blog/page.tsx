import React from 'react'
import NavBar from '../components/NavBar'
import PostCard from '../components/PostCard'

const BlogPage: React.FC = () => {
  return (
    <div>
        <NavBar/>
        <div className='flex justify-center '>
        <h2 className='mb-5 mt-5 text-3xl font-bold'>
            Read the blog!
        </h2>
        </div>
        <div className='m-3 flex flex-wrap justify-center'>
            <PostCard/>
        </div>
    </div>
  )
}

export default BlogPage