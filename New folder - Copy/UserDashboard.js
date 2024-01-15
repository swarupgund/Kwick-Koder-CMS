import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import CourseBox from './courses/CourseBox';

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const mail = localStorage.getItem('user');
  // console.log(courses)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mail: mail.replace(/"/g, '') }),
        });
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [mail]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3001/courses');
        const courses = await response.json();
        setCourses(courses);
      } catch (error) {
        console.log('Error fetching courses:', error);
      }
    };

    const fetchEnrolledCourses = async () => {
      try {
        const response = await fetch('http://localhost:3001/enrolled-courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mail: mail.replace(/"/g, '') }),
        });
        const enrolledCourses = await response.json();
        setEnrolledCourses(enrolledCourses);
      } catch (error) {
        console.log('Error fetching enrolled courses:', error);
      }
    };

    fetchCourses();
    fetchEnrolledCourses();
  }, [mail]);

  const handleEditProfile = () => {
    setIsEditing(true);
    setName(user.name);
    setMobile(user.mobile);
  };

  const handleSaveProfile = async () => {
    try {
       // Validate mobile number length
       if (mobile.length !== 10) {
        alert('Mobile number is not valid. It should be 10 digits.');
        return;
      }

      const response = await fetch('http://localhost:3001/update-user-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mail: mail.replace(/"/g, ''),
          name: name,
          mobile: mobile,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        alert('User updated successfully');
        setIsEditing(false);
      } else {
        const errorResponse = await response.json();
        console.log(errorResponse.message)
      }
    } catch (error) {
      console.log('Error updating user profile:', error);
    }
  };

  const handleChangePassword = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPassword('');
    setNewPassword('');
  };

  const handleShowPasswordCurrent = () => {
    setShowPasswordCurrent(!showPasswordCurrent);
  };
  const handleShowPasswordNew = () => {
    setShowPasswordNew(!showPasswordNew);
  };
  
  const handlePasswordChange = async () => {
    try {
      // Validate password complexity
      const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
      if (!passwordRegex.test(newPassword)) {
        alert('Password must contain at 6 Letter with least one capital letter, one digit and one special character.');
        return;
      }
      const response = await fetch('http://localhost:3001/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mail: mail.replace(/"/g, ''),
          currentPassword: currentPassword,
          newPassword: newPassword,
        }),
      });

      if (response.ok) {
        alert('Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
        setShowModal(false);
      } else {
        const errorResponse = await response.json();
        alert(errorResponse.message);
      }
    } catch (error) {
      console.log('Error changing password:', error);
    }
  };

  const navigate = useNavigate();
  function logout(){
    localStorage.clear();
    navigate('/');
  }

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your Account? This action cannot be undone.')
    if (confirmDelete){
      try {
        const response = await fetch(`http://localhost:3001/user`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mail: mail.replace(/"/g, '') }),
        });
    
        if (response.ok) {
        logout();
          alert('Account deleted successfully');
        } else {
          const errorResponse = await response.json();
          alert(errorResponse.message);
        }
      } catch (error) {
        console.log('Error deleting account:', error);
      }
    }
  };
  
  
  return (
    <>
      <header className='position-relative'>
        <h1 className='fw-bold head'>Hello {user.name && user.name.split(' ')[0].toUpperCase()}</h1>
        <button className="position-absolute bottom-0 end-0 text-danger btn btn-link ms-2" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </header>

      <div className='container d-flex align-items-center justify-content-center p-5'>
        {loading ? (
          <p>Loading user information...</p>
        ) : (
          <div>
            <h3 className='my-4 text-center' >User Information</h3>
            <div className='form-group'>
              <label htmlFor='name'>Name:</label>
              {isEditing ? (
                <input  id='name'  type='text'  value={name}  className='form-control'  onChange={(e) => setName(e.target.value)}/>
              ) : (
                <input id='name' type='text' value={user.name} className='form-control' readOnly />
              )}
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email:</label>
              <input id='email' type='text' value={user.mail} className='form-control' readOnly />
            </div>
            <div className='form-group'>
              <label htmlFor='mobile'>Mobile:</label>
              {isEditing ? (
                <input  id='mobile'  type='tel'  value={mobile}  className='form-control'  onChange={(e) => setMobile(e.target.value)}/>
              ) : (
                <input id='mobile' type='tel' value={user.mobile} className='form-control' readOnly />
              )}
            </div>
            <div>
              {isEditing ? (
                <button className='btn btn-primary' onClick={handleSaveProfile}>
                  Save
                </button>
              ) : (
                <button className='btn btn-primary' onClick={handleEditProfile}>
                  Edit Profile
                </button>
              )}
              <button className='btn btn-primary ms-2' onClick={handleChangePassword}>
                Change Password
              </button>            
            </div>
          
            <div>
              {/* Enrolled Courses */}
              <h3 className='my-4 text-center '>Enrolled Courses</h3>
              <div className='courses'>
              {user.enrolledCourses && user.enrolledCourses.length > 0 ? (
                user.enrolledCourses.map((courseId, index) => {
                 // Find the corresponding course details from the courses array
                 const enrolledCourse = courses.find((course) => course._id === courseId);
                 if (enrolledCourse) {
                   return <CourseBox key={index} {...enrolledCourse} />;
                 } else {
                   return null;
                 }
                })
              ) : (
                <p>No enrolled courses found.</p>
              )}
              </div>
            </div>

          </div>
        )}
      </div>

      {showModal && (
    <div className='modal' tabIndex='-1' role='dialog' style={{ display: 'block' }}>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Change Password</h5>
          </div>
          <div className='modal-body'>
            <div className='form-group'>
              <label htmlFor='currentPassword'>Current Password:</label>
              <div className='password-input'>
                <input
                  id='currentPassword'
                  type={showPasswordCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  className='form-control'
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <i
                  className={showPasswordCurrent ? 'bx bx-hide toggle-password' : 'bx bx-show toggle-password'}
                  onClick={handleShowPasswordCurrent}
                ></i>
              </div>
            </div>
            
            <div className='form-group'>
              <label htmlFor='newPassword'>New Password:</label>
              <div className='password-input'>
                <input
                  id='newPassword'
                  type={showPasswordNew ? 'text' : 'password'}
                  value={newPassword}
                  className='form-control'
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <i
                  className={showPasswordNew ? 'bx bx-hide toggle-password' : 'bx bx-show toggle-password'}
                  onClick={handleShowPasswordNew}
                ></i>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-primary' onClick={handlePasswordChange}>
              Save
            </button>
            <button type='button' className='btn btn-secondary' onClick={handleCloseModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )}


    </>
  )
}

export default UserDashboard;