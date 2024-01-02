import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { getTheory } from '../services/scenarios'

export async function loader(){
  const theory = await getTheory()
  
  return {theory}
}

const Theory = () => {

  const {theory} = useLoaderData()

  const contentList = (content) => {
    return (
      <ul key={Math.random()}>
        {content.map(e => 
            <li key={Math.random()}>
              {e.title ?  <i>{e.title}: </i>: null}
              {e.descr}
              {e.content ? contentList(e.content) : null}
            </li>
        )}
      </ul>
    )
  }

  return (
    <>
        <h1>Theorie</h1>
        <p>{theory.description}</p>

        {theory.list.map(e =>
          <div key={e.block}>
            <h4>{e.title}</h4>
                {contentList(e.content)}
          </div>
        )}
    </>
  )
}

export default Theory