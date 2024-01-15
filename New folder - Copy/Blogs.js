import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogBox from './blogs/BlogBox';

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Frontend', 'Backend', 'Fullstack'];

  useEffect(() => {
    fetch('http://localhost:3001/blogs')
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      });
      // console.log(posts);
  }, [posts]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredPosts = selectedCategory === 'All' ? posts : posts.filter((post) => post.category === selectedCategory);

  return (
    <>
      <header>
        <h1 className="fw-bold head mb-3">Blog</h1>
        <nav aria-label="breadcrumb">
          <p className="text-white">
            <Link to="/" className="text-decoration-none">
              Home &nbsp;
            </Link>
            / &nbsp; Blogs
          </p>
        </nav>
      </header>

      <div className="category-buttons d-flex align-content-center justify-content-center my-lg-5 my-4 ">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`btn btn-outline-dark btn-sm mx-md-3 mx-1 ${
              category === selectedCategory ? 'active' : ''
            }`}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <main className="blogs">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => <BlogBox key={index} {...post} />)
        ) : (
          <h2 className="mt-5">No Blog Post Found</h2>
        )}
      </main>
    </>
  );
}
