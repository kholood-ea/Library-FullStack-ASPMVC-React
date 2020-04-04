import $ from "jquery";
import React, { useState } from 'react';
import {Table,Button,Form,Modal,ButtonGroup,ModalBody} from 'react-bootstrap'
import { Formik } from 'formik';
import { useProcessesValue } from "../context/process-context";

export const BooksBorrowed = (params) => {
    const {processes, setProcesses}=useProcessesValue()
    document.title = "BooksBorrowed";

    return(
        processes &&
        <Table striped bordered   id="tableBorrowedBook" border="1">
            <tr>
            {/* <th className="tableData">#</th> */}
                <th className="tableData">Book Id</th>
                <th className="tableData">Book </th>
                
                <th className="tableData"> Borrower Id</th>
                <th className="tableData"> Borrower Email </th>
                <th className="tableData">Returned Date</th>
            </tr>
      {

    

processes.map(process=>(
    <tr id="process">
<td className="tableData">{process.BookId}</td>
<td className="tableData">{process.BookName}</td>
<td className="tableData">{process.BorrowerId}</td>
<td className="tableData">{process.BorrowerEmail}</td>
<td className="tableData">{process.ReturnedDate}</td>

    </tr>

))
}
        </Table>
        
    )
}
