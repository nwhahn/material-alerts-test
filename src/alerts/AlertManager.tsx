import React, { useContext } from 'react'
import AlertContext from './AlertContext'
import { AlertAction, AlertState } from './types'
import { Grid, Collapse } from '@mui/material'
import Alert from './AlertComponent'
import { TransitionGroup } from 'react-transition-group'

export const useAlertManager = (): [AlertState, React.Dispatch<AlertAction>] => {
	const alertContext = useContext(AlertContext)
	const { state, dispatch } = alertContext
	return [state, dispatch]
}

const AlertManager = () => {
	const [state] = useAlertManager()
	return <Grid container sx={{ position: 'absolute', top: 0, right: 0, padding: 1, zIndex: 999, width: '30%' }} flexDirection='column' gap={1}>
		<TransitionGroup>
			{state.alerts?.map(alert => <Collapse key={alert.id} sx={{ marginBottom: 1 }}>
				<Alert key={alert.id} {...alert} />
			</Collapse>)}
		</TransitionGroup>
	</Grid>

}

export default AlertManager