'use client'
import axios from "axios"
import { useState, ChangeEvent, FormEvent } from "react"
import { useSession } from 'next-auth/react';

// Define types for events
interface SubmitEvent extends FormEvent {
  currentTarget: EventTarget & HTMLFormElement;
}

const NewUserPost: React.FC = () => {
  const [post, setPost] = useState({
    title: '',
    image: '',
    content: '',
    userEmail: ''
  });

  const { data: session } = useSession();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setPost(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();

    if (!session) {
        console.error('User not authenticated. Please log in.');
        return;
      }
    
    try {
      await axios.post('/api/UserPost/new', {
        ...post,
        userEmail: session?.user?.email
      });

      // Optionally, you can reset the form or perform any other actions upon successful submission
      setPost({
        title: '',
        image: '',
        content: '',
        userEmail: ''
      });

    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type='text' name='title' placeholder='title' value={post.title} />
        <input onChange={handleChange} type='text' name='content' placeholder='content' value={post.content} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewUserPost;
