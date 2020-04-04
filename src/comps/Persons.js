import React,{useState,useEffect} from 'react';
import $ from "jquery";
import {usePersonsValue} from '../context/persons-context'
import {Table,Button,ButtonGroup} from 'react-bootstrap'
import {AddNewBorr} from './AddNewBorr'

export const Persons = () => {
     const {persons, setPersons}=usePersonsValue();
     document.title = "Borrowers";


     return(


        <main>
<AddNewBorr/>
    
  <Table striped bordered   id="tablePersons" border="1">
            <tr>
            {/* <th className="tableData">#</th> */}
            <th className="tableData"> Person Id</th>

                <th className="tableData"> Name</th>
                <th className="tableData">Email</th>
                
            </tr>
      {

    

persons.map(person=>(
    <tr id="person">
        <td className="tableData">{person.Id}</td>

<td className="tableData">{person.Name}</td>
<td className="tableData">{person.Email}</td>

    </tr>

))
}
        </Table>
        
        </main>
    
    
    )    
}

