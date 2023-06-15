import React, { FC, createContext, useContext } from "react";
import { useMediaQuery, createTheme } from "@mui/material";

const VisualContext = createContext({});

export const VisualProvider: FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    const theme = createTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const value = {
        isMobile: isMobile,
        theme: theme,
    };
    return (
        <VisualContext.Provider value={value}>
            {children}
        </VisualContext.Provider>
    );
};

export function useVisualContext() {
    return useContext(VisualContext);
}
