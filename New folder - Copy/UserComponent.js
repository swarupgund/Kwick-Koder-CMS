import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function UserComponent() {
    const user = localStorage.getItem('user');
    return user?<Outlet/>: <Navigate to="/" />
  }
