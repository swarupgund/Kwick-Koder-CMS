import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [mail,setMail] = useState("");
  const [password,setPassword] = useState("");
  const [mobile,setMobile] = useState("");
  const [error,setError] = useState(null);
  const [showPassword,setShowPassword] = useState(false);

  useEffect(()=>{
    const user = localStorage.getItem("user");
    if(user){
      navigate('/');
    }
  })

  async function register(ev){
    ev.preventDefault();

    // Validate mobile number length
    if (mobile.length !== 10) {
      setError("Mobile number not valid");
      setTimeout(() => setError(null), 2000);
      return;
    }     
     // Validate password complexity
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      alert('Password must contain at 6 Letter with least one capital letter, one digit and one special character.');
      return;
    }
    const response = await fetch("http://localhost:3001/register",{
      method: 'POST',
      body: JSON.stringify({name,mail,password,mobile}),
      headers: {'Content-Type': 'application/json'}
    });

    if(response.status === 200){
      alert('Registration Successful');
      navigate('/login');
    }else{
      const errorResponse = await response.json();
      setError(errorResponse.message);
      setTimeout(() => setError(null), 2000);
      alert('Registration Failed');
    }
  }

  // show or hide password
  const handleShowPassword = () =>{
    setShowPassword(!showPassword)
  }


  return (
    <>
    {/* shows errors if any  */}
    {error && <div className='alert alert-danger mt-4 p-1 ps-3 w-50 m-auto text-center' >
      {error}
    </div>} 

    <div className='form'>
    <h3 className="text-center">Create Account</h3>
    <form className="loginform p-3" onSubmit={register}>
      <div>
        <input type="text" className="form-control" onChange={(e)=>setName(e.target.value)} placeholder="Username" />
      </div>
      <div>
        <input type="email" className="form-control" onChange={(e)=>setMail(e.target.value)} placeholder="Email Address" />
      </div>
      <div>
        <input type="tel" className="form-control"  onChange={(e)=>setMobile(e.target.value)} placeholder="Mobile Number" />
      </div>
      <div className='password-input'>
        <input type={showPassword ? "text" : "password"} className="form-control"  onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
        <i className={showPassword ? "bx bx-hide toggle-password" : "bx bx-show toggle-password"} onClick={handleShowPassword} ></i>
      </div>
      <div>
        <button type="submit" className="btn btn-primary w-100 my-3">Register</button>
        <p className="text-center">Allready have an account? <Link to="/login" className='text-primary text-decoration-none'>Log In</Link> </p>
        
      </div>
    </form>
  </div>
  </>
  )
}
