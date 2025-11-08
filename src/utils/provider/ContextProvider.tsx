import BottomSheet from "@gorhom/bottom-sheet";
import { createContext, useContext, useRef, useState } from "react";

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
    setInitialRoute: any,
    univarsalTokenData: null | any | {
        Token: null,
        Id: null
    }
    setUnivarsalTokenData: any
    userData: {
        attendanceData: any | null;
        profileImage: any | null;
        castReliganData: any | null;
        corseData: any | null;
        fatherDetilesData: any | null;
        idDetilesData: any | null;
        personlInformationData: any | null;
        studentAddressData: any | null;
        userDetilesData: any | null;
    },
    setUserDta: any,
    modalProvider: boolean,
    setModalProvider: any,
    dataLoading: {
        loading: boolean,
        status: boolean
    },
    setDataLoading: any,
    appReady: boolean,
    setAppReady: any,
}

const Context = createContext<ContextinterFace | undefined>(undefined);

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    // root hooks

    const [appReady, setAppReady] = useState<boolean>(false)
    const [reloader, setReloader] = useState({
        fullPageReloader: false,
        mainPageReloader: false,
        profilePageReloader: false,
        splasPageReloader: false,
        authPageReloader: false
    })
    const [initialRoute, setInitialRoute] = useState<string | null>(null)
    const [univarsalTokenData, setUnivarsalTokenData] = useState<null | string | null | any>({
        Token: null,
        Id: null
    })

    const [userData, setUserDta] = useState<any | null | {
        attendanceData: any | null;
        profileImage: any | null;
        castReliganData: any | null;
        corseData: any | null;
        fatherDetilesData: any | null;
        idDetilesData: any | null;
        personlInformationData: any | null;
        studentAddressData: any | null;
        userDetilesData: any | null;
    }>(null)
    const [modalProvider, setModalProvider] = useState<boolean>(false)

    const [dataLoading, setDataLoading] = useState<{
        loading: boolean,
        status: boolean
    }>({
        loading: true,
        status: true
    });


    return (
        <Context.Provider
            value={{
                reloader,
                setReloader,
                initialRoute,
                setInitialRoute,
                univarsalTokenData,
                setUnivarsalTokenData,
                userData,
                setUserDta,
                modalProvider,
                setModalProvider,
                dataLoading,
                setDataLoading,
                appReady,
                setAppReady,

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

