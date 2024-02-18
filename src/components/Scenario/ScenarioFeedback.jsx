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
        <div className="col-12 mt-3">
          <p>
            {console.log(step.step)}
            <strong>Stap {step.step} </strong> : Antwoord: {choice}:{" "}
            {step[`feedback${choice}`]["correct"] ? (
              <strong>Juist </strong>
            ) : (
              <strong>Fout </strong>
            )}
            {step[`feedback${choice}`]["correct"] ? (
              ""
            ) : step[`feedbackA`]["correct"] ? (
              <strong> - Juiste antwoord : A</strong>
            ) : step[`feedbackB`]["correct"] ? (
              <strong> - Juiste antwoord : B</strong>
            ) : (
              <strong> - Juiste antwoord : C</strong>
            )}
          </p>
        </div>
      </div>
      <h2>Feedback</h2>
      <div className="d-flex justify-content-start flex-wrap md-3 mb-5 gap-5 items-center">
        <div className="p-2" style={flexbasis}>
          <p style={{ width: "450px" }}></p>
          {step.videoIdChoiceA ? (
            <YoutubeVideo videoId={step.videoIdChoiceA} />
          ) : (
            ""
          )}{" "}
          <div
            dangerouslySetInnerHTML={{ __html: step.feedbackA.explanation }}
          ></div>
        </div>
        <div className="p-2 flex" style={flexbasis}>
          <p style={{ width: "450px" }}></p>
          {step.videoIdChoiceB ? (
            <YoutubeVideo videoId={step.videoIdChoiceB} />
          ) : (
            ""
          )}{" "}
          <div
            dangerouslySetInnerHTML={{ __html: step.feedbackB.explanation }}
          ></div>
        </div>
        {step.titleChoiceC ? (
          <div className="p-2 flex" style={flexbasis}>
            <p style={{ width: "450px" }}></p>
            {step.videoIdChoiceC ? (
              <YoutubeVideo videoId={step.videoIdChoiceC} />
            ) : (
              ""
            )}{" "}
            <div
              dangerouslySetInnerHTML={{ __html: step.feedbackC.explanation }}
            ></div>
          </div>
        ) : null}
      </div>

      <button
        className="btn btn-primary mb-3"
        onClick={() => onComplete(choice, answer)}
      >
        Volgende stap
      </button>
    </>
  );
};

export default ExerciseFeedback;
