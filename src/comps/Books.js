import React from 'react';
import {useBooksValue} from '../context/books-context'
import $ from "jquery";
import {AddBook} from './AddBook'
import { DeleteBook } from "./DeleteBook";
import {EditBook} from './EditBook'
import {Table,Button,ButtonGroup} from 'react-bootstrap'
import { AddBorrower } from "./AddBorrower";

export const Books = () => {
    const {books,setBooks}=useBooksValue();

    
    document.title = "Library";

    
    
    
    return(
        books&&
        <main>
                {/* <ButtonGroup vertical id="addingBookDiv">
                </ButtonGroup> */}
            <AddBook/>
            <AddBorrower/>
           

  
  <Table striped bordered   id="tableBooks" border="1">
            <tr>
            {/* <th className="tableData" colSpan="2">#</th> */}
            <th className="tableData">#</th>


                <th className="tableData" >Book Id</th>
                <th className="tableData">Book Name</th>
                <th className="tableData">Book Auther</th>
                <th className="tableData">Copies in Stock</th>
                <th className="tableData">Max Stock</th>
                {/* <th className="tableData">Add Borrower</th> */}

            </tr>
      {

    

books.map(book=>(
    <tr id="bookItem">

        {/* <td className="tableData"><span><button id="btnEdit">-</button>  <button id="btnDelete" onClick={DeleteBook(book.Id)}>X</button></span> </td> */}
        {/* <td className="bookSettings"><EditBook id={book.Id}/></td>
        <td className="bookSettings"> <DeleteBook id={book.Id} /></td> */}
        <td className="bookSettings"><ButtonGroup><EditBook id={book.Id}/>
         <DeleteBook id={book.Id} /></ButtonGroup></td>

<td className="tableData">{book.Id}</td>
<td className="tableData">{book.Name}</td>
<td className="tableData">{book.Auther}</td>
<td className="tableData">{book.Copies}</td>
<td className="tableData">{book.MaxCop}</td>
{/* <td className="tableData"><Button id="btnAddBorrower">+</Button></td> */}

    
    </tr>

))}
        </Table>
        
        </main>
    
    
    
    )
}
