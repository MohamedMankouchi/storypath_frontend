import React, { useEffect, useState } from "react";
import { Button, InputGroup, Form, Nav } from "react-bootstrap";
import {
  Link,
  Navigate,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Editor from "react-simple-wysiwyg";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";

export async function getScenario({ params }) {
  const res = await fetch("https://storypathapi.onrender.com/");
  const data = await res.json();

  return data.scenarios.filter((el) => el.id == params.id);
}
export const EditScenario = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const scenario = useLoaderData();
  const steps = scenario[0]?.steps[currentStep];
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [changedData, setChangedData] = useState({});
  const { user } = useOutletContext();
  useEffect(() => {
    setChangedData(scenario[0]);
    setIsLoading(false);
  }, []);

  const handleUpdate = async () => {
    if (
      !changedData.title ||
      !changedData.description ||
      !changedData.guide ||
      !changedData.goals.description ||
      !changedData.theory.description ||
      !changedData.final.paragraphs
    ) {
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
        icon: "error",
        title: "Gelieve de ontbrekende velden in te vullen",
      });
      return;
    }
    let missingfields = false;
    changedData.steps.forEach((el) => {
      if (
        !el.description ||
        !el.feedbackA.explanation ||
        !el.feedbackB.explanation ||
        !el.title ||
        !el.titleChoiceA ||
        !el.titleChoiceB ||
        !el.videoIdChoiceA ||
        !el.videoIdChoiceB ||
        (el.feedbackA.correct == false &&
          el.feedbackB.correct == false &&
          el.feedbackC.correct == false)
      ) {
        missingfields = true;
        return;
      }
    });

    if (missingfields) {
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
        icon: "error",
        title: "Gelieve alle velden te vullen bij de stappen",
      });
      return;
    }
    setIsUpdating(true);
    const res = await fetch(
      `https://storypathapi.onrender.com/scenario/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(changedData),
      }
    );
    const data = await res.json();
    if (data.status == 200) {
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
      await Toast.fire({
        icon: "success",
        title: data.message,
      });
      window.location.href = `/scenarios/${id}`;
      return;
    }
    setIsUpdating(false);
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
      icon: "error",
      title: data.error,
    });
  };
  const handleStepsUpdate = (value, key, id) => {
    let newArray = [...changedData.steps];

    if (key == "radio") {
      if (value == "Keuze A") {
        newArray[currentStep]["feedbackA"] = {
          correct: true,
          explanation: changedData.steps[currentStep][id].explanation,
        };

        newArray[currentStep]["feedbackB"] = {
          correct: false,
          explanation: changedData.steps[currentStep]["feedbackB"].explanation,
        };

        newArray[currentStep]["feedbackC"] = {
          correct: false,
          explanation: changedData.steps[currentStep]["feedbackC"].explanation,
        };
        setChangedData((prev) => ({ ...prev, steps: newArray }));
        return;
      } else if (value == "Keuze B") {
        newArray[currentStep]["feedbackB"] = {
          correct: true,
          explanation: changedData.steps[currentStep][id].explanation,
        };

        newArray[currentStep]["feedbackA"] = {
          correct: false,
          explanation: changedData.steps[currentStep]["feedbackA"].explanation,
        };
        newArray[currentStep]["feedbackC"] = {
          correct: false,
          explanation: changedData.steps[currentStep]["feedbackC"].explanation,
        };
        setChangedData((prev) => ({ ...prev, steps: newArray }));
        return;
      } else if (value == "Keuze C") {
        newArray[currentStep]["feedbackC"] = {
          correct: true,
          explanation: changedData.steps[currentStep][id].explanation,
        };

        newArray[currentStep]["feedbackA"] = {
          correct: false,
          explanation: changedData.steps[currentStep]["feedbackA"].explanation,
        };
        newArray[currentStep]["feedbackB"] = {
          correct: false,
          explanation: changedData.steps[currentStep]["feedbackB"].explanation,
        };
        setChangedData((prev) => ({ ...prev, steps: newArray }));
        return;
      }

      return;
    }
    if (key == "feedbackA" || key == "feedbackB" || key == "feedbackC") {
      newArray[currentStep][key] = {
        correct: changedData.steps[currentStep][key]["correct"],
        explanation: value,
      };
      setChangedData((prev) => ({ ...prev, steps: newArray }));
      return;
    }
    newArray[currentStep][key] = value;
    setChangedData((prev) => ({ ...prev, steps: newArray }));
  };
  const handleNextStep = () => {
    if (currentStep > scenario[0].steps.length - 1) {
      setCurrentStep(scenario[0].steps.length - 1);
    }
    if (0 <= currentStep && currentStep < scenario[0].steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (0 < currentStep < scenario[0].steps.length) {
      setCurrentStep((prev) => prev - 1);
    }
    if (currentStep < 1) {
      setCurrentStep(0);
    }
  };
  return (
    <div>
      {steps == undefined ? (
        <Navigate to={"/profile"} />
      ) : user?.role == "Admin" || user?.role == "Teacher" ? (
        isLoading ? (
          "Aan het laden..."
        ) : (
          <>
            <Button
              onClick={() => {
                Swal.fire({
                  title: "Ben jij zeker?",
                  text: "Deze actie is onomkeerbaar",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Ja, terug naar profiel",
                  cancelButtonText: "Nee",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.href = "/profile";
                  }
                });
              }}
              style={{ marginBottom: "20px" }}
              variant="primary"
            >
              Terug naar profiel{" "}
            </Button>{" "}
            <h2 style={{ marginBottom: "20px" }}>Wijzig scenario </h2>
            <Form.Label htmlFor="title">Titel</Form.Label>
            <Form.Control
              placeholder="Titel"
              name="title"
              id="title"
              value={changedData.title}
              onChange={(e) =>
                setChangedData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <p className="mt-3">Beschrijving</p>
            <Editor
              value={changedData.description}
              name="description"
              onChange={(e) =>
                setChangedData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <p className="mt-3">Gids</p>
            <Editor
              value={changedData.guide}
              name="guide"
              onChange={(e) =>
                setChangedData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <p className="mt-3">Doelstellingen</p>
            <Editor
              value={changedData?.goals?.description}
              name="description"
              onChange={(e) =>
                setChangedData((prev) => ({
                  ...prev,
                  goals: {
                    ...prev.goals,
                    [e.target.name]: e.target.value,
                  },
                }))
              }
            />
            <p className="mt-3">Theorie</p>
            <Editor
              value={changedData?.theory?.description}
              name="description"
              onChange={(e) =>
                setChangedData((prev) => ({
                  ...prev,
                  theory: {
                    ...prev.theory,
                    [e.target.name]: e.target.value,
                  },
                }))
              }
            />
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 className="mt-3">Stappen scenario</h2>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                }}
              >
                <Button
                  onClick={handlePreviousStep}
                  variant="warning"
                  disabled={steps.step == 1}
                >
                  Vorige stap
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={steps.step == changedData.steps.length}
                  variant="primary"
                >
                  Volgende stap
                </Button>
              </div>
            </div>
            <div>
              <p style={{ fontWeight: "bold" }}> Stap : {steps.step}</p>
              <p>Titel van de stap</p>{" "}
              <Form.Control
                style={{ marginBottom: "20px" }}
                placeholder="Titel"
                name="title"
                id="titleStep"
                value={steps.title}
                onChange={(e) => {
                  handleStepsUpdate(e.target.value, e.target.name);
                }}
              />
              <p>Beschrijving</p>{" "}
              <Editor
                style={{ marginBottom: "20px" }}
                value={steps.description}
                name="description"
                onChange={(e) => {
                  handleStepsUpdate(e.target.value, e.target.name);
                }}
              />
              <p>Youtube link </p>{" "}
              <Form.Control
                style={{ marginBottom: "20px" }}
                placeholder="Id van youtube video"
                name="videoId"
                value={steps.videoId}
                onChange={(e) => {
                  handleStepsUpdate(e.target.value, e.target.name);
                }}
              />
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  gap: "15px",
                }}
              >
                <div style={{ width: "100%" }}>
                  <p>Titel keuze A</p>{" "}
                  <Form.Control
                    style={{ marginBottom: "20px" }}
                    placeholder="Titel keuze A"
                    name="titleChoiceA"
                    value={steps.titleChoiceA}
                    onChange={(e) => {
                      handleStepsUpdate(e.target.value, e.target.name);
                    }}
                  />
                  <p>Youtube link - Keuze A</p>{" "}
                  <Form.Control
                    style={{ marginBottom: "20px" }}
                    placeholder="Link van youtube video, keuze A"
                    name="videoIdChoiceA"
                    value={steps.videoIdChoiceA}
                    onChange={(e) => {
                      handleStepsUpdate(e.target.value, e.target.name);
                    }}
                  />
                </div>
                <div style={{ width: "100%" }}>
                  <p>Titel keuze B</p>{" "}
                  <Form.Control
                    style={{ marginBottom: "20px" }}
                    placeholder="Titel keuze B"
                    name="titleChoiceB"
                    value={steps.titleChoiceB}
                    onChange={(e) => {
                      handleStepsUpdate(e.target.value, e.target.name);
                    }}
                  />
                  <p>Youtube link - Keuze B</p>{" "}
                  <Form.Control
                    style={{ marginBottom: "20px" }}
                    placeholder="Link van youtube video, keuze B"
                    name="videoIdChoiceB"
                    value={steps.videoIdChoiceB}
                    onChange={(e) => {
                      handleStepsUpdate(e.target.value, e.target.name);
                    }}
                  />{" "}
                </div>

                {steps?.feedbackC ? (
                  <div style={{ width: "100%" }}>
                    <p>Titel keuze C</p>{" "}
                    <Form.Control
                      style={{ marginBottom: "20px" }}
                      placeholder="Titel keuze C"
                      name="titleChoiceC"
                      value={steps.titleChoiceC}
                      onChange={(e) => {
                        handleStepsUpdate(e.target.value, e.target.name);
                      }}
                    />
                    <p>Youtube link - Keuze C</p>{" "}
                    <Form.Control
                      style={{ marginBottom: "20px" }}
                      placeholder="Link van youtube video, keuze C"
                      name="videoIdChoiceC"
                      value={steps.videoIdChoiceC}
                      onChange={(e) => {
                        handleStepsUpdate(e.target.value, e.target.name);
                      }}
                    />{" "}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <p>Feedback A</p>{" "}
              <Editor
                style={{ marginBottom: "20px" }}
                value={steps.feedbackA.explanation}
                name="feedbackA"
                onChange={(e) => {
                  handleStepsUpdate(e.target.value, e.target.name);
                }}
              />
              <p>Feedback B</p>{" "}
              <Editor
                style={{ marginBottom: "20px" }}
                value={steps.feedbackB.explanation}
                name="feedbackB"
                onChange={(e) => {
                  handleStepsUpdate(e.target.value, e.target.name);
                }}
              />
              {steps?.feedbackC ? (
                <>
                  <p>Feedback C</p>{" "}
                  <Editor
                    style={{ marginBottom: "20px" }}
                    value={steps?.feedbackC?.explanation}
                    name="feedbackC"
                    onChange={(e) => {
                      handleStepsUpdate(e.target.value, e.target.name);
                    }}
                  />
                </>
              ) : (
                ""
              )}
              <p>Juiste antwoord</p>
              <Form.Check
                style={{ marginBottom: "20px" }}
                type="radio"
                value="Keuze A"
                label="Keuze A"
                name="radio"
                id="feedbackA"
                checked={
                  changedData?.steps[currentStep]?.feedbackA?.correct == true
                }
                onClick={(e) =>
                  handleStepsUpdate(e.target.value, e.target.name, e.target.id)
                }
              />
              <Form.Check
                style={{ marginBottom: "20px" }}
                type="radio"
                value="Keuze B"
                label="Keuze B"
                name="radio"
                id="feedbackB"
                checked={
                  changedData?.steps[currentStep]?.feedbackB?.correct == true
                }
                onClick={(e) =>
                  handleStepsUpdate(e.target.value, e.target.name, e.target.id)
                }
              />
              {steps?.feedbackC ? (
                <>
                  <Form.Check
                    style={{ marginBottom: "20px" }}
                    type="radio"
                    value="Keuze C"
                    label="Keuze C"
                    name="radio"
                    id="feedbackC"
                    checked={
                      changedData?.steps[currentStep]?.feedbackC?.correct ==
                      true
                    }
                    onClick={(e) =>
                      handleStepsUpdate(
                        e.target.value,
                        e.target.name,
                        e.target.id
                      )
                    }
                  />
                </>
              ) : (
                ""
              )}
            </div>
            <h2 style={{ marginBottom: "20px" }}>Eindpagina</h2>
            <p>Youtube link</p>{" "}
            <Form.Control
              style={{ marginBottom: "20px" }}
              placeholder="Link video voor laatste pagina"
              name="videoId"
              value={changedData.final.videoId}
              onChange={(e) => {
                setChangedData((prev) => ({
                  ...prev,
                  final: { ...prev.final, [e.target.name]: e.target.value },
                }));
              }}
            />
            <p>Uitleg</p>{" "}
            <Editor
              value={changedData.final?.paragraphs}
              name="paragraphs"
              onChange={(e) => {
                setChangedData((prev) => ({
                  ...prev,
                  final: {
                    ...prev.final,
                    [e.target.name]: e.target.value,
                  },
                }));
              }}
            />
            <Button
              style={{ marginTop: "20px", marginBottom: "20px" }}
              onClick={handleUpdate}
              variant="primary"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Spinner animation="border" role="status" size="sm">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Wijzig scenario"
              )}
            </Button>
          </>
        )
      ) : scenario.length == 0 ? (
        <Navigate to={"/login"} />
      ) : (
        <Navigate to={"/profile"} />
      )}
    </div>
  );
};
