import React from 'react'
import YoutubeVideo from './Scenario/YoutubeVideo';
import Accordion from 'react-bootstrap/Accordion'

const ExerciseFeedback = ({ex}) => {
  return (
    <Accordion.Item eventKey={ex.id}>
      <Accordion.Header>{ex.title} - Feedback</Accordion.Header>
      <Accordion.Body>
        <div className="row">
          <div className="col-12">
            <h2>Feedback</h2>
            <p>Thanks for completing the exercise. Your answer was the following:</p>
            <p>{ex.answer}</p>
          </div>
        </div>

    
        <div className="row">
          <div className="col-6">
            <p>{ex.titleChoiceA}</p>
            <YoutubeVideo videoId={ex.videoIdChoiceA} />
            <p>{ex.feedbackA.explanation}</p>
          </div>
          <div className="col-6">
            <p>{ex.titleChoiceB}</p>
            <YoutubeVideo videoId={ex.videoIdChoiceB} />
            <p>{ex.feedbackB.explanation}</p>
          </div>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};


export default ExerciseFeedback