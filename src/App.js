import BookResults from "./BookResults";
import Navbar from "./Navbar";
import SearchBook from "./SearchBook";
import React, {useState, useReducer, useEffect, useMemo, useRef, useCallback} from "react";
import axios from "axios";
import Spinner from "./Spinner";



function App() {

  const [query, setQuery]= useState('');
  const [pageNumber, setPageNumber]= useState(1);
  const [loading, setLoading]= useState(true);
  const [error, setError]= useState(1);
  const [hasMore, setHasMore]= useState(false);
  const [books, setBooks]= useState([]);

  const observer= useRef()
  const lastBookElementRef= useCallback(node=>{
    console.log(node)
    
  })


  // console.log(query)


  const handleChange= (e)=> {
    setQuery(e.target.value)
  }

  useEffect(() => {
    setLoading(true)
    setError(false)
    setBooks([])
  }, [query, pageNumber]);

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
    method: 'GET',
    url: 'http://openlibrary.org/search.json',
    params: {q: query, page: pageNumber},
    cancelToken: new axios.CancelToken(c => cancel= c)
  }).then(res => {
    console.log(res.data)
    setBooks(prevBooks => [...prevBooks, ...res.data.docs.map(b => b.title,)])
    setHasMore(res.data.docs.length>0)
    setLoading(false)
    console.log(books)
  }).catch(e => {
    if(axios.isCancel(e)) return
  })
    // Code to run after the component renders or when specific dependencies change

    // This is where you can perform side effects
    // For example, you can make API requests or manipulate the DOM
    
    // You can also return a cleanup function (optional)
    return () => cancel()
  }, [query, pageNumber]);




   
  return (
   <>
    <Navbar/>
    <h5 className="container my-3">Find books, by typing the title below</h5>
    <SearchBook query={query} handleChange={handleChange}/>
    {loading && <Spinner/>}
    <BookResults books={books} observer={observer} lastBookElementRef={lastBookElementRef}/>
   </>
  
  );
}

export default App;
