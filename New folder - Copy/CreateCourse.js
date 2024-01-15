import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { align: [] },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ color: [] }, { background: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [  "header",  "bold",  "italic",  "underline",  "size",  "blockquote",  "code-block",  "list",  "bullet",  "indent",  "link",  "image",  "align",  "color",  "background",];

export default function CreateCourse() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState("");
  const [overview, setOverview] = useState("");
  const [outcome, setOutcome] = useState("");
  const [content, setContent] = useState("");
  const [requirements, setRequirements] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [fees, setFees] = useState("");
  const [quizQuestions, setQuizQuestions] = useState("");

  const [contentAccordionItems, setContentAccordionItems] = useState([]);
  const [newContentTitle, setNewContentTitle] = useState("");
  const [newContentItems, setNewContentItems] = useState("");

  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: { a: "", b: "", c: "", d: "" },
    answer: "",
  });

  const handleAddQuestion = () => {
    const { question, options, answer } = newQuestion;
    const newQuestionObj = {
      q: question,
      a: options.a,
      b: options.b,
      c: options.c,
      d: options.d,
      ans: answer,
    };
    setQuestions([...questions, newQuestionObj]);
    setNewQuestion({
      question: "",
      options: { a: "", b: "", c: "", d: "" },
      answer: "",
    });
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (e) => {
    setNewQuestion({ ...newQuestion, question: e.target.value });
  };

  const handleOptionChange = (e, optionKey) => {
    setNewQuestion({
      ...newQuestion,
      options: { ...newQuestion.options, [optionKey]: e.target.value },
    });
  };

  const handleAnswerChange = (e) => {
    setNewQuestion({ ...newQuestion, answer: e.target.value });
  };

  function validateFees() {
    if (isNaN(fees)) {
      alert("Fees must be a valid number");
      return false;
    }
    return true;
  }

  const handleAddItem = () => {
    const newItem = {
      id: `collapse${contentAccordionItems.length + 1}`,
      title: newContentTitle,
      content: newContentItems.split("\n").filter((item) => item.trim() !== ""),
    };
    setContentAccordionItems([...contentAccordionItems, newItem]);
    setNewContentTitle("");
    setNewContentItems("");
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = contentAccordionItems.filter(
      (item) => item.id !== itemId
    );
    setContentAccordionItems(updatedItems);
  };

  useEffect(() => {
    //  setQuizQuestions = questions;
  }, [questions]);

  async function createNewCourse(e) {
    e.preventDefault();
    setContent(JSON.stringify(contentAccordionItems));
    // console.log(questions)
    setQuizQuestions(JSON.stringify(questions));
    // console.log(quizQuestions)

    // Check if all input fields are filled
    if (  !title ||  !files ||  !overview ||  !outcome ||  !content ||  !requirements ||  !quizQuestions ||  !difficulty ||  !fees) { 
      alert("Please fill in all fields");
      return;
    }

    if (!validateFees()) {
      return;
    }

    const data = new FormData();
    data.set("title", title);
    if (files.length > 0) {
      data.set("file", files[0]);
    }
    data.set("overview", overview);
    data.set("outcome", outcome);
    data.set("content", content);
    data.set("requirements", requirements);
    data.set("difficulty", difficulty);
    data.set("fees", fees);
    data.set("quiz", quizQuestions);

    // console.log(data.get('file'));
    // console.log(data.get('title'));
    // console.log(data.get('content'));
    // console.log(data.get('overview'));
    // console.log(data.get('outcome'));
    // console.log(data.get('requirements'));
    // console.log(data.get('difficulty'));
    // console.log(data.get('fees'));
    // console.log(data.get('quiz'));

    try {
      const response = await fetch("http://localhost:3001/courses", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Course Created Successfully");
        navigate("/courses");
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error("Error creating course:", error);
      alert("An error occurred while creating the course");
    }
  }

  return (
    <>
      <header>
        <h1 className="mb-3 fw-bold head">Create Course</h1>
        <p>
          <Link to="/admin/dashboard" className="text-decoration-none">
            Back to Dashboard{" "}
          </Link>
        </p>
      </header>
      <div className="d-flex align-items-center justify-content-center blog-form">
        <form
          onSubmit={createNewCourse}
          className="p-lg-5 m-lg-4 p-3 container w-75"
        >
          <div>
            <label htmlFor="title">Course Title</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          </div>
          <div>
            <label htmlFor="file">Course Image</label>
            <input
              type="file"
              accept="image/*"
              id="file"
              onChange={(e) => setFiles(e.target.files)}
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="overview">Course Overview</label>
            <ReactQuill
              className="margin"
              theme="snow"
              modules={modules}
              formats={formats}
              value={overview}
              onChange={(value) => setOverview(value)}
              placeholder="Overview"
            />
          </div>
          <div>
            <label htmlFor="outcome">Course Outcome </label>
            <ReactQuill
              className="margin"
              theme="snow"
              modules={modules}
              formats={formats}
              value={outcome}
              onChange={(value) => setOutcome(value)}
              placeholder="Outcome"
            />
          </div>

          <div>
            <label htmlFor="content">Course Content</label>
            <div>
              <div className="accordion mt-3" id="accordionExample">
                {contentAccordionItems.map(({ id, title, content }) => (
                  <div className="accordion-item" key={id}>
                    <h2 className="accordion-header" id={`heading-${id}`}>
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${id}`}
                        aria-expanded="true"
                        aria-controls={`collapse-${id}`}
                      >
                        {title}
                      </button>
                    </h2>
                    <div
                      id={`collapse-${id}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`heading-${id}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <ul>
                          {content.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                        <div className="text-center">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm px-3 py-1"
                            onClick={() => handleRemoveItem(id)}
                          >
                            <i className="bx bx-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-dark mt-3"
                  data-bs-toggle="modal"
                  data-bs-target="#addItemModal"
                >
                  
                  Add Item
                </button>
              </div>

              <div
                className="modal fade"
                id="addItemModal"
                tabIndex="-1"
                aria-labelledby="addItemModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="addItemModalLabel">Add Content Item </h5>
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label htmlFor="titleInput" className="form-label">  Title</label>
                        <input  type="text"  className="form-control"  id="titleInput"  value={newContentTitle}  onChange={(e) => setNewContentTitle(e.target.value)}/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="contentTextarea" className="form-label">Content</label>
                        <textarea  className="form-control"  id="contentTextarea"  rows="4"  value={newContentItems}  onChange={(e) => setNewContentItems(e.target.value)}></textarea>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button  type="button"  className="btn btn-secondary"  data-bs-dismiss="modal">
                        Close
                      </button>
                      <button  type="button"  className="btn btn-primary"  onClick={handleAddItem}  data-bs-dismiss="modal">
                        Add Item
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="requirements">Requirements</label>
            <ReactQuill
              className="margin"
              theme="snow"
              modules={modules}
              formats={formats}
              value={requirements}
              onChange={(value) => setRequirements(value)}
              placeholder="Requirements"
            />
          </div>
          <div>
            <label htmlFor="difficulty">Difficulty Level</label>
            <select
              className="form-control"
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="select">Select Difficulty</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label htmlFor="difficulty">Quiz Questions</label>
            <div className="accordion mt-3" id="accordionExample">
              {questions.length > 0 ? (
                questions.map((question, index) => (
                  <div className="accordion-item" key={index}>
                    <h2 className="accordion-header" id={`heading-${index}`}>
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${index}`}
                        aria-expanded="true"
                        aria-controls={`collapse-${index}`}
                      >
                        {question.q}
                      </button>
                    </h2>
                    <div
                      id={`collapse-${index}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`heading-${index}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <p>Option A: {question.a}</p>
                        <p>Option B: {question.b}</p>
                        <p>Option C: {question.c}</p>
                        <p>Option D: {question.d}</p>
                        <p>Correct Answer: {question.ans}</p>
                        <div className="text-center">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm px-3 py-1"
                            onClick={() => handleRemoveQuestion(index)}
                          >
                            <i className="bx bx-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Questions added yet.</p>
              )}

              {/* Add Question button */}
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-dark mt-3"
                  data-bs-toggle="modal"
                  data-bs-target="#addQuestionModal"
                >
                  Add Question
                </button>
              </div>

              {/* Add Question modal */}
              <div  className="modal fade"  id="addQuestionModal"  tabIndex="-1"  aria-labelledby="addQuestionModalLabel"  aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="addQuestionModalLabel">
                        Add Question
                      </h5>
                    </div>
                    <div className="modal-body">
                      <div className="mb-1">
                        <label htmlFor="questionInput" className="form-label">
                          Question
                        </label>
                        <input type="text"  className="my-1 form-control"  id="questionInput"  value={newQuestion.question}  onChange={handleQuestionChange}/>
                      </div>
                      <div className="mb-1">
                        <label htmlFor="newOptionAInput" className="form-label">
                          Option A
                        </label>
                        <input  type="text"  className="my-1 form-control"  id="newOptionAInput"  value={newQuestion.options.a}  onChange={(e) => handleOptionChange(e, "a")}/>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="newOptionBInput" className="form-label">
                          Option B
                        </label>
                        <input  type="text"  className="my-1 form-control"  id="newOptionBInput"  value={newQuestion.options.b}  onChange={(e) => handleOptionChange(e, "b")}/>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="newOptionCInput" className="form-label">
                          Option C
                        </label>
                        <input  type="text"  className="my-1 form-control"  id="newOptionCInput"  value={newQuestion.options.c}  onChange={(e) => handleOptionChange(e, "c")}/>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="newOptionDInput" className="form-label">
                          Option D
                        </label>
                        <input  type="text"  className="my-1 form-control"  id="newOptionDInput"  value={newQuestion.options.d}  onChange={(e) => handleOptionChange(e, "d")}/>
                      </div>
                      <div className="mb-2">
                        <label  htmlFor="answerOptions" className="form-label pe-2">
                          Answer Options
                        </label>
                        <label className="pe-2">
                          <input type="radio" className="me-2" name="answerOptions"  value="a"  checked={newQuestion.answer === "a"}  onChange={handleAnswerChange}/>
                          A
                        </label>
                        <label className="pe-2">
                          <input className="me-2"  type="radio"  name="answerOptions"  value="b"  checked={newQuestion.answer === "b"}  onChange={handleAnswerChange}/>
                          B
                        </label>
                        <label className="pe-2">
                          <input className="me-2"  type="radio"  name="answerOptions"  value="c"  checked={newQuestion.answer === "c"}  onChange={handleAnswerChange}/>
                          C
                        </label>
                        <label className="pe-2">
                          <input className="me-2"  type="radio"  name="answerOptions"  value="d"  checked={newQuestion.answer === "d"}  onChange={handleAnswerChange}/>
                          D
                        </label>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button  type="button"  className="btn btn-secondary"  data-bs-dismiss="modal">  Close </button>
                      <button  type="button"  className="btn btn-primary"  onClick={handleAddQuestion}  data-bs-dismiss="modal">  Add Question </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="fees">Course Fees</label>
            <input
              type="text"
              id="fees"
              className="form-control"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              placeholder="Course Fees"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-100 my-3">
              Create Course
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
