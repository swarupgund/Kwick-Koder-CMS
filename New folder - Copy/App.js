import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import AdminComponent from './components/AdminComponent';
import Blogs from './components/Blogs';
import BlogPostPage from './components/blogs/BlogPostPage';
import EditBlog from './components/blogs/EditBlog';
import CreateBlog from './components/blogs/CreateBlog';
import Courses from './components/Courses';
import CreateCourse from './components/courses/CreateCourse';
import CoursePage from './components/courses/CoursePage';
import EditCourse from './components/courses/EditCourse';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import UserComponent from './components/UserComponent';
import Home from './components/Home';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/blogs' element={<Blogs/>} />
      <Route path='/courses' element={<Courses/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/blogs/:id' element={<BlogPostPage/>} />
      <Route path='/courses/:id' element={<CoursePage/>} />
      <Route element={<AdminComponent/>}>
        <Route path='/admin/dashboard' element={<AdminDashboard/>} />
        <Route path='/admin/create-course' element={<CreateCourse/>} />
        <Route path='/admin/create-blog'  element={<CreateBlog/>}/>
        <Route path='/admin/edit-blog/:id'  element={<EditBlog/>}/>
        <Route path='/admin/edit-course/:id'  element={<EditCourse/>}/>
      </Route>
      <Route element={<UserComponent/>}>
        <Route path='/user/dashboard' element={ <UserDashboard/>}/>
      </Route> 
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
