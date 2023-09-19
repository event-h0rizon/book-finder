import React, {useState} from 'react'

export default function SearchBook(props) {

  return (
    <div className='container'>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="text" value={props.query} onChange={(e)=> props.handleChange(e)} placeholder="Search book titles..." aria-label="Search"  />
        {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
      </form>
    </div>
  )
}
