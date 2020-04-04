import React, { createContext, useContext ,useMemo} from 'react';
import {useBooks} from '../hooks'

export const BooksContext=createContext();
export const BooksProvider = ({children}) => {
    const{books,setBooks}=useBooks();


    //  const{Switch, setSwitch}=useBooks();
    // const providerValue = React.useMemo(() => ({
    //     books, setBooks,
    //     Switch, setSwitch,
    // }), [books, Switch]);
    return(
        <BooksContext.Provider value ={{books,setBooks}}>
         {/* <BooksContext.Provider value ={providerValue}>    */}
        {children}
        </BooksContext.Provider>

    )
}
export const useBooksValue=()=>useContext(BooksContext)
