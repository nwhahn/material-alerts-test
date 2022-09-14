import React from 'react'
import { render } from '@testing-library/react'
import AlertManager from './AlertManager'
import { AlertState } from './types'
import { AlertContext } from './AlertContext'

test('Should display all active alerts', () => {
	
	const state: AlertState = {
		alerts: [
			{ alertType: 'info', id: '1', text: 'info-test', alertTitle: 'info-title' },
			{ alertType: 'error', id: '2', text: 'error-test', alertTitle: 'error-title' },
			{ alertType: 'success', id: '3', text: 'success-test', alertTitle: 'success-title' },
			{ alertType: 'warning', id: '4', text: 'warning-test', alertTitle: 'warning-title' },
		]
	}

	const result = render(
		<AlertContext.Provider value={{ state, dispatch: () => null }}>
			<AlertManager />
		</AlertContext.Provider>)
	const messageClass = 'MuiAlert-message'
	const infoAlert = result.getByTestId('1')
	expect(infoAlert).toBeInTheDocument()
	expect(infoAlert.getElementsByClassName(messageClass)[0].textContent).toEqual('info-titleinfo-test')
	const errorAlert = result.getByTestId('2')
	expect(errorAlert).toBeInTheDocument()
	expect(errorAlert.getElementsByClassName(messageClass)[0].textContent).toEqual('error-titleerror-test')
	const successAlert = result.getByTestId('3')
	expect(successAlert).toBeInTheDocument()
	expect(successAlert.getElementsByClassName(messageClass)[0].textContent).toEqual('success-titlesuccess-test')
	const warningAlert = result.getByTestId('4')
	expect(warningAlert).toBeInTheDocument()
	expect(warningAlert.getElementsByClassName(messageClass)[0].textContent).toEqual('warning-titlewarning-test')

})