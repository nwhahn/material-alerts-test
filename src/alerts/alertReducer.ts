import { AlertAction, AlertActions, AlertState, IAlert } from './types'
import { v4 as generateUniqueId } from 'uuid'

export const initialState: AlertState = {
	alerts: [],
}

const generateAlert = (state: AlertState, alert: IAlert): AlertState => {
	const newAlert: IAlert = {
		// Defaults are overriden if not provided
		alertType: 'info',
		timeout: 10, // 10s default
		...alert,
	}
	if(!newAlert.id) newAlert.id = generateUniqueId()
	
	return {
		...state,
		alerts: [...state.alerts || [], newAlert]
	}
}

const removeAlert = (state: AlertState, id: string): AlertState => {
	const {alerts} = state
	return {
		...state,
		alerts: alerts.filter(alert => alert.id !== id)
	}
}

const clearAll = (state: AlertState): AlertState => {
	return {
		...state,
		alerts: []
	}
}

export const alertReducer = (state: AlertState, action: AlertAction) => {
	switch(action.type){
	case AlertActions.ADD_ALERT:
		return generateAlert(state, action.payload)
	case AlertActions.REMOVE_ALERT:
		return removeAlert(state, action.payload.id)
	case AlertActions.CLEAR_ALL:
		return clearAll(state)
	default:
		return state
	}
}

