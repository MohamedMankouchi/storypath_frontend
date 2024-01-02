import React from 'react'
import Accordion from 'react-bootstrap/Accordion'

const InfoSectionSingle = ({description, list, title, id}) => {
  return (
    
      <Accordion.Item eventKey={id}>
        <Accordion.Header>{title}</Accordion.Header>
        <Accordion.Body>
        <p>{description}</p>
        <ul>
            {list.map(e => 
                <li key={Math.random()}>{e}</li>
            )}
        </ul>
        </Accordion.Body>
      </Accordion.Item>
  
    
  )
}

export default InfoSectionSingle