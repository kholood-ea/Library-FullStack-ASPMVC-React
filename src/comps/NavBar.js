import React,{useState} from 'react';
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap'
import $ from "jquery";
import {useBooksValue} from '../context/books-context'
import { Formik } from 'formik';
import{Link} from 'react-router-dom'

export const NavBar = () => {
    const {books,setBooks}=useBooksValue();
    const [word, setWord] = useState("")

  //   $("#searchText").change(function () {
            
  //       $.ajax({
  //           type:'Get',
  //           url:'https://localhost:44330/api/books/search/search?search_word=complete',
  //           dataType:'json',
  //           sucess:function (data) {
  //               setBooks(data)      
  //           }
  //       })       
  // })

    return(
        <div>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">Library</Navbar.Brand>
    <Nav className="mr-auto">
     <Nav.Link href="/" >Books</Nav.Link>
      <Nav.Link href="/Persons">Borrowers</Nav.Link>

      <Nav.Link href="/BooksBorrowed">Books Borrowed</Nav.Link>
    </Nav>
      <Formik 
      // initialValues={{SearchWord:""}}
      initialValues={{word}}

      validate={values => {
        const errors = {};
        if (!values.word) {
            errors.word = 'Required';
          }
          
        return errors;
      }}

      
        
    
      >
      {({
        
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
        
          <Form inline id="bookSearchForm">

      <Form.Control  
       type="text"
            name="Search"
            onChange={handleChange,(e)=>setWord(e.target.value)}
            onBlur={handleBlur} 
            placeholder="Book Search"
         />
              {/* {errors.word && touched.word ? (
           <div id="errmsg"class="errorMsg">{errors.word}</div> ) : null} */}
      <Button id="btnSearch" variant="outline-info" onClick={()=>{$.ajax({
          type:'Get',
          url:`https://localhost:44330/api/books/search/search?search_word=${word}`,
          dataType:'json',
          sucess:function (data) {
              setBooks(data)      
          }
      })
      }} disabled ={isSubmitting}>Search</Button>

    </Form>
      )}
    </Formik>
  </Navbar>
  <br />
  
</div>
    )
    
}
