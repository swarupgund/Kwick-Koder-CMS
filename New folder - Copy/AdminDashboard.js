import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showBlogs, setShowBlogs] = useState(false);

  //Fetch all users from database
  const fetchUsers = async () => {
    try { 
      if (users.length === 0) {
      const response = await fetch('http://localhost:3001/users');
      const data = await response.json();
      setUsers(data);
    }
      // setShowUsers((prevState) => !prevState);
      setShowUsers(true);
      setShowCourses(false);
      setShowBlogs(false);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  // Fetch all courses from the database
  const fetchCourses = async () => {
    try {
      if (courses.length === 0) {
        const response = await fetch('http://localhost:3001/courses');
        const data = await response.json();
        setCourses(data);
      }
      // setShowCourses((prevState) => !prevState);
      setShowCourses(true);
      setShowBlogs(false)
      setShowUsers(false)
    } catch (error) {
      console.log('Error fetching courses:', error);
    }
  }

// Delete a course
const deleteCourse = async (id) => {
  const confirmed = window.confirm('Are you sure you want to delete this course?');
  if (confirmed) {
    try {
      const response = await fetch(`http://localhost:3001/courses/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      alert(data.message);
      fetchCourses(); // Refresh courses after deletion
    } catch (error) {
      console.log('Error deleting course:', error);
    }
  }
};

  // Fetch all blogs from the database
  const fetchBlogs = async () => {
    try {
      if (blogs.length === 0) {
        const response = await fetch('http://localhost:3001/blogs');
        const data = await response.json();
        setBlogs(data);
      }
      // setShowBlogs((prevState) => !prevState);
      setShowBlogs(true);
      setShowUsers(false)
      setShowCourses(false)
    } catch (error) {
      console.log('Error fetching blogs:', error);
    }
  };

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
      fetchBlogs(); // Refresh blogs after deletion
    } catch (error) {
      console.log('Error deleting blog:', error);
    }
  }
};

  return (
    <>
      <header>
        <h1 className='fw-bold head'>Hello Admin</h1>
      </header>

<div className='container'>
<div className='d-flex justify-content-evenly align-items-center p-5 m-5'>
        <Link className="btn btn-outline-dark" to="/admin/create-course">Create Course</Link>
        <Link className="btn btn-outline-dark" to="/admin/create-blog">Create Blog</Link>
        <button className={`btn ${showUsers ? 'btn-dark' : 'btn-outline-dark'}`}  onClick={fetchUsers}>Get All Users</button>
        <button className={`btn ${showCourses ? 'btn-dark' : 'btn-outline-dark'}`} onClick={fetchCourses}>Get All Courses</button>
        <button className={`btn ${showBlogs ? 'btn-dark' : ' btn-outline-dark'}`} onClick={fetchBlogs}>Get All Blogs</button>
      </div>

      {showUsers && (
        <div className="table-responsive w-75 m-auto" >
          <h2 className='text-center mb-3'>All Users</h2>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.mail}</td>
                  <td>{user.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showCourses && (
        <div className="table-responsive w-75 m-auto">
          <h2 className='text-center mb-3'>All Courses</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  {/* <td>{course.title}</td> */}
                  <td> <Link to={`/courses/${course._id}`}  className='text-decoration-none text-black'>  {course.title}  </Link></td>
                  <td> 
                    <Link to={`/admin/edit-course/${course._id}`} className='btn btn-sm btn-success me-4' ><i class='bx bxs-edit-alt'></i></Link>
                    <button className='btn btn-sm btn-danger' onClick={() => deleteCourse(course._id)}><i class='bx bxs-trash' ></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showBlogs && (
        <div  className="table-responsive w-75 m-auto">
          <h2 className='text-center mb-3'>All Blogs</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  {/* <td>{blog.title}</td> */}
                  <td> <Link to={`/blogs/${blog._id}`}  className='text-decoration-none text-black'>  {blog.title}  </Link></td>
                  <td> 
                    <Link className='btn btn-sm btn-success me-4' to={`/admin/edit-blog/${blog._id}`}><i class='bx bxs-edit-alt'></i></Link>
                    <button className='btn btn-sm btn-danger' onClick={() => deleteBlog(blog._id)}><i class='bx bxs-trash' ></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
</div>
    </>
  );
};

export default AdminDashboard;
