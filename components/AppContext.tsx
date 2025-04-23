import { createContext, ReactNode, useContext, useState } from "react";
type Context = {
    userId?: string
    setUserId?: (userId: string) => void
}

const context = createContext<Context>({})

export const AppContextProvider = (props: {children: ReactNode}) => {
    const [userId, setUserId] = useState<string | undefined>(undefined)
    return (
        <context.Provider value={{ userId, setUserId}}>
            {props.children}
        </context.Provider>
    )
}

export const useAppContext = () => {
    const value = useContext(context)
    if (!value) {
        throw new Error("useAppContext must be used within a AppContextProvider")
    }
    return value
}