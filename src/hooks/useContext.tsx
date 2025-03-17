import { createContext, Dispatch, SetStateAction } from 'react'

export interface GlobalContextType {
	login: boolean
	setLogin: Dispatch<SetStateAction<boolean>>
}

export const MyGlobalContext = createContext<GlobalContextType>({
	login: false,
	setLogin: () => {},
})