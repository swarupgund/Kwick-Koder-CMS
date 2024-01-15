import React, { useState } from "react";

export default function Quiz({ questions }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [optionsDisabled, setOptionsDisabled] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setQuizFinished(false);
    removeOptionClasses();
    setOptionsDisabled(false);
    setShowNextButton(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions?.length) {
      setCurrentQuestion(nextQuestion);
      setShowNextButton(false);
      setOptionsDisabled(false);
      removeOptionClasses();
    } else {
      setQuizFinished(true);
    }
  };

  const removeOptionClasses = () => {
    const optionButtons = document.getElementsByClassName("opt");
    for (let i = 0; i < optionButtons.length; i++) {
      optionButtons[i].classList.remove("correct", "wrong");
    }
  };

  const handleAnswer = (selectedOption) => {
    const currentQuestionObj = questions[currentQuestion];
    setOptionsDisabled(true);

    if (selectedOption === currentQuestionObj?.ans) {
      setScore(score + 1);
      document.getElementById(selectedOption).classList.add("correct");
    } else {
      document.getElementById(selectedOption).classList.add("wrong");
      document.getElementById(currentQuestionObj?.ans).classList.add("correct");
    }
    setShowNextButton(true);
  };

  const renderQuizBox = () => {
    const currentQuestionObj = questions[currentQuestion];
    return (
      <div className="quizBox">
        <div className="row">
          <div className="col-9">
            <p className="float-start" id="questionNo">
              {currentQuestion + 1} / {questions?.length} Question
            </p>
          </div>
        </div>
        <hr />
        <div className="row">
          <p id="q">{currentQuestionObj?.q}</p>
          <button
            id="a"
            className="opt"
            onClick={() => handleAnswer("a")}
            disabled={optionsDisabled}
          >
            {currentQuestionObj?.a}
          </button>
          <button
            id="b"
            className="opt"
            onClick={() => handleAnswer("b")}
            disabled={optionsDisabled}
          >
            {currentQuestionObj?.b}
          </button>
          <button
            id="c"
            className="opt"
            onClick={() => handleAnswer("c")}
            disabled={optionsDisabled}
          >
            {currentQuestionObj?.c}
          </button>
          <button
            id="d"
            className="opt"
            onClick={() => handleAnswer("d")}
            disabled={optionsDisabled}
          >
            {currentQuestionObj?.d}
          </button>
        </div>
        <hr />
        <div className="row">
          <div className="col-6">
            <span id="score">Score: {score}</span>
          </div>
          <div className="col-6">
{showNextButton && (
<button
             className="btn btn-outline-dark w-50 float-end"
             id="nextBtn"
             onClick={handleNextQuestion}
           >
Next
</button>
)}
</div>
</div>
</div>
);
};

const renderRestartBox = () => {
return (
<div className="restartBox m-3">
<h3 className="mb-3">
Your Score: {score}/{questions?.length}
</h3>
<button className="btn btn-dark" onClick={startQuiz}>
Restart Quiz
</button>
</div>
);
};

const renderContent = () => {
if (!quizStarted) {
return (
<div className="startBox m-3">
<div className="row">
<h4 className="mb-3">Some Rules of this Quiz</h4>
</div>
<div className="row">
<ul>
<li>You can't exit from the quiz until you finish.</li>
<li>You can go to the next question only if you select an answer.</li>
<li>Once you select an answer, you can't reselect.</li>
<li>You will get 1 point for each correct answer.</li>
</ul>
</div>
<div className="modal-footer">
<button
           type="button"
           className="btn btn-secondary"
           data-bs-dismiss="modal"
         >
Close
</button>
<button
           type="button"
           className="btn btn-primary"
           id="startQuiz"
           onClick={startQuiz}
         >
Start Quiz
</button>
</div>
</div>
);
} else if (!quizFinished) {
return renderQuizBox();
} else {
return renderRestartBox();
}
};

return (
<div className="quiz py-2 text-center">
<button
     type="button"
     id="startBtn"
     className="btn btn-dark"
     data-bs-toggle="modal"
     data-bs-target="#staticBackdrop"
     onClick={handleButtonClick}
   >
Quiz
</button>
<div
     className="modal fade"
     id="staticBackdrop"
     data-bs-backdrop="static"
     data-bs-keyboard="false"
     tabIndex="-1"
     aria-labelledby="staticBackdropLabel"
     aria-hidden={!isModalOpen}
   >
<div className="modal-dialog modal-dialog-centered">
<div className="modal-content ">
<div className="modal-header">
<h1 className="modal-title fs-5" id="staticBackdropLabel">
Quiz
</h1>
{quizFinished && (
<button
               type="button"
               className="btn-close"
               id="modalClose"
               data-bs-dismiss="modal"
               aria-label="Close"
               onClick={closeModal}
             ></button>
)}
</div>
<div className="modal-body p-md-5 pt-0">{renderContent()}</div>
</div>
</div>
</div>
</div>
);
}
