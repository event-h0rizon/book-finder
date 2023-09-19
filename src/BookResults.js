// import React from 'react'
import React, {useState, useReducer, useEffect, useMemo, useRef, useCallback} from "react";


export default function BookResults(props) {
  return (
    <div className='container my-3'>
      {props.books.map((book, index) => {
        if (props.books.id === index + 1) {
          return <div ref={props.lastBookElementRef} key={book}>{book}</div>
        }
        else {
          return <div key={book}>{book}</div>
        }
      })}
    </div>
  )
}
