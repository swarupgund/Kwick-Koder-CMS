import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(){
  return(
    <footer className="text-white">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <h4><Link to="/">KwikKoders</Link></h4>
            <p className='text-center text-white'>Master In-Demand Skills with Our Cutting-Edge Courses</p>
          </div>
          <div className="col-md-3 col-sm-6">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li className='text-center'><Link className="nav-link me-4"  to="">Home</Link></li>
              <li className='text-center'><Link className="nav-link me-4" to="/courses">Courses</Link></li>
              <li className='text-center'><Link className="nav-link me-4" to="/blogs">Blogs</Link> </li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li className='text-white  text-center'><i class='bx bxs-map pe-2 pt-1'></i>A3 , Punyanagri society, <br/> Vadgaonsheri,<br/> Pune-411014</li>
              <li className='text-white  text-center'><i class='bx bxs-phone pe-2 pt-1' ></i>8408888583</li>
              <li className='text-white  text-center'><a href='mailto:hr@kwikkoders.in'><i class='bx bxs-envelope pe-2 pt-1' ></i>hr@kwikkoders.in</a></li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li className='text-center'><a href="mailto:bidaveyogesh@gmail.com"><i class='bx bxl-google pe-2' ></i> Google</a></li>
              <li className='text-center'><a href="https://www.youtube.com/"> <i class='bx bxl-youtube pe-2' ></i>You Tube</a></li>
              <li className='text-center'><a href="https://www.linkedin.com/feed/"><i class='bx bxl-linkedin-square pe-2'></i> LinkedIn</a></li>
              <li className='text-center'><a href="https://github.com/"><i class='bx bxl-github pe-2' ></i> GitHub</a></li>
            </ul>
          </div>
        </div>
        <hr className="text-white" />
        <p className='text-center'>&copy; 2023 kwikoders</p>
      </div>
    </footer>
  )
}