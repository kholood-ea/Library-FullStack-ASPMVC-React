import $ from "jquery";
import React, { useState } from 'react';
import {Button,Form,Modal,ButtonGroup,ModalBody} from 'react-bootstrap'
import { Formik } from 'formik';
import {useBooksValue} from '../context/books-context'
import {usePersonsValue} from '../context/persons-context'


export const AddNewBorr = () => {
    const {persons, setPersons}=usePersonsValue();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true) ;
    
    return(
        <>
        <Button variant="success" id="newBorr" onClick={handleShow}>
            Add New Borrower
        </Button>
        <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Adding New Borrower...</Modal.Title>
    </Modal.Header>
    <Formik 
      initialValues={{  Name:"",Email:""}}
      validate={values => {
        const errors = {};
        if (!values.Name) {
          errors.Name = 'Required';
        }
        else if (
          //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.Name)
          !/[a-z]+/i.test(values.Name)
          ) {
            errors.Name = 'Invalid Name';
          }
          if (!values.Email) {
            errors.Email = 'Required';
          }
          else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.Email)
            ) {
              errors.Email = 'Invalid Email';
            }
            return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
        
            $.ajax({
                type: "POST",
                url: "https://localhost:44330/api/Persons/postperson",
                dataType: 'json',
              data:  {"Name":values.Name,"Email":values.Email},
                 success: setPersons([...persons]),
          })
        
          
            setSubmitting(false);
            handleClose()
    
    
           
          }}
         
    
         
        >
           {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        handleReset
      }) => (
        
        <Form onSubmit={handleSubmit} onReset={handleReset} id="brrowerAddingForm">
                    <Modal.Body>

<Form.Label>Name</Form.Label>

          <Form.Control
          className="borrowerAddingFormTextBox"
            type="text"
            name="Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.Name}
          />
            {errors.Name && touched.Name ? (
           <div class="errorMsg">{errors.Name}</div> ) : null}
          <Form.Label>Email</Form.Label>
          <Form.Control
          className="bookAddingFormTextBox"
            type="Email"
            name="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.Email}
          />
{errors.Email && touched.Email ? (
           <div class="errorMsg">{errors.Email}</div> ) : null}  
   </Modal.Body>
         <Modal.Footer>
          <Button variant="primary" type="submit" id="borrowerSumbit"disabled ={isSubmitting}>
            Add
          </Button>
          <Button variant="secondary" type ="reset">
            Clear
          </Button>
        </Modal.Footer>
            
        </Form>
        )}

    </Formik>
    </Modal>
    </>
    )
}


