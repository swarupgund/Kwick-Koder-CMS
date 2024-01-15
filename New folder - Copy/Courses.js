import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CourseBox from './courses/CourseBox';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/courses')
    .then(res => { res.json()
      .then(courses => {
        setCourses(courses);
      });
    });
  }, []);
  
  const filteredCourses = courses.filter(course => {
    const title = course.title.toLowerCase();
    const query = searchQuery.toLowerCase();
    return title.includes(query);
  });
  return (
      <>
        <header>
          <h1 className="fw-bold head mb-3">Courses</h1>
          <nav aria-label="breadcrumb">
            <p className="text-white">
              <Link to="/" className="text-decoration-none">
                Home &nbsp;
              </Link>
              / &nbsp; Courses
            </p>
          </nav>
        </header>

        <div className='search my-4 py-3 m-auto'>
        <input className='w-100 p-1 px-3 ' type="text" value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value)} } placeholder="Search Courses..." />

        </div>

        <main className="courses">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => <CourseBox key={index} {...course} />)
        ) : (
          <h2 className="m-5">No Course Found</h2>
        )}
        </main>

      </>
  )
}
