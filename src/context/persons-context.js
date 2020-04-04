import React, { createContext, useContext } from 'react';
import {usePersons} from '../hooks'

export const PersonsContext=createContext();
export const PersonsProvider = ({children}) => {
    const{persons, setPersons}=usePersons();
    return(
        <PersonsContext.Provider value ={{persons, setPersons}}>
        {children}
        </PersonsContext.Provider>

    )
}
export const usePersonsValue=()=>useContext(PersonsContext)