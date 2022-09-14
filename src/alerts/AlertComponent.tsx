import { Alert as MuiAlert, AlertTitle, Link } from '@mui/material'
import { useLayoutEffect } from 'react'
import { useAlertManager } from './AlertManager'
import { IAlert, AlertActions } from './types'

const Alert = ({
	id,
	timeout,
	alertType,
	text,
	alertTitle,
	link
}: IAlert) => {
	const [, dispatch] = useAlertManager()
	const clearAlert = () => !!id && dispatch({ type: AlertActions.REMOVE_ALERT, payload: { id }})

	useLayoutEffect(() => {
		let timeoutId: NodeJS.Timeout
		if(timeout){
			timeoutId = setTimeout(clearAlert, timeout * 1000)
		}
		return () => {
			if(timeoutId) clearTimeout(timeoutId)
		}
	}, [timeout])
	return <MuiAlert 
		id={id}
		severity={alertType}
		onClick={() => link && window.open(link)}
		onClose={clearAlert}
		sx={{ alignItems: 'center' }}
		data-testid={id}
	>
		{alertTitle && <AlertTitle><strong>{alertTitle}</strong></AlertTitle>}
		{link ? <Link href={link} color='inherit' target='_blank' underline="always">{text}</Link> : text}
	</MuiAlert>
}

export default Alert