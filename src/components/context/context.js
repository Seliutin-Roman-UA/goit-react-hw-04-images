import { createContext, useState } from 'react';

export const SearchContext = createContext();

export function SearchContextProvider({ children }) {
  const initstate = {
    searchString: '',
    media: 'photo',
    category: '',
    
  };
  const [data, setData] = useState(initstate);

  return (
    <SearchContext.Provider value={{ data, setData }}>
      {children}
    </SearchContext.Provider>
  );
}
