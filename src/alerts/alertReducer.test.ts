import { initialState, alertReducer } from './alertReducer'
import { AddAlertAction, AlertActions, AlertAction, AlertState } from './types'

test('Can add notification', () => {
	const payload: AddAlertAction['payload'] = {
		alertType: 'info',
		text: 'Text',
		timeout: 5,
	}
	const action: AddAlertAction = { type: AlertActions.ADD_ALERT, payload}
	const state = alertReducer(initialState, action)

	expect(state.alerts).toHaveLength(1)
	const alert = state.alerts[0]
	expect(alert.id).toBeDefined()
	expect(alert).toEqual(expect.objectContaining({
		text: payload.text,
		timeout: 5,
		alertType: 'info',
	}))
})

test('Can add notification with defaults', () => {
	const payload: AddAlertAction['payload'] = {
		text: 'Text',
	}
	const action: AddAlertAction = { type: AlertActions.ADD_ALERT, payload}
	const state = alertReducer(initialState, action)

	expect(state.alerts).toHaveLength(1)
	const alert = state.alerts[0]
	expect(alert.id).toBeDefined()
	expect(alert).toEqual(expect.objectContaining({
		text: payload.text,
		timeout: 10,
		alertType: 'info',
	}))
})

test('A unique ID should be generated if not provided in dispatch', () => {
	const payload: AddAlertAction['payload'] = {
		text: 'Text',
	}
	const action: AddAlertAction = { type: AlertActions.ADD_ALERT, payload}

	const state = [action, action].reduce(alertReducer, initialState)
	expect(state.alerts).toHaveLength(2)
	// ID should be defined
	expect(state.alerts[0].id).toBeDefined()
	expect(state.alerts[1].id).toBeDefined()
	// ID Should not be same
	expect(state.alerts[0].id).not.toEqual(state.alerts[1].id)
})

test('Can add all notification types', () => {
	const payload: AddAlertAction['payload'] = {
		text: 'Text',
		timeout: 5,
	}
	const type = AlertActions.ADD_ALERT

	const actions: AlertAction[] = [
		{ type, payload: { ...payload, alertType: 'error' }},
		{ type, payload: { ...payload, alertType: 'info' }},
		{ type, payload: { ...payload, alertType: 'warning' }},
		{ type, payload: { ...payload, alertType: 'success' }}
	]
	const state = actions.reduce(alertReducer, initialState)
	expect(state.alerts).toHaveLength(4)
	expect(state.alerts[0].alertType).toEqual('error')
	expect(state.alerts[1].alertType).toEqual('info')
	expect(state.alerts[2].alertType).toEqual('warning')
	expect(state.alerts[3].alertType).toEqual('success')
	
})

test('can remove alerts', () => {
	const initial: AlertState = { 
		alerts: [
			{ id: '1', text: 'test', alertType: 'info' }, 
			{ id: '2', text: '2', alertType: 'error'}
		]}
	const state = alertReducer(initial, {
		type: AlertActions.REMOVE_ALERT,
		payload: { id: '1' }
	})
	expect(state.alerts).toHaveLength(1)
	// 2nd should now be first in list
	expect(state.alerts[0].id).toBe('2')
})
