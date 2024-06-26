//Global context to store the name of the user
import {createContext, useContext} from "react"

type IGlobalContext = {
    name: string,
    setName: (name: string) => void
}

export const GlobalContext = createContext<IGlobalContext>({
    name: "",
    setName: () => {}
})

export const useGlobalContext = () => useContext(GlobalContext)