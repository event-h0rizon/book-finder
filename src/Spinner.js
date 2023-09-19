import React from 'react'
import spinner from './spinner.gif'

export default function Spinner() {
  return (
    <div className='container text-center my-3'> 
      <img src={spinner} width="50px" alt="Loading..." />
    </div>
  )
}
