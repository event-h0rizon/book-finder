import BookResults from "./BookResults";
import Navbar from "./Navbar";
import SearchBook from "./SearchBook";
import React, { useState, useReducer, useEffect, useMemo, useRef, useCallback } from "react";
import axios from "axios";
import Spinner from "./Spinner";



function App() {
  const bookStyle= {
    border: "1px solid gray",
    fontSize: "24px",
    textAlignment: "center",
    borderRadius: "4px",
    paddingTop: "6px",
    paddingBottom: "6px",
    paddingRight: "8px",
    paddingLeft: "8px",
    marginBottom: "8px",
  }
 

  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [books, setBooks] = useState([]);

  const observer = useRef()
  const lastBookElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prev => prev + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])



  const handleChange = (e) => {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  useEffect(() => {
    setLoading(true)
    setError(false)
    if(pageNumber===1){
    setBooks([])
    }
  }, [query, pageNumber]);



  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: 'https://openlibrary.org/search.json',
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      console.log(res.data)
      setBooks(prevBooks => {
        return [...new Set([...prevBooks, ...res.data.docs.map(b => b.title)])]
      })
      setHasMore(res.data.docs.length > 0)
      setLoading(false)
      console.log(books)
    }).catch(e => {
      if (axios.isCancel(e)) return
    })
    return () => cancel()
  }, [query, pageNumber]);


  return (
    <>
      <Navbar />
      <h5 className="container my-3">Find books, by typing the title below</h5>
      <SearchBook query={query} handleChange={handleChange} />
     
      {/* <BookResults books={books} observer={observer} lastBookElementRef={lastBookElementRef} /> */}
      <div className='container my-3'>
        {books.map((book, index) => {
          if (books.length === index + 1) {
            return <div ref={lastBookElementRef} style={bookStyle} className="book" key={index}>{book}</div>

          }
          else {
            return <div key={index} style={bookStyle} className="book">{book}</div>

          }

        })}
        <div className="py-4">
        {loading && <Spinner />}
        </div>
    




      </div>
    </>

  );
}

export default App;
