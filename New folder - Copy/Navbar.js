import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = localStorage.getItem("user");
  const admin = localStorage.getItem("admin");
  const navigate = useNavigate();

  function logout(){
    alert("Logged Out Successfully");
    localStorage.clear();
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container">
        <Link className="navbar-brand text-primary fw-semibold fs-4" to="/">
          KwikKoders
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav mx-auto fs-6">
            <Link className="nav-link me-4 " aria-current="page" to="">
              Home
            </Link>
            <Link className="nav-link me-4" to="/courses">
              Courses
            </Link>
            <Link className="nav-link me-4" to="/blogs">
              Blogs
            </Link>
          </div>
          {admin &&  (
              <>
                <Link className="btn btn-dark me-4" to="/admin/dashboard"> Dashboard</Link>
              </>
            )}
          {user &&(
          <>
            {!admin && (
              <Link to={"user/dashboard"} className="btn btn-dark me-4">Dashboard</Link>
              )
            }
            <button onClick={logout} className="btn btn-danger"> Log Out </button>
          </>
          )}

          {!user  && (
            <>
              <Link className="btn btn-outline-primary me-4" to="/login">
                Log In
              </Link>
              <Link className="btn btn-outline-primary me-4" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}