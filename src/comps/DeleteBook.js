import React,{useState} from 'react';
import {useBooksValue} from '../context/books-context'
import $ from "jquery";
import {Modal,Button,Alert,ButtonGroup} from 'react-bootstrap'


export const DeleteBook  = ({id}) => {
   
    const {books,setBooks}=useBooksValue();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true) ;

    const DeleteBook=()=>{
        
        $.ajax({
            type:'delete',
            // url:'https://localhost:44330/api/books/DeleteBook/'+id,
            url:`https://localhost:44330/api/books/DeleteBook/${id}`,

            dataType:'json',
            sucess:function (data) {
                JSON.stringify(data)
                setBooks(data)      
            }
        }) 
        handleClose()    
    }

    return(
<>
        <Button as={ButtonGroup} id="btnDelete" variant="outline-danger" onClick={handleShow}>x</Button>
        <div id="alertMsg">

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
<Alert variant="danger" >
        <Alert.Heading>Are you sure you want to delete this Book?</Alert.Heading>
      
      </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
No          </Button>
          <Button variant="danger" type="submit" id="bookDelete"onClick={DeleteBook}>
Yes          </Button>
        </Modal.Footer>
        </Modal>
    
        </div>
        </>
    )
    
    
}

