import React from "react";
import YoutubeVideo from "./YoutubeVideo";
import Accordion from "react-bootstrap/Accordion";

const ExerciseFeedback = ({ step, answer, choice, onComplete }) => {
  const flexbasis = {
    flexBasis: "100px",
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <p>
            Stap {step.step} antwoord: {choice}: {answer}
          </p>
        </div>
      </div>
      <h2>Feedback</h2>
      <div className="d-flex justify-content-start flex-no-wrap md-3">
        <div className="p-2" style={flexbasis}>
          <p>A: {step.titleChoiceA}</p>
          <YoutubeVideo videoId={step.videoIdChoiceA} />
          <div
            dangerouslySetInnerHTML={{ __html: step.feedbackA.explanation }}
          ></div>
        </div>
        <div className="p-2 flex-fill" style={flexbasis}>
          <p>B: {step.titleChoiceB}</p>
          <YoutubeVideo videoId={step.videoIdChoiceB} />
          <div
            dangerouslySetInnerHTML={{ __html: step.feedbackB.explanation }}
          ></div>
        </div>
        {step.titleChoiceC ? (
          <div className="p-2 flex-fill" style={flexbasis}>
            <p>B: {step.titleChoiceC}</p>
            <YoutubeVideo videoId={step.videoIdChoiceC} />
            <div
              dangerouslySetInnerHTML={{ __html: step.feedbackC.explanation }}
            ></div>
          </div>
        ) : null}
      </div>

      <button
        className="btn btn-primary"
        onClick={() => onComplete(choice, answer)}
      >
        Volgende stap
      </button>
    </>
  );
};

export default ExerciseFeedback;
