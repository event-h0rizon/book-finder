// import React from 'react'
import React, { useState, useReducer, useEffect, useMemo, useRef, useCallback } from "react";



export default function BookResults(props) {
  const bookStyle= {
    color: "red"
  }
  return (
    <div className='container my-3'>


      {props.books.map((book, index) => {

        return <div key={index} style={bookStyle} >{book}</div>


      })}



    </div>
  )
}
