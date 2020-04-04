import React, { createContext, useContext } from 'react';
import {useProcesses} from '../hooks'

export const ProcessesContext=createContext();
export const ProcessesProvider = ({children}) => {
    const{processes, setProcesses}=useProcesses();
    return(
        <ProcessesContext.Provider value ={{processes, setProcesses}}>
        {children}
        </ProcessesContext.Provider>

    )
}
export const useProcessesValue=()=>useContext(ProcessesContext)