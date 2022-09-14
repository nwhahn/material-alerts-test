import React, { useContext } from 'react'
import AlertContext from './AlertContext'
import { AlertAction, AlertState } from './types'
import { Grid } from '@mui/material'
import Alert from './AlertComponent'

export const useAlertManager = (): [AlertState, React.Dispatch<AlertAction>] => {
	const alertContext = useContext(AlertContext)
	const { state, dispatch } = alertContext
	return [state, dispatch]
}

const AlertManager = () => {
	const [state] = useAlertManager()
	return <Grid container sx={{ position: 'absolute', top: 0, right: 0, padding: 1, zIndex: 999, width: '30%' }} flexDirection='column' gap={1}>
		{state.alerts?.map(alert => <Alert key={alert.id} {...alert}/>)}
	</Grid>

}

export default AlertManager