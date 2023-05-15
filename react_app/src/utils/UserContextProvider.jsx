import React, { createContext, useContext, useState } from "react";

// The context is imported and used by individual components that need data
// import { UserContext } from "./utils/UserContextProvider";
//
// const { currentUser, token } = useContext(UserContext);
const UserContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

// This function is exported and used in App.js to provide the context to its children
// import { ContextProvider } from "./utils/UserContextProvider";
//
// function App() {
//   return (
//     <ContextProvider>
//       <div className="App">
//         <Navbar />
//             <Routes>
//                 <Route path="/" element={ <Home /> } />
//                 <Route path="/routes" element={ <Jeepney_Routes /> } />
//                 <Route path="/how-to-ride" element={ <HowToRide /> } />
//             </Routes>
//         <MapContainer />
//       </div>
//     </ContextProvider>
//   );
// }
//
// export default App;

export const ContextProvider = ( { children } ) => {
    const [user, setUser] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token) => {
        _setToken(token);  // set token in state
        if (token) {
            // set token in local storage
            localStorage.setItem("token", JSON.stringify(token)); // convert token to string
        } else {
            // remove token from local storage
            localStorage.removeItem("token");
        }
    };

    return (
        // The context provider stores the state and functions to update state
        // and wraps the app in the context provider component
        // <UserContext.Provider value={{ user, setUser, token, setToken }}>
        //     {children}
        // </UserContext.Provider>

        <UserContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
        }}>
            { children }
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    return useContext(UserContext);
}