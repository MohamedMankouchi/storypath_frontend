import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import ScenarioFeedback from "./ScenarioFeedback";
import { useEffect, useState } from "react";
import YoutubeVideo from "./YoutubeVideo";

const ScenarioChoice = ({ step, onComplete, onReset }) => {
  const [choice, setChoice] = useState("A");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(false);

  const flexbasis = {
    flexBasis: "100px",
  };

  function completeStep(choice, answer) {
    setFeedback(false);
    onComplete(choice, answer);
  }

  function getFeedback() {
    setFeedback(true);
    //If no choice was clicked (A), set choice to A
  }
  useEffect(() => {
    setChoice("A");
    setAnswer("");
  }, [step]);

  return (
    <>
      {feedback ? (
        <ScenarioFeedback
          step={step}
          answer={answer}
          choice={choice}
          onComplete={completeStep}
        />
      ) : (
        <div>
          <p>
            Stap {step.step}:{" "}
            <div dangerouslySetInnerHTML={{ __html: step.description }}></div>
          </p>
          <div className="row">
            <div className="col-12">
              <YoutubeVideo videoId={step.videoId} />
            </div>
          </div>
          <br></br>

          <div className="d-flex flex-row justify-content-start flex-no-wrap">
            <div className="p-2" style={flexbasis}>
              <p>A: {step.titleChoiceA}</p>
              <YoutubeVideo videoId={step.videoIdChoiceA} />
            </div>
            <div className="p-2" style={flexbasis}>
              <p>B: {step.titleChoiceB}</p>
              <YoutubeVideo videoId={step.videoIdChoiceB} />
            </div>
            {step.titleChoiceC ? (
              <div className="p-2" style={flexbasis}>
                <p>B: {step.titleChoiceC}</p>
                <YoutubeVideo videoId={step.videoIdChoiceC} />
              </div>
            ) : null}
          </div>
          <br></br>
          <p>Welke video heeft de beste reactie? En waarom? Argumenteer!</p>

          <div key={`inline-radios`} className="mb-3">
            <Form.Check
              defaultChecked
              inline
              label="A"
              name="group1"
              type="radio"
              id={`inline-radio-A`}
              onClick={() => setChoice("A")}
            />
            <Form.Check
              inline
              label="B"
              name="group1"
              type="radio"
              id={`inline-radio-B`}
              onClick={() => setChoice("B")}
            />
            {step.titleChoiceC ? (
              <Form.Check
                inline
                label="C"
                name="group1"
                type="radio"
                id={`inline-radio-C`}
                onClick={() => setChoice("C")}
              />
            ) : null}
          </div>

          <FloatingLabel controlId="floatingTextarea2" label="Argumentatie">
            <Form.Control
              as="textarea"
              placeholder="Jouw argumentatie..."
              style={{ height: "100px" }}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </FloatingLabel>
          <br></br>
          <button
            className="btn btn-primary me-2"
            onClick={() => getFeedback()}
          >
            Krijg feedback
          </button>
          <button className="btn btn-danger " onClick={() => onReset()}>
            Reset Scenario
          </button>
        </div>
      )}
    </>
  );
};

export default ScenarioChoice;
