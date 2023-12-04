import React from 'react'
import NavBar from '../components/NavBar'
import UserPostCard from '../components/UserPostCard'

const UserPostPage: React.FC = () => {
  return (
    <div>
        <NavBar/>
        <div className='m-3 flex flex-wrap justify-center'>
            <UserPostCard/>
        </div>
    </div>
  )
}

export default UserPostPage