import React from "react";
import { UserContextType } from "../interfaces/UserContext";

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export default UserContext;
