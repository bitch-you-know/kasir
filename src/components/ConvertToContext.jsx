import React from "react";


export const ConvertToContext = React.createContext({
    formatRupiah: (number) => {},
  });

export const ConvertContextProvider = ConvertToContext.Provider;
export const ConvertContextConsumer = ConvertToContext.Consumer;