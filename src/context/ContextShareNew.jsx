import React, { createContext, useState } from "react";

export const addProjectResponseContext = createContext();
export const editProjectResponseContext = createContext();


function ContextShareNew({ children }) {
  //children is the predefine pros name used to share data between components
  //create a state that need to be shared
  const [addProjectResponse, setAddProjectResponse] = useState({});
  const [editProjectResponse, setEditProjectResponse] = useState({});
  return (
    <>
      <addProjectResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
        <editProjectResponseContext.Provider value={{ editProjectResponse, setEditProjectResponse }}>
          {children}
        </editProjectResponseContext.Provider>
      </addProjectResponseContext.Provider>
    </>
  )
}

export default ContextShareNew