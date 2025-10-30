import { createContext, useContext, useState } from "react";

interface ContextinterFace {
    reloader: {
        fullPageReloader: boolean,
        mainPageReloader: boolean,
        profilePageReloader: boolean,
        splasPageReloader: boolean,
        authPageReloader: boolean
    }
    setReloader: any,
    initialRoute: string | null | any,
    setInitialRoute: any
}

const Context = createContext<ContextinterFace | undefined>(undefined);

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    // root hooks
    const [reloader, setReloader] = useState({
        fullPageReloader: false,
        mainPageReloader: false,
        profilePageReloader: false,
        splasPageReloader: false,
        authPageReloader: false
    })
    const [initialRoute, setInitialRoute] = useState<string | null>(null)


    return (
        <Context.Provider
            value={{
                reloader,
                setReloader,
                initialRoute,
                setInitialRoute
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const userContext = () => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('userContext must be used within a ContextProvider');
    }
    return context;
};

