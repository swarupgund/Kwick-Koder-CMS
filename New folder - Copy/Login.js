import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate();

  const [mail,setMail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);
  const [showPassword,setShowPassword] = useState(false);

  useEffect(()=>{
    const user = localStorage.getItem("user");
    if(user){
      navigate('/');
    }
  })

  async function login(ev){
    ev.preventDefault();
    const response = await fetch('http://localhost:3001/login',{
      method:"POST",
      body:JSON.stringify({mail,password}),
      headers:{'Content-Type':'application/json'},
      credentials: 'include',
    });
    // console.log(response)

    if(response.ok){
      response.json().then(UserInfo =>{
        const {mail,token,isAdmin } = UserInfo
        // console.log(mail,token,isAdmin)
        localStorage.setItem("user",JSON.stringify(mail))
        localStorage.setItem("token",JSON.stringify(token))
        if(isAdmin){
          localStorage.setItem("admin",JSON.stringify(isAdmin))
          navigate('/admin/dashboard');
        }else{
          navigate('/');
        }
      });
    }else{
      // alert("Wrong Credentials")
      const errorResponse = await response.json();
      if(errorResponse && errorResponse.message){
        setError(errorResponse.message);
        setTimeout(() => setError(null), 2000);
      }else{
        setError('Unknown error occured');
        setTimeout(() => setError(null), 2000);
      }
      console.log(error);
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
        <h3 className="text-center">Log In</h3>
        <form className="loginform p-3 " onSubmit={login}>
          <div>
            <input type="email" className="form-control" value={mail} onChange={(e)=>setMail(e.target.value)} placeholder="Email Address" />
          </div>
          <div className='password-input'>
            <input  type={showPassword ? "text" : "password"}  className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
            <i className={showPassword ? "bx bx-hide toggle-password" : "bx bx-show toggle-password"} onClick={handleShowPassword} ></i>
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-100 my-3">Log In</button>
            <p className="text-center">Don't have an account? <Link to='/register' className='text-primary text-decoration-none'>Register Now</Link> </p>
          </div>
        </form>
      </div>
    </>

    )
  };
