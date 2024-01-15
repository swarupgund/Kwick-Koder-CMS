import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Course.css'
import Quiz from "./Quiz";

export default function CoursePage() {
  const userMail = localStorage.getItem('user') ? localStorage.getItem('user').replace(/"/g, '') : '';
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseInfo, setCourseInfo] = useState();
  const [accordionItems, setAccordionItems] = useState([])
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userData, setUserData] = useState(null);
  const [enrolled, setEnrolled] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUserData = (courseId) => {
    fetch('http://localhost:3001/user', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ mail: userMail }),
     })
     .then(response => response.json())
     .then(userData =>{
         setUserData(userData);
         setLoading(false);
         if (userData.enrolledCourses.includes(courseId)) {
          setEnrolled(true);
        } else {
          setEnrolled(false);
        }
       }).catch(error => {
       console.log('Error fetching user data:', error);
   });
 };
 
  useEffect(() => {
    const fetchCourseData = () => {
      fetch(`http://localhost:3001/courses/${id}`)
        .then(response => response.json())
        .then(courseInfo => {
          setCourseInfo(courseInfo);
          setAccordionItems(JSON.parse(courseInfo.content));
          setQuizQuestions(JSON.parse(courseInfo.quiz));
        })
        .catch(error => {
          console.log('Error fetching course data:', error);
        });
    };

    fetchCourseData();
    fetchUserData(id);
  },[id]);

  if (!courseInfo || loading) {
    return "Loading...";
  }

  const handleEnrollCourse = () => {
    if (!userMail) {
      alert('Please log in to enroll');
      navigate('/login')
      return;
    }

    const data = {
      // Get the user ID from the userData 
      userId : userData._id,
      courseId : id,
    }
    // Send a POST request to enroll the user in the course
    fetch(`http://localhost:3001/enroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
       if(data.message === 'Enrollment successful' ){
        alert(data.message);
        setEnrolled(true);
       }else{
        alert(data.message);
       }
      })
      .catch((error) => {
        // Handle the enrollment error
        console.log('Error enrolling user in the course:', error);
      });
  };


  const handleUnenrollCourse = () => {
    const confirmed = window.confirm("Do you really wnat to Uneroll this course ?")
    if(confirmed){
      const data = {
        userId: userData._id,
        courseId: id,
      };
      // Send a POST request to unenroll the user from the course
      fetch(`http://localhost:3001/unenroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          setEnrolled(false);
          fetchUserData();
        })
        .catch((error) => {
          // Handle the unenrollment error
          console.log('Error unenrolling user from the course:', error);
        });
    }
  };

  const handleToggle = (itemId) => {
    setAccordionItems((prevState) =>
      prevState.map((item) => {
        if (item.id === itemId) {
          return { ...item, isOpen: !item.isOpen };
        }
        return item;
      })
    );
  };

  return (
    <>

      <main className="container px-lg-5">
      <div className="course-head">
        <h2 className="h2 fs-2 fw-bold ls-1">{courseInfo.title}</h2>
        <div className="star mb-3">
          <i className="bx bxs-star text-warning"></i>
          <i className="bx bxs-star text-warning"></i>
          <i className="bx bxs-star text-warning"></i>
          <i className="bx bxs-star text-warning"></i>
          <i className="bx bxs-star text-warning"></i>
        </div>
      </div>
        <div className="row">
          <div className="col-lg-9 overview p-3">
            {/* course banner img */}
            <img
              src={`http://localhost:3001/${courseInfo.cover}`}
              alt={courseInfo.cover}
              className="course-img"
            />

            {/* course overview section */}
            <section className="overview">
              <h5 className="section-head">Course Overview</h5>
              <div dangerouslySetInnerHTML={{__html : courseInfo.overview}}/>
            </section>
            <hr />

            {/* what will you learn section */}
            <section className="learn">
              <h5 className="section-head">What You'll Learn</h5>
              <div dangerouslySetInnerHTML={{__html : courseInfo.outcome}} />
            </section>
            <hr />

            {/* course content section */}
            <section className="content">
              <h5 className="section-head">Course Content</h5>
              <div className="accordion accordion-flush" id="accordionExample">
                {accordionItems.map(({ id, title, content, isOpen }) => (
                  <div className="accordion-item" key={id}>
                    <h2 className="accordion-header" id={`heading-${id}`}>
                      <button className={`accordion-button${isOpen ? "" : " collapsed"}`} type="button" onClick={() => handleToggle(id)} aria-expanded={isOpen ? "true" : "false"} aria-controls={`collapse-${id}`}>
                        {title}
                      </button>
                    </h2>
                    <div  id={`collapse-${id}`}  className={`accordion-collapse collapse${isOpen ? " show" : ""}`}  aria-labelledby={`heading-${id}`}>
                      <div className="accordion-body">
                        <ul>
                          {content.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <hr />


            <section id="Quiz">
              {userMail && <Quiz questions={quizQuestions} />}
            </section>


          </div>

          <div className="col-lg-3 p-3">
            <div className="row">
            <div className="col-lg-12 col-md-6 px-0 rounded mb-3">
              {/* course fee section */}
              <section className="side-sect border-bottom m-lg-0 m-2">
                <h3 className="my-4 ls-1 fw-semibold text-center">
                  {courseInfo.fees === 0 ? "Free" : `${courseInfo.fees}RS`}
                </h3>
                {!enrolled ? (
                  <button className="btn btn-primary w-100" onClick={handleEnrollCourse}>
                    Enroll Now
                  </button>
                  ) : (
                  <button className="btn btn-danger w-100" onClick={handleUnenrollCourse}>
                    Unenroll
                  </button>
                )}
                <p className="text-muted text-center pt-3">
                  {courseInfo.fees === 0 ? "Free Access To This Course" : ""}
                </p>
                <p>
                <i className="bx me-2 bx-bar-chart-alt"></i>
                {courseInfo.difficulty}
               </p>
              </section>
            </div>

            <div className="col-lg-12 col-md-6 px-0 side-sect border rounded mb-2">
              <section className="m-1">
              <div className="p-2">
                {/* Requirements section */}
                <p className="mb-3 fw-bold text-dark ls-1">Requirements</p>
                <div dangerouslySetInnerHTML={{__html : courseInfo.requirements}} />
              </div>
              <div className="col-12 p-2 ">
                <p className="mb-3 text-dark ls-1 fw-bold">Course by</p>
                <p className="text-primary">Abhijeet Nashte</p>
              </div>
              </section>
            </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
