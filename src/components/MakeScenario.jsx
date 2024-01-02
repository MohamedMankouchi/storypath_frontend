import React, { useEffect, useState } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import {
  Link,
  Navigate,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Editor from "react-simple-wysiwyg";
import Swal from "sweetalert2";

export const MakeScenario = () => {
  const stepsParam = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const scenario = [
    {
      id: Math.floor(Math.random() * 999),
      title: "",
      description: "",
      goals: { title: "Doelstellingen", description: "" },
      final: { videoId: "", paragraphs: "" },
      guide: "",
      theory: { description: "" },
      steps: [],
    },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [changedData, setChangedData] = useState({});
  const { user } = useOutletContext();
  useEffect(() => {
    setChangedData(scenario[0]);
    setIsLoading(false);
  }, []);

  makeObject();
  function makeObject() {
    for (let i = 0; i < stepsParam.steps; i++) {
      let newStep = {
        step: i + 1,
        title: `Stap ${i + 1}`,
        description: "",
        videoId: "",
        titleChoiceA: "",
        videoIdChoiceA: "",
        titleChoiceB: "",
        videoIdChoiceB: "",
        feedbackA: { correct: false, explanation: "" },
        feedbackB: { correct: false, explanation: "" },
      };

      scenario[0].steps.push(newStep);
    }
  }

  const handleScenario = () => {
    let missingFields = false;
    changedData.steps.forEach((el) => {
      for (var steps in el) {
        if (el[steps] == "") {
          missingFields = true;
        }
        missingFields = false;
      }
    });

    if (!changedData.title || !changedData.description) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Please fill in the missing fields",
      });
      return;
    }

    if (missingFields) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Please fill in the missing fields",
      });
      return;
    }

    fetch("https://storypathapi.onrender.com/scenario", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(changedData),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.status != 200) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
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
          return;
        }

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
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
        window.location.href = "/scenarios";
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
          explanation: changedData.steps[currentStep][id].explanation,
        };
        setChangedData((prev) => ({ ...prev, steps: newArray }));
        return;
      } else {
        newArray[currentStep]["feedbackB"] = {
          correct: true,
          explanation: changedData.steps[currentStep][id].explanation,
        };

        newArray[currentStep]["feedbackA"] = {
          correct: false,
          explanation: changedData.steps[currentStep][id].explanation,
        };
        setChangedData((prev) => ({ ...prev, steps: newArray }));
        return;
      }

      return;
    }
    if (key == "feedbackA" || key == "feedbackB") {
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
      {user?.role == "Admin" || user?.role == "Teacher" ? (
        isLoading ? (
          "Aan het laden..."
        ) : (
          <>
            <Link to={"/profile"}>
              <Button style={{ marginBottom: "20px" }} variant="primary">
                Terug naar profiel{" "}
              </Button>{" "}
            </Link>
            <h2 style={{ marginBottom: "20px" }}>Maak een scenario </h2>
            <Form.Label htmlFor="title">Titel</Form.Label>
            <Form.Control
              required
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
                  disabled={changedData.steps[currentStep].step == 1}
                  variant="warning"
                >
                  Vorige stap
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={
                    changedData.steps[currentStep].step ==
                    changedData.steps.length
                  }
                  variant="primary"
                >
                  Volgende stap
                </Button>
              </div>
            </div>
            <div>
              <p style={{ fontWeight: "bold" }}>
                {" "}
                Stap : {changedData.steps[currentStep].step}
              </p>
              <p>Titel van de stap</p>{" "}
              <Form.Control
                style={{ marginBottom: "20px" }}
                placeholder="Titel"
                name="title"
                id="titleStep"
                value={changedData.steps[currentStep].title}
                onChange={(e) => {
                  handleStepsUpdate(e.target.value, e.target.name);
                }}
              />
              <p>Beschrijving</p>{" "}
              <Editor
                style={{ marginBottom: "20px" }}
                value={changedData.steps[currentStep].description}
                name="description"
                onChange={(e) => {
                  handleStepsUpdate(e.target.value, e.target.name);
                }}
              />
              <p>Youtube video ID</p>{" "}
              <Form.Control
                style={{ marginBottom: "20px" }}
                placeholder="Id van youtube video"
                name="videoId"
                value={changedData.steps[currentStep].videoId}
                onChange={(e) => {
                  handleStepsUpdate(e.target.value, e.target.name);
                }}
              />
              <p>Titel keuze A</p>{" "}
              <Form.Control
                style={{ marginBottom: "20px" }}
                placeholder="Titel keuze A"
                name="titleChoiceA"
                value={changedData.steps[currentStep].titleChoiceA}
                onChange={(e) => {
                  handleStepsUpdate(e.target.value, e.target.name);
                }}
              />
              <p>Youtube video ID - A</p>{" "}
              <Form.Control
                style={{ marginBottom: "20px" }}
                placeholder="Id van youtube video, keuze A"
                name="videoIdChoiceA"
                value={changedData.steps[currentStep].videoIdChoiceA}
                onChange={(e) => {
                  handleStepsUpdate(e.target.value, e.target.name);
                }}
              />
              <p>Titel keuze B</p>{" "}
              <Form.Control
                style={{ marginBottom: "20px" }}
                placeholder="Titel keuze B"
                name="titleChoiceB"
                value={changedData.steps[currentStep].titleChoiceB}
                onChange={(e) => {
                  handleStepsUpdate(e.target.value, e.target.name);
                }}
              />
              <p>Youtube video ID - B</p>{" "}
              <Form.Control
                style={{ marginBottom: "20px" }}
                placeholder="Id van youtube video, keuze B"
                name="videoIdChoiceB"
                value={changedData.steps[currentStep].videoIdChoiceB}
                onChange={(e) => {
                  handleStepsUpdate(e.target.value, e.target.name);
                }}
              />{" "}
              <p>Feedback A</p>{" "}
              <Editor
                style={{ marginBottom: "20px" }}
                value={changedData.steps[currentStep].feedbackA?.explanation}
                name="feedbackA"
                onChange={(e) => {
                  handleStepsUpdate(e.target.value, e.target.name);
                }}
              />
              <p>Feedback B</p>{" "}
              <Editor
                style={{ marginBottom: "20px" }}
                value={changedData.steps[currentStep].feedbackB?.explanation}
                name="feedbackB"
                onChange={(e) => {
                  handleStepsUpdate(e.target.value, e.target.name);
                }}
              />
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
            </div>
            <h2 style={{ marginBottom: "20px" }}>Eindpagina</h2>
            <p>Id video</p>{" "}
            <Form.Control
              style={{ marginBottom: "20px" }}
              placeholder="Id video voor laatste pagina"
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
              variant="primary"
              onClick={handleScenario}
            >
              Maak scenario{" "}
            </Button>
          </>
        )
      ) : (
        <Navigate to={"/profile"} />
      )}
    </div>
  );
};
