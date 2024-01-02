import React, {useState} from 'react'
import Scenario from '../components/Scenario/Scenario'
import InfoSectionSingle from '../components/InfoSectionSingle'
import InfoSectionMulti from '../components/InfoSectionMulti'
//data
import pathdata from "../data/pathdata.json"
import Accordion from 'react-bootstrap/Accordion'


function InfoPage() {

  const [info, setInfo] = useState(pathdata)
  const [currentScenario, setCurrentScenario] = useState(pathdata.scenarios[0])

  function handleScenarioFinish(){
    setCurrentScenario({...currentScenario, finished: true})
    setInfo({...info, exercises: info.exercises.map(e => e.id === currentScenario.id ? {...e, finished: true} : e) })
    
  }

  // let content = false
  // if(currentScenario.finished){
  //   content = <ExerciseFeedback ex={currentExercise}/>
  // }else{
  //   content = <Exercise ex={currentExercise} onClick={handleExerciseFinish}/>
  // }

  return (
    <div className='container'>
        <h1>{info.title}</h1>
        <p>{info.description}</p>
        <hr></hr>
        <Accordion defaultActiveKey="0">
          <InfoSectionSingle {...info.goals}/>
          <InfoSectionMulti {...info.theory}/>
        </Accordion>
        
        <hr></hr>
        <h2>Scenario's</h2>
        {/* choice of 6 scenes, represented by 6 buttons */}
        <div className="row">
          <p>You can choose your scenario here</p>
          {info.scenarios.map(e =>
            <div className="col-2" key={`button${e.id}`}>
              <button 
                className={`btn ${e.finished ? "btn-success" : "btn-primary"}`} 
                onClick={() => setCurrentScenario(e)}>{e.title}
              </button>
            </div>
          )}
        </div>
        <br></br>
         {/* the current scene */}
        
        <Scenario 
          scenario={currentScenario} 
          walkthrough={info.walkthrough.desc} 
          onClick={handleScenarioFinish}/>
        
        
        <hr></hr>
        <br></br>
        <div className="row">
          <div className="col-6">
          <div className="float-right">
            <img src="https://www.hogent.be/themes/hogent/assets/images/HOGENT_Logo.png" alt="logo" />
           
            </div>
            
          </div>
          <div className="col-6">
            <img src="https://www.erasmushogeschool.be/themes/custom/ehb/logo.svg" alt="logo" />
            <div>
              <p>Erasmushogeschool Brussel</p>
              
            </div>
          </div>
        </div>
          
    </div>
  )
}

export default InfoPage