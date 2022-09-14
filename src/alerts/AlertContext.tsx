import React, { useReducer, ReactNode } from 'react'
import { alertReducer, initialState } from './alertReducer'
import { IAlertContext } from './types'

const initialData: IAlertContext = {
	state: initialState,
	dispatch: () => null 
}

export const AlertContext = React.createContext(initialData)

export const AlertProvider = ({ children }: { children: ReactNode}) => {
	// const [state, dispatch] = useReducer()
	const [state, dispatch] = useReducer(alertReducer, initialState)

	const value: IAlertContext = {
		state,
		dispatch,
	}

	return <AlertContext.Provider value={value}>
		{children}
	</AlertContext.Provider>
}

export default AlertContext