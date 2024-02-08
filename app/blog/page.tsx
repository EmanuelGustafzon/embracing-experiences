import React from 'react'
import NavBar from '../components/NavBar'
import PostCard from '../components/PostCard'
import PostCardServerAction from '../components/PostCardServerAction'

const BlogPage: React.FC = () => {
  return (
    <div>
        <NavBar/>
        <div>

        </div>
        <div className='flex justify-center '>
        <h2 className='mb-5 mt-5 text-3xl font-bold'>
            Read the blog!
        </h2>
        </div>
        <div className='m-3 flex flex-wrap justify-center'>
            {/* <PostCard/> */}
            <PostCardServerAction searchTerm={''}/>
        </div>
    </div>
  )
}

export default BlogPage