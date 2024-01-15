import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function BlogPostPage() {
  const navigate = useNavigate();
  const admin = localStorage.getItem("admin");
    const {id} = useParams();
    const [postInfo , setPostInfo] = useState();
    useEffect(()=>{
        fetch( `http://localhost:3001/blogs/${id}`).then(res =>{
            res.json().then( postInfo =>{
                setPostInfo(postInfo);
            })
        })
    },[id]);
    if(!postInfo) return '';
    // console.log(postInfo);


  // Delete a blog
  const deleteBlog = async (id) => {
  const confirmed = window.confirm('Are you sure you want to delete this blog?');
  if (confirmed) {
    try {
      const response = await fetch(`http://localhost:3001/blogs/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      alert(data.message);
      navigate("/blogs");
    } catch (error) {
      console.log('Error deleting blog:', error);
    }}
  };


    return (
      <>
        <header>
            <div className='header-content'>
              <Link to={'/blogs'} className='text-white text-decoration-none'> Back To Blogs  </Link>
              <h1 className='blog-header'>{postInfo.title}</h1>
              <img src={`http://localhost:3001/${postInfo.cover}`} alt={postInfo.cover} className='blog-img' />
              <small>{ format( new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm' )}</small>
            </div>
        </header>
        <div dangerouslySetInnerHTML={{__html : postInfo.content}} className='blog-content'/>
      </>
    )
  }
