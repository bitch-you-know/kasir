import React, { useState, createContext } from "react";

export const ConvertToContext = createContext({
  formatRupiah: (number) => {},
  keranjang: [],
  setKeranjang: () => {}
});

export const ConvertContextProvider = ({ children }) => {
  const [keranjangs, setKeranjangs] = useState([]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <ConvertToContext.Provider value={{ formatRupiah, keranjangs, setKeranjangs }}>
      {children}
    </ConvertToContext.Provider>
  );
};
