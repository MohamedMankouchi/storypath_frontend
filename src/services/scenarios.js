import localforage from "localforage";

export async function createStatus(fullname, email, scenarioId) {
  let status = await localforage.getItem("scenarioStatus");
  let scenario = {
    fullname,
    email,
    scenarioId,
    answers: [],
    step: 1,
    scenarioCompleted: false,
  };
  if (status) {
    //kill duplicate scenario
    status = await removeProgress(scenarioId);
    status.push(scenario);
  } else {
    status = [scenario];
  }

  console.log(status);
  await set(status);
  return status;
}

export async function getStatus() {
  let status = await localforage.getItem("scenarioStatus");
  return status ?? null;
}

export async function updateStatus(scenario, answers, step, scenarioCompleted) {
  let status = await localforage.getItem("scenarioStatus");
  if (status) {
    let scenarioStatus = status.find(
      (scenarioStatus) => scenarioStatus.scenarioId === scenario
    );
    if (scenarioStatus) {
      scenarioStatus.answers.push(answers);
      scenarioStatus.step = step;
      scenarioStatus.scenarioCompleted = scenarioCompleted;
      await set(status);
      return status;
    }
  }
  return false;
}

export async function removeProgress(scenarioId) {
  let status = await localforage.getItem("scenarioStatus");
  if (status) {
    status = status.filter((scenario) => scenario.scenarioId !== scenarioId);
    await set(status);
    return status;
  }
  return false;
}

function set(status) {
  return localforage.setItem("scenarioStatus", status);
}

export async function getGoals() {
  let resp = await fetch("https://storypathapi.onrender.com/");
  let data = await resp.json();

  return data.goals;
}
export async function getTheory() {
  let resp = await fetch("https://storypathapi.onrender.com/");
  let data = await resp.json();

  return data.theory;
}

export async function getScenarios() {
  let resp = await fetch("https://storypathapi.onrender.com/");
  let data = await resp.json();

  //find local progress
  let status = await localforage.getItem("scenarioStatus");
  if (status) {
    data.scenarios.forEach((scenario) => {
      let scenarioStatus = status.find(
        (scenarioStatus) => scenarioStatus.scenarioId === scenario.id
      );
      if (scenarioStatus) {
        scenario.completed = scenarioStatus.scenarioCompleted;
      }
    });
  }

  return {
    scenarios: data.scenarios,
    walkthrough: data.walkthrough,
  };
}

export async function getScenarioAndStatus(id) {
  let scenarioAndStatus = {};

  let resp = await fetch("https://storypathapi.onrender.com/");
  let data = await resp.json();

  let scenario = data.scenarios.find((scenario) => scenario.id == id);
  if (scenario) {
    scenarioAndStatus.scenario = scenario;
  } else {
    scenarioAndStatus.scenario = null;
  }

  //find local progress
  let status = await localforage.getItem("scenarioStatus");
  if (status) {
    let currentScenarioStatus = status.find(
      (status) => status.scenarioId == id
    );
    if (currentScenarioStatus) {
      scenarioAndStatus.status = currentScenarioStatus;
    } else {
      scenarioAndStatus.status = null;
    }
  }

  //add walkthrough
  scenarioAndStatus.walkthrough = data.walkthrough;

  return scenarioAndStatus;
}

export async function resetScenario(id) {
  let status = await localforage.getItem("scenarioStatus");
  if (status) {
    status = status.filter((scenario) => scenario.scenarioId !== id);
    await set(status);
    return status;
  }
  return false;
}

export async function getAnswers(id) {
  let status = await localforage.getItem("scenarioStatus");
  console.log(id);
  let scenario = status.find((status) => status.scenarioId == id);
  if (scenario) {
    return scenario.answers;
  } else {
    return null;
  }
}
