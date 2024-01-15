import React from 'react'
import { Link } from 'react-router-dom'

export default function CourseBox({_id,title,cover}) {
    return (
    <div className="course-box border shadow">
        <img src={'http://localhost:3001/'+cover} alt={cover} />
        <div className='course-desc'>
             <h6 className='course-title'>{title}</h6>
        <Link to={`/courses/${_id}`} className='btn btn-primary btn-sm box-btn'>View Course</Link>
        </div>
    </div> 
    )
  }
