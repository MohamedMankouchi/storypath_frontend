import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { getGoals } from '../services/scenarios'

export async function loader(){
    const goals = await getGoals()
    
    return {goals}
}

const Goals = () => {
    const {goals} = useLoaderData()
  return (
    <div className='container'>
        <h1>Doelstellingen</h1>
        <p>{goals.description}</p>
        <ul>
            {goals.list.map(e => 
                <li key={Math.random()}>{e}</li>
            )}
        </ul>
    </div>
  )
}

export default Goals