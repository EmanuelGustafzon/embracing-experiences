'use client'
import axios from "axios"
import { useState, ChangeEvent, FormEvent } from "react"
import { useSession } from 'next-auth/react';
import NavBar from "@/app/components/NavBar";

interface SubmitEvent extends FormEvent {
  currentTarget: EventTarget & HTMLFormElement;
}

const NewUserPost: React.FC = () => {
  const { data: session } = useSession();

  const [post, setPost] = useState({
    title: '',
    image: null as File | null,
    content: '',
    userEmail: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setPost(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setPost((prevState) => ({
        ...prevState,
        image: files[0], // Update the image property with the selected file
      }));
    }
  };

  const handleSubmit = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();

    if (!session?.user?.email) {
        console.error('User not authenticated. Please log in.');
        return;
      }
    try {
      const formData = new FormData();

      if (post.image) {
        formData.append('image', post.image);
      }

      formData.append('title', post.title);
      formData.append('content', post.content);
      formData.append('userEmail', session?.user?.email);

      await axios.post('/api/UserPost/new', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setPost({
        title: '',
        image: null,
        content: '',
        userEmail: ''
      });
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <>
      <NavBar/>
      <div className="flex flex-wrap justify-center">
        <div className="card w-96 shadow-xl">
          <form onSubmit={handleSubmit}>
            <input onChange={handleFileChange} id="fileInput" type="file" name="image" className="file-input w-full max-w-xs" />
            <input onChange={handleChange} type='text' name='title' placeholder='title' value={post.title} className="input input-bordered w-full max-w-xs bg-neutral"/>
            <textarea onChange={handleChange} name='content' placeholder='content' value={post.content} className="textarea bg-neutral" ></textarea>
            <div>
              <button className="btn" type="submit">Submit</button>
            </div>
          </form>
        </div>
        </div>
    </>
  );
};

export default NewUserPost;
