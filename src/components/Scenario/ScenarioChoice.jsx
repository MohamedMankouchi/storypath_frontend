import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import ScenarioFeedback from "./ScenarioFeedback";
import { useEffect, useState } from "react";
import YoutubeVideo from "./YoutubeVideo";
import Swal from "sweetalert2";

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
            <strong>{step.title}</strong>
            <div dangerouslySetInnerHTML={{ __html: step.description }}></div>
          </p>
          <div className="row">
            <div className="col-12">
              <YoutubeVideo videoId={step.videoId} />
            </div>
          </div>
          <br></br>

          <div className="d-flex flex-wrap gap-5 justify-content-start flex-no-wrap">
            <div className="p-2" style={flexbasis}>
              <p style={{ width: "450px" }}>A: {step.titleChoiceA}</p>
              {step.videoIdChoiceA ? (
                <YoutubeVideo videoId={step.videoIdChoiceA} />
              ) : (
                ""
              )}{" "}
            </div>
            <div className="p-2" style={flexbasis}>
              <p style={{ width: "450px" }}>B: {step.titleChoiceB}</p>
              {step.videoIdChoiceB ? (
                <YoutubeVideo videoId={step.videoIdChoiceB} />
              ) : (
                ""
              )}{" "}
            </div>
            {step.titleChoiceC ? (
              <div className="p-2" style={flexbasis}>
                <p style={{ width: "450px" }}>C: {step.titleChoiceC}</p>
                {step.videoIdChoiceC}
                {step.videoIdChoiceC ? (
                  <YoutubeVideo videoId={step.videoIdChoiceC} />
                ) : (
                  ""
                )}
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
            className="btn btn-primary me-2 mb-3"
            onClick={() => getFeedback()}
          >
            Krijg feedback
          </button>
          <button
            className="btn btn-danger mb-3 "
            onClick={() =>
              Swal.fire({
                title: "Ben jij zeker?",
                text: "Deze actie is onomkeerbaar",
                icon: "warning",
                showCancelButton: true,

                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ja, scenario opniew instellen!",
                cancelButtonText: "Nee",
                showLoaderOnConfirm: true,
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    },
                  });
                  Toast.fire({
                    icon: "success",
                    title: "Scenario opnieuw ingesteld",
                  });

                  onReset();
                }
              })
            }
          >
            Reset Scenario
          </button>
        </div>
      )}
    </>
  );
};

export default ScenarioChoice;
