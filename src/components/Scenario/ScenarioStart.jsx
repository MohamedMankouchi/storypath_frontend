import React, { useState } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";

const ScenarioStart = ({ step, walkthrough, description, onClickStart }) => {
  const user = useOutletContext();
  const contentList = (content) => {
    return (
      <ul key={Math.random()}>
        {content.map((e) => (
          <li key={Math.random()}>
            {e.title ? <i>{e.title}: </i> : null}
            {e.descr}
            {e.content ? contentList(e.content) : null}
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div>
      {/* <h4>Beschrijving van het scenario</h4> */}
      <div
        className="mt-3"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>

      {/* {step.goals ? 
            <div>
                <h4>{step.goals.title}</h4>
                <ul>
                    {step.goals.list.map(e => 
                        <li key={Math.random()}>{e}</li>
                    )}
                </ul>
            </div> : null}

        {step.theory ? 
            <div>
                <h4>{step.theory.title}</h4>
                <p>{step.theory.description}</p>
                <ul>
                    {step.theory.list.map(e => 
                        <div key={e.block}>
                            <h6>{e.title}</h6>
                                {contentList(e.content)}
                        </div>
                    )}
                </ul>
            </div> : null}
         */}

      <h4 className="mb-3 mt-3">Werking van dit scenario</h4>
      {/* <p>{walkthrough}</p> */}
      <p>
        In dit interactief scenario ga je stap per stap een scene voorgeschoteld
        krijgen. Per scene dien je de juiste reactie aan te duiden en je
        argumentatie neer te schrijven. Na elke keuze volgt de feedback. Op het
        einde van het scenario krijg je een overzicht van al jouw keuzes en
        argumentatie.
      </p>

      {alert}
      <br></br>
      <Button
        variant="primary"
        onClick={() => onClickStart(user.user.fullName, user.user.email)}
      >
        Start het scenario
      </Button>
    </div>
  );
};

export default ScenarioStart;
