import $ from "jquery";
import React, { useState } from 'react';
import {Button,Form,Modal,ButtonGroup,ModalBody,ListGroup} from 'react-bootstrap'
import { Formik } from 'formik';
import {useProcessesValue} from '../context/process-context'

import { AddNewBorr } from "./AddNewBorr";

export const AddBorrower = () => {
  
    const [show, setShow] = useState(false);
    const [books, setBooks] = useState([])
    const [BookId, setBookID] = useState("")
    const [bookName, setBookName] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true) ;
    const [borrower, setBorrower] = useState([])
    const [BorrowerId, setBorrowerID] = useState("")

 


    return(
      books&&
        <div>
        {/* <Button  as={ButtonGroup} variant="outline-primary" onClick={handleShow}> Add Borrower</Button> */}
        <Button variant="outline-primary" onClick={handleShow}id="btnAddBorr"> Borrow / Return</Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Borrow/Return Book...</Modal.Title>
        </Modal.Header>
        <Formik 
      // initialValues={{  BookName:"",BorrowerEmail:"",BookId:BookId,BorrowerId:borrowerId}}
      initialValues={{  BookName:"",BookId,BorrowerEmail:"",BorrowerId}}

      validate={values => {
        const errors = {};
        if (
             !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.BorrowerEmail)
          ) {
            errors.BorrowerEmail = 'Invalid Email Address';
          }
        return errors;
      }}

      onSubmit={(values, { setSubmitting }) => {
        $.ajax({
          type: "POST",
          url: "https://localhost:44330/api/book_borrower/postbook_borrower",
          dataType: 'json',
        data:  {"BookId":BookId,"BookName":bookName,"BorrowerId":BorrowerId,"BorrowerEmail":values.BorrowerEmail,"ReturnedDate":null},
        //  success: setProcesses(prevBooks=>([...processes])),
      })
         setSubmitting(false);
        handleClose()

      }}

        >

           {
           ({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        handleReset
      }) => ( 
        
          <Form  onSubmit={handleSubmit} 
          // <Form  
          onReset={handleReset} id="borrowerAddingForm">
            <Form inline>
              <ModalBody>
                      {/* <BookSearch hd={handleChange} hb={handleBlur} val={values} /> 
              <PersonSearch hd={handleChange} hb={handleBlur} val={values}err={errors}tchd={touched} iss={isSubmitting}/> */}
 <Form.Label>Book Name   
                <Form.Control
          className="BorrowerAddingFormTextBox"
            type="text"
            name="BookName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.BookName}
          />
          <Button className="btnSearch" variant="outline-info"onClick={()=>{$.ajax({
          type: "Get",
          url: `https://localhost:44330/api/books/search/search?search_word=${values.BookName}`,
          dataType: 'json',
         success: function (data) {
          JSON.stringify(data)
          setBooks(data)
        }  
      })
}}>
  Search</Button></Form.Label>
        
            <ListGroup>
 {
     
     books&&books.map(book=>(
      //  <p className="searchResult">
      <p >

        {/* <ListGroup.Item className="searchResult" onClick={()=>console.log(bookName,BookId)+ setBookName(book.Name) + setBookID(book.Id)}> {book.Name} */}
        {/* <ListGroup.Item className="searchResult" onClick={()=>{console.log(bookName,BookId); setBookName(book.Name) ; setBookID(book.Id);}}> {book.Name} */}
        {/* <ListGroup.Item className="searchResult" onClick={function(){console.log(bookName,BookId); setBookName(book.Name) ; setBookID(book.Id);}}> {book.Name} */}
        {/* <a href="#" onClick={function(event){ func1(); func2()}}>Test Link</a> */}
        <ListGroup.Item className="searchResult" onClick={setBookName(book.Name) , setBookID(book.Id)}> {book.Name}

</ListGroup.Item>
    </p>
    ))
 }
 </ListGroup>
        
 <Form.Label id="id">Borrower Email  
              <Form.Control 
          className="BorrowerAddingFormTextBox"
            type="email"
            name="BorrowerEmail"
            onChange={handleChange}
            onBlur={handleBlur}
            // onFocus={hide}
            value={values.BorrowerEmail}
          />
          {errors.BorrowerEmail && touched.BorrowerEmail ? (
           <div id="errmsg"class="errorMsg">{errors.BorrowerEmail}</div> ) : null}
          <Button id="btnSearch" className="btnSearch"variant="outline-info"onClick={()=>{
            if (
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.BorrowerEmail)
           ) {
           
            $.ajax({
          type: "Get",
          url: `https://localhost:44330/api/Persons/search/search?search_word=${values.BorrowerEmail}`,
          dataType: 'json',
         success: function (data) {
          // JSON.stringify(data)
          setBorrower(data)
        }
      
        
      })
    }
    }
      } >Search</Button></Form.Label> 
        {/* <p className="searchResult"> */}
        <p >

            <ListGroup>
 {
     
     borrower&&borrower.map(borr=>(
         < ListGroup.Item className="searchResult"onClick={()=>setBorrowerID(borr.Id)}>Name: {borr.Name} 

</ListGroup.Item>
    
    ))
    
 }
 </ListGroup>
        </p>
<AddNewBorr onClick={handleClose}/>
              </ModalBody>
              </Form>
              <Modal.Footer id="borrModalFooter">
          <Button variant="primary" type="submit" id="borrSumbit" disabled ={isSubmitting}>
          {/* <Button variant="primary" id="borrSumbit" disabled ={isSubmitting} onClick={()=>{console.log(BookId,borrowerId)}}> */}

            Borrow Book
          </Button>
           <Button variant="primary"  id="returnSumbit" disabled ={isSubmitting} onClick={()=>$.ajax({
          type: "Get",
          url: `https://localhost:44330/api/book_borrower/returnBook/${BookId}/${BorrowerId}`,
          dataType: 'json',
        //  success: function (data) {
        //   // setBooks(data)
        // }  
      })
      &&handleClose()
}
           >
            Return Book
          </Button> 
          <Button id="Clear"variant="secondary" type ="reset">

            Clear
          </Button>
        </Modal.Footer>
              </Form>

      )}
        </Formik>
        </Modal>
      {/* } */}
        </div>
    )
}
