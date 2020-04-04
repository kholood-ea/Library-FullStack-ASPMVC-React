import React, { useState, useEffect} from "react";
import $ from "jquery";
import { isEqual } from "lodash";



export const useBooks = () => {
  // const [books, setBooks] = useState([bookId:"",bookName:"",bookCopies:"",bookMaxCop:""])
  const [books, setBooks] = useState([])
  // const [bookss, setBookss] = useState([])
  //   const [bOOl  , setBool] = useState(true)
  //  const [Switch, setSwitch] = useState("")
    
   const fetchBooks = async () => {
      const apiCall = await fetch('https://localhost:44330/api/books/getbook');
      const AllBooks = await apiCall.json();     
        setBooks(AllBooks)    
        // AllBooks.map(book=>console.log(book))
      }    

      // const ToggleSwitch=()=>{
      //   setBool(!bOOl)
      // }
    

  
useEffect(()=>{

  fetchBooks();
  // if (!isEqual(fetchBooks.AllBooks,previousBooks))
  // {
  //   fetchBooks();
  // }
     },[books]);
  // },[Object.values(books)]);
 
  return {books, setBooks }
}


export const usePersons = () => {

  const [persons, setPersons] = useState([])

  const fetchPersons = async () => {
    const data = await $.ajax({

      type: 'GET',
      url: ' https://localhost:44330/api/persons/getperson',
      dataType: 'json',
      success: function (data) {
        setPersons(data)
      }

    })
    //  data.map(book=>console.log(book.Name))
  }
  useEffect(() => {
    fetchPersons()
  }, [persons]);

  return { persons, setPersons };

}

export const useProcesses = () => {
  const [processes, setProcesses] = useState([])

  useEffect(() => {
    $(document).ready(function () {
      $.ajax({
        type: 'GET',
        url: 'https://localhost:44330/api/book_borrower/getbook_borrower',
        dataType: 'json',
        success: function (data) {
          JSON.stringify(data)
          setProcesses(data)


        }
      })
    });
  }, [processes]);

  return { processes, setProcesses };

}
