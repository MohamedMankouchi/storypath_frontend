import React from 'react'
import Accordion from 'react-bootstrap/Accordion'

const InfoSectionMulti = ({description, list, title, id}) => {


  const contentList = (content) => {
    return (
      <ul>
        {content.map(e => 
            <li key={e.title}><i>{e.title}</i>: {e.descr}
              {e.content ? contentList(e.content) : null}
            </li>
        )}
      </ul>
    )
  }

  return (
    
      <Accordion.Item eventKey={id}>
        <Accordion.Header>{title}</Accordion.Header>
        <Accordion.Body>
          <p>{description}</p>

          {list.map(e =>
            <div key={e.block}>
              <h4>{e.title}</h4>
                  {contentList(e.content)}
            </div>
          )}
        
             
          
        </Accordion.Body>
      </Accordion.Item>
  
    
  )
}

export default InfoSectionMulti