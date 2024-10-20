import React, { createContext, useState } from 'react';

export const EditingContext = createContext();

export const EditingProvider = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <EditingContext.Provider value={{ isEditing, setIsEditing }}>
      {children}
    </EditingContext.Provider>
  );
};
