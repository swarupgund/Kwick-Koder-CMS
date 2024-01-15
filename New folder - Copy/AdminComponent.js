import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function AdminComponent() {
    const admin = localStorage.getItem('admin');
    return admin?<Outlet/>: <Navigate to="/" />
  }
