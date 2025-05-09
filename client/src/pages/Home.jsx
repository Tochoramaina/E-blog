import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import { useEffect } from 'react';
import PostCard from '../components/PostCard';
const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      if(res.ok){
        setPosts(data.posts)
      }
    }
    fetchPosts();
  }, [])
  return (
    <div>
      <div className="flex flex-col gap-6 lg:p-28 px-3 max-w-6xl mx-auto">
        <h1 className='text-3xl font-bold lg:text-5xl'>Welcome to my Blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo omnis accusamus quia aut similique soluta asperiores rerum cumque suscipit aliquam accusantium eius odio expedita quasi in dolorum, impedit labore voluptas! 
        </p>
        <Link to={'search'} className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
      View all posts
      </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction/>
      </div>
      <div className="max-w-6-xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className=" flex flex-col gap-6">
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post}/>
              ))}
            </div>
            <Link to={'/search'} className='text-teal-500 hover:underline text-center'>View all posts</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home