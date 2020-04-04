import $ from "jquery";
import React,{useState} from 'react';
import { Formik } from 'formik';
import {useBooksValue} from '../context/books-context'
import {Modal,Button,Form,ButtonGroup} from 'react-bootstrap'
export const EditBook = ({id}) => {
    const {books,setBooks}=useBooksValue();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true) ;
    return(
      <div>

      <Button as={ButtonGroup}variant="outline-danger" id="btnEdit" onClick={handleShow}>-</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editing Book...</Modal.Title>
        </Modal.Header>
        <Formik 
      initialValues={{  Name:"",Auther:"",Copies:"",MaxCop:""}}

      validate={values => {
        const errors = {};
        if (!values.Name) {
          errors.Name = 'Required';
        }
       else if (
          !/[a-z]+/i.test(values.Name)
          ) {
            errors.Name = 'Invalid Book Name';
          }
        if (!values.Auther) {
            errors.Auther = 'Required';
          }
         else if (
            !/[a-z]+/i.test(values.Auther)
            ) {
              errors.Auther = 'Invalid Book Auther Name';
            }
          if (!values.Copies) {
            errors.Copies = 'Required';
          }
          
          if(isNaN(values.Copies)){
            errors.Copies="please enter a valid number"

          }
          if(  values.Copies>values.MaxCop)
          {
            errors="Copies cant be more than maximum number of copies";
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
            type: "PUT",
            url: `https://localhost:44330/api/books/PutBook/${id}`,
            dataType: 'json',
          data:  {"Id":id,"Name":values.Name,"Auther":values.Auther,"Copies":values.Copies,"MaxCop":values.MaxCop},
        //   success: setBooks([...books]),
           success: setBooks(prevBooks=>([...books])),
        })
        setSubmitting(false);
        handleClose()

        
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 400);

        // console.log(values.email)
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
        <Form onSubmit={handleSubmit} onReset={handleReset} id="bookEditingingForm">
           <Modal.Body>

<Form.Label>Book Name</Form.Label>

          <Form.Control
          className="bookEditingFormTextBox"
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
          className="bookEditingFormTextBox"
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
           className="bookEditingFormTextBox"
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
           className="bookEditingFormTextBox"
            type="text"
            name="MaxCop"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.MaxCop}
          />
{errors.MaxCop && touched.MaxCop ? (
           <div class="errorMsg">{errors.MaxCop}</div> ) : null} 
                    {/* <Button  type="submit" disabled ={isSubmitting}> */}
            {/* Submit
          </Button> */}
    </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="reset" >
Clear          </Button>
          <Button  variant="primary"type="submit" id="bookEdit"disabled ={isSubmitting} onClick={ ()=>{if(values.Copies>values.MaxCop){errors.Copies="Copies cant be more than maximum number of copies"}}}>
            Save Changes
          </Button>

        </Modal.Footer>
        </Form>
        )}
    </Formik>
        </Modal>
 
        </div>

    )
}
