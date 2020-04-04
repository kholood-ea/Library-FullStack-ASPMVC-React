import React from 'react';
import{BrowserRouter ,Switch,Route} from 'react-router-dom'
import "./App.css"
import {Books} from './comps/Books'
import { BooksProvider, PersonsProvider, ProcessesProvider  } from "./context";
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavBar}from './comps/NavBar'
import { Persons } from './comps/Persons';
import { BooksBorrowed } from "./comps/BooksBorrowed";

function App() {
 
  



  return (
    <BrowserRouter>
    <BooksProvider>
      <PersonsProvider>
        <ProcessesProvider>
      <main>
        <NavBar/>
        <Switch>
          <Route path="/" exact component={Books}/>

          <Route path="/Persons" exact component={Persons}/>
          <Route path="/BooksBorrowed" exact component={BooksBorrowed}/>

        </Switch>
      </main>
      </ProcessesProvider>
      </PersonsProvider>
    </BooksProvider>
    </BrowserRouter>
  )
 

}

export default App;
