import { useEffect, useState } from "react";
import ScenarioStart from "./ScenarioStart";
import ScenarioFinal from "./ScenarioFinal";

import ScenarioChoice from "./ScenarioChoice";
import { redirect, useLoaderData, useOutletContext } from "react-router-dom";
import {
  createStatus,
  updateStatus,
  getStatus,
  getScenarioAndStatus,
  resetScenario,
} from "../../services/scenarios";
import GoalsSpecific from "../GoalsSpecific";
import TheorySpecific from "../TheorySpecific";

export async function loader({ params }) {
  const data = await getScenarioAndStatus(params.id);
  return { data };
}

function Scenario() {
  const { data } = useLoaderData();
  const [scenario, setScenario] = useState(0);
  const [walkthrough, setWalkthrough] = useState(null);
  const [step, setStep] = useState(0);
  const [scenarioCompleted, setScenarioCompleted] = useState(false);
  const [tab, setTab] = useState("scenario");

  //on page load, get the saved status
  useEffect(() => {
    //get the status
    if (data) {
      setScenario(data.scenario);
      setWalkthrough(data.walkthrough);
      setTab("scenario");
      if (data.status) {
        setStep(data.status.step);
        setScenarioCompleted(data.status.scenarioCompleted);
      } else {
        setStep(0);
        setScenarioCompleted(false);
      }
    }
  }, [data]);

  function handleCompleteStep(choice, feedback) {
    const answers = { step, choice, feedback };
    const currentStep = step + 1;

    if (step === scenario.steps.length) {
      setStep(0);
      updateStatus(scenario.id, answers, 0, true).then(() => {
        setScenarioCompleted(true);
      });
    } else {
      setStep(currentStep);
      updateStatus(scenario.id, answers, currentStep, false);
    }
  }

  const handleStart = (fullname, email) => {
    setStep(step + 1);
    createStatus(fullname, email, scenario.id);
  };

  const handleReset = () => {
    setStep(0);
    setScenarioCompleted(false);
    resetScenario(scenario.id);
    redirect("/scenarios");
  };

  const renderTab = (tab) => {
    if (tab === "scenario") {
      // Render scenario start
      if (step === 0 && !scenarioCompleted) {
        return (
          <ScenarioStart
            description={scenario.description}
            walkthrough={walkthrough}
            onClickStart={handleStart}
          />
        );
      }
      // Render scenario choice
      if (step > 0 && step <= scenario.steps.length) {
        return (
          <ScenarioChoice
            step={scenario.steps[step - 1]} //zero based
            onComplete={handleCompleteStep}
            onReset={handleReset}
          />
        );
      }

      //Render scenario final
      if (scenarioCompleted) {
        return (
          <ScenarioFinal
            id={scenario.id}
            final={scenario.final}
            onReset={handleReset}
          />
        );
      }
    } else if (tab === "goals") {
      // console.log(scenario.goals)
      return <GoalsSpecific data={scenario.goals} />;
    } else if (tab === "theory") {
      return <TheorySpecific data={scenario.theory} />;
    }
  };

  return (
    <>
      <ul class="nav nav-tabs">
        <li
          class="nav-item"
          onClick={() => setTab("scenario")}
          style={{ cursor: "pointer" }}
        >
          <p
            class={tab == "scenario" ? "nav-link active" : "nav-link"}
            aria-current="page"
            href="#"
          >
            Oefening
          </p>
        </li>
        <li class="nav-item" onClick={() => setTab("goals")}>
          <div
            class={tab == "goals" ? "nav-link active" : "nav-link"}
            style={{ cursor: "pointer" }}
          >
            Doelstellingen
          </div>
        </li>
        {scenario.theory ? (
          <li class="nav-item" onClick={() => setTab("theory")}>
            <div
              style={{ cursor: "pointer" }}
              class={tab == "theory" ? "nav-link active" : "nav-link"}
              href="#"
            >
              Theorie
            </div>
          </li>
        ) : null}
      </ul>
      {scenario === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <h1 className="mt-3 mb-3">{scenario.title}</h1>
      )}
      {renderTab(tab)}

      {/* {step === 0 && !scenarioCompleted ? 
        <ScenarioStart 
            description={scenario.description}
            walkthrough={walkthrough} 
            onClickStart={handleStart} /> 
        : null} */}

      {/* {scenarioCompleted ? <ScenarioFinal id={scenario.id} final={scenario.final}  onReset={handleReset}/> : null}  */}

      {/* {step > 0 && step <= scenario.steps.length ? 
        <ScenarioChoice 
          step={scenario.steps[step-1]} //zero based
          onComplete={handleCompleteStep} 
          onReset={handleReset}
          /> : null} */}
    </>
  );
}

export default Scenario;
