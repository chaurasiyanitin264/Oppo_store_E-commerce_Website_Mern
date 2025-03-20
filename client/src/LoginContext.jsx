import { createContext, useState } from "react";

// Create the context
const LoginContext = createContext();

// Context provider component
const LoginContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginContextProvider;  // Default export
export { LoginContext };  // Named export
