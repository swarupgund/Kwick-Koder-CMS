import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

export default function BlogBox({_id,title,cover,createdAt}) {
    return (
    <div className="blog-box border shadow">
        <img src={'http://localhost:3001/'+cover} alt={cover} />
        <div className='blog-title'> <h6>{title}</h6>
        <small className='blog-time'>{ format( new Date(createdAt), 'MMM d, yyyy HH:mm' )}</small>
        </div>
        <Link to={`/blogs/${_id}`} className='btn btn-outline-primary btn-sm box-btn'>Read More</Link>
    </div> 
    )
  }
