import { createContext } from "react";

const Appcontext = createContext();

const AppProvider = ({ children }) => {
return <Appcontext.Provider value="psk">{children}</Appcontext.Provider>;

};

export {AppProvider, Appcontext};