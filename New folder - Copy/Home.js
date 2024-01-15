import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CourseBox from './courses/CourseBox';
import BlogBox from './blogs/BlogBox';

export default function Home() {
    const [courses, setCourses] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/courses')
          .then(res => {
            res.json().then(courses => {
                setCourses(courses.slice(0, 4)); // Get the first four courses
            });
          });

          fetch('http://localhost:3001/blogs')
          .then((res) => res.json())
          .then((posts) => {
            setPosts(posts);
          });
          
      }, []);

  return (
    <>
    <header>
      <h1 className="fw-semi-bold head mb-4 fs-1 ">Discover the Exciting World of <br/> Web Development with Us</h1>
      <Link to="/courses" className='btn btn-light p-2 px-4'>Explore Course</Link>
    </header>

    <section className='pt-5'>
        <h3 className='text-center mb-2 fw-medium'>Featured Courses</h3>
        <p className='text-center text-muted mb-4 '>Explore a variety of quality courses and gain new skills</p>
        <div className='courses'>
        {courses.length > 0 ? (
            courses.map((course, index) => <CourseBox key={index} {...course} />)
          ) : (
            <p>Loading courses...</p>
          )}
        </div>
        <div className="text-center">
          <Link to="/courses" className="btn btn-dark mt-4">View All Courses</Link>
        </div>
    </section>

    <section className='pt-5'>
        <h3 className='text-center mb-2 fw-medium'>Featured Blogs</h3>
        <p className='text-center text-muted mb-4 '>Visit blog to be updated with latest tips,news and courses</p>
        <div className="blogs">
          {posts.length > 0 ? (
            posts.slice(0, 4).map((post, index) => <BlogBox key={index} {...post} />)
          ) : (
            <h2 className="m-5">No Blog Post Found</h2>
          )}
        </div>
        <div className="text-center">
          <Link to="/blogs" className="btn btn-dark mt-4">View All Posts</Link>
        </div>

    </section>
    </>
  )
}

