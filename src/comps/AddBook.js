import {useBooksValue} from '../context/books-context'
import React,{useState}from 'react';
import $ from "jquery";
import { Formik } from 'formik';
import {Button,Form,Modal} from 'react-bootstrap'



export const AddBook = () => {
    const {books,setBooks}=useBooksValue();
    // const {bookss,setBookss}=useBooksValue();
    // const{bOOl  , setBool}=useBooksValue();

    //  const{Switch, setSwitch}=useBooksValue();
    // const x="1";

    // const whatever=()=>{

    //   setSwitch(x)
    //   console.log(Switch)
    // }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true) ;

    // const ToggleSwitch=()=>setBool(!bOOl);
    
    
    return(

        <div>
            {/* <Button as={ButtonGroup} id="btnAddBook" onClick={handleShow} >Add Book</Button> */}
            <Button id="btnAddBook" onClick={handleShow} >Add Book</Button>

            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding a Book...</Modal.Title>
        </Modal.Header>

    <Formik 
      initialValues={{  Name:"",Auther:"",Copies:"",MaxCop:""}}
      validate={values => {
        const errors = {};
        if (!values.Name) {
          errors.Name = 'Required';
        }
        else if (
          //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.Name)
          !/[a-z]+/i.test(values.Name)
          ) {
            errors.Name = 'Invalid Book Name';
          }
        if (!values.Auther) {
            errors.Auther = 'Required';
          }
          else if (
            //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.Name)
            !/[a-z]+/i.test(values.Auther)
            ) {
              errors.Auther = 'Invalid Book Auther Name';
            }
          if (!values.Copies) {
            errors.Copies = 'Required';
          }
                  if(  values.Copies>values.MaxCop)
                  {
                    errors="Copies cant be more than maximum number of copies";
                  }

          if(isNaN(values.Copies)){
            errors.Copies="please enter a valid number"

          }
          if(isNaN(values.MaxCop)){
            errors.MaxCop="please enter a valid number"
 
        }
          if (!values.MaxCop) {
            errors.MaxCop = 'Required';
          }
        
       
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        $.ajax({
            type: "POST",
            url: "https://localhost:44330/api/books/PostBook",
            dataType: 'json',
          data:  {"Name":values.Name,"Auther":values.Auther,"Copies":values.Copies,"MaxCop":values.MaxCop},
             success: setBooks([...books]),
            //  success:ToggleSwitch(),  
      })
    
            setSubmitting(false);
      handleClose();

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
        
        <Form onSubmit={handleSubmit} onReset={handleReset} id="bookAddingForm">
                    <Modal.Body>

<Form.Label>Book Name</Form.Label>

          <Form.Control
          className="bookAddingFormTextBox"
            type="text"
            name="Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.Name}
          />
            {errors.Name && touched.Name ? (
           <div class="errorMsg">{errors.Name}</div> ) : null}
          {/* {errors.Name && touched.Name && errors.Name} */}
          <Form.Label>Book Auther</Form.Label>

          <Form.Control
          className="bookAddingFormTextBox"
            type="text"
            name="Auther"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.Auther}
          />
{errors.Auther && touched.Auther ? (
           <div class="errorMsg">{errors.Auther}</div> ) : null}
          <Form.Label>Stock</Form.Label>

           <Form.Control
           className="bookAddingFormTextBox"
            type="text"
            name="Copies"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.Copies}
          />
                    {errors.Copies && touched.Copies ? (
           <div class="errorMsg">{errors.Copies}</div> ) : null}
                    <Form.Label>Maximum Number of Copies</Form.Label>

           <Form.Control
           className="bookAddingFormTextBox"
            type="text"
            name="MaxCop"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.MaxCop}
          />
{errors.MaxCop && touched.MaxCop ? (
           <div class="errorMsg">{errors.MaxCop}</div> ) : null}   

         {/* <Button id="bookSumbit" type="submit" disabled ={isSubmitting}>Submit </Button> */}
         </Modal.Body>
         <Modal.Footer>
          {/* <Button variant="primary" type="submit" id="bookSumbit"disabled ={isSubmitting} onClick={ ()=>{if(values.Copies>values.MaxCop){errors.Copies="Copies cant be more than maximum number of copies"}}}> */}
          {/* <Button variant="primary" type="submit" id="bookSumbit"disabled ={isSubmitting} onClick={ ()=>{if(values.Copies>values.MaxCop){errors.Copies="Copies cant be more than maximum number of copies"}}}> */}
          <Button variant="primary" type="submit" id="bookSumbit"disabled ={isSubmitting} onClick={ ()=>{errors.Copies="Copies cant be more than maximum number of copies";
}}>

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

        </div>

    )


}


