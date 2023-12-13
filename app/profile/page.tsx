'use client';

import { useEffect, useState } from "react";

interface postTypes {
    image: 'string';
    title: 'string';
    content: 'string'
    _id: 'string';

}
const ProfilePage: React.FC<postTypes> = () => {
    const [profilePosts, setProfilePosts] = useState<postTypes | null | undefined>();

    useEffect(() => {
        const getPosts = () => {
            
        }
    })

  return (
    <div>
        
    </div>
  )
}

export default ProfilePage