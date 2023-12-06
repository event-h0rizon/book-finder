// import React from 'react'
import React, { useState, useReducer, useEffect, useMemo, useRef, useCallback } from "react";
import Spinner from "./Spinner";


export default function BookResults(props) {
  return (
    <div className='container my-3'>


      {props.books.map((book, index) => {

        return <div key={index}>{book}</div>


      })}



    </div>
  )
}
