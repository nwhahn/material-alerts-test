/* eslint-disable no-case-declarations */
import { useReducer } from 'react'
import { 
	Grid, 
	Button, 
	TextField, 
	Select,
	AlertColor, 
	MenuItem,
	FormControl,
	InputLabel,
	useTheme,
	useMediaQuery,
	SelectChangeEvent,
	Slider,
	Typography
} from '@mui/material'
import { AlertActions, IAlert, AlertAction } from '../alerts'
import { useAlertManager } from '../alerts/AlertManager'

interface FormState {
  data: IAlert,
  canSubmit: boolean
}

const initialState: FormState  = {
	data: {
		text: '',
		link: '',
		alertType: 'info',
	  timeout: 10
	},
	canSubmit: false
}

enum ActionType {
  CLEAR = 'clear',
  UPDATE = 'update'
}

interface Action {
  type: ActionType,
  payload?: unknown
}

interface UpdateAction extends Action {
  type: ActionType.UPDATE,
  payload: 
    | { fieldName: 'text' | 'alertTitle' | 'link' , value: string }
    | { fieldName: 'timeout', value: number }
    | { fieldName: 'type', value: AlertColor }
}

interface ClearAction extends Action {
  type: ActionType.CLEAR
}
// type Action = 
//   | { type: 'clear', payload: null }
//   | { type: 'update', payload: { fieldName: keyof FormState, value: string | number }}

function formReducer(state: FormState, action: UpdateAction | ClearAction): FormState{
	const { data } = state
	switch(action.type){
	case 'update':
		const { fieldName, value } = action.payload
		const newData = { ...data, [fieldName]: value}
		return { ...state, data: newData, canSubmit: !!newData.text && !!newData.timeout && newData.timeout > 0 }
	case 'clear':
		return initialState
	default:
		throw new Error('unsupported action')
	}
}

const AlertExample = () => {
	const [{ alerts = []}, dispatch] = useAlertManager()
	const theme = useTheme()
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))
	const [
		{ 
			data, 
			canSubmit 
		}, 
		updateForm
	] = useReducer(formReducer, initialState)
	const { text, link, alertType, alertTitle, timeout } = data

	const clearForm = (): void => {
		const action: ClearAction = { type: ActionType.CLEAR }
		updateForm(action)
	}

	const clearNotifications = (): void => {
		const action: AlertAction = { type: AlertActions.CLEAR_ALL }
		dispatch(action)
	}

	const onSubmit = (): void => {
		dispatch({ type: AlertActions.ADD_ALERT, payload: data })
		clearForm()
	}

	const handleClickSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		e?.preventDefault()
		onSubmit()
	}

	return <Grid container sx={{ height: '100%', maxWidth: 500 }} padding={2} gap={4} flexDirection='column'>
		<Grid container flex={0}>
			<Typography component='h1'>Alert Example</Typography>
		</Grid>
		<Grid 
			component='form' 
			container 
			flex={1} 
			sx={{ 
				overflowY: 'scroll', 
				scrollbarWidth: 'none', 
				'::-webkit-scrollbar': { display: 'none' } 
			}} 
			gap={isDesktop ? 8 : 4} 
			onSubmit={onSubmit} 
			alignItems='flex-start'
			justifyContent='center'
			alignContent={isDesktop ? 'flex-start' : 'space-between'}>
			{/** Inputs */}
			<Grid container gap={4} sx={{ paddingTop: 1 }}>
				{/** Alert Title  */}
				<TextField 
					variant='outlined' 
					name='alertTitle' 
					label='Title'
					fullWidth 
					value={alertTitle || ''} 
					onChange={(e) => updateForm({ type: ActionType.UPDATE, payload: { fieldName: 'alertTitle', value: e?.target?.value  }})}
				/>
				{/** Alert Text  */}
				<TextField 
					variant='outlined' 
					name='text' 
					label='Text' 
					required
					fullWidth 
					value={text} 
					onChange={(e) => updateForm({ type: ActionType.UPDATE, payload: { fieldName: 'text', value: e?.target?.value  }})}
				/>
				{/** Alert link */}
				<TextField 
					variant='outlined' 
					name='link' 
					label='Link' 
					fullWidth 
					value={link} 
					onChange={(e) => updateForm({ type: ActionType.UPDATE, payload: { fieldName: 'link', value: e?.target?.value  }})}
				/>
				{/** Alert Type */}
				<FormControl fullWidth>
					<InputLabel id='select-alert-type'>Type</InputLabel>
					<Select 
						value={alertType}
						labelId='select-alert-type'
						label='Type'
						onChange={(e: SelectChangeEvent<AlertColor>) => updateForm({ type: ActionType.UPDATE, payload: { fieldName: 'type', value: e.target.value as AlertColor }})}
					>
						<MenuItem value='info' sx={{ color: theme.palette.info.main }}>Info</MenuItem>
						<MenuItem value='success' sx={{ color: theme.palette.success.main }}>Success</MenuItem>
						<MenuItem value='warning' sx={{ color: theme.palette.warning.main }}>Warning</MenuItem>
						<MenuItem value='error' sx={{ color: theme.palette.error.main }}>Error</MenuItem>
					</Select>
				</FormControl>
				{/** Alert Timeout */}
				<Grid container columnGap={1} alignItems='center'>
					<TextField 
						sx={{ flex: 2 }}
						label='Timeout(seconds)'
						type='number'
						value={timeout}
						onChange={(e) => updateForm({ type: ActionType.UPDATE, payload: { fieldName: 'timeout', value: parseFloat(e.target.value || '0') }})} 
						inputProps={{
							step: .25,
							min: .25,
							max: 15,
							type: 'number'
						}}
					/>
					<Slider
						sx={{ flex: 3 }} 
						value={timeout}
						min={.25}
						step={.01}
						max={15}
						valueLabelDisplay='auto'
						valueLabelFormat={(val) => `${val} seconds`}
						onChange={(_, val) => updateForm({ type: ActionType.UPDATE, payload: { fieldName: 'timeout', value: val as number }})}
					/>
				</Grid>
			</Grid>
			{/** Buttons */}
			<Grid container columnGap={4} rowGap={2} justifyContent='space-between' flexDirection={isDesktop ? 'row' : 'column'}>
				<Button variant='outlined' fullWidth sx={{ flex: 1 }} onClick={clearForm}>Reset</Button>
				<Button variant='outlined' fullWidth sx={{ flex: 1 }} onClick={clearNotifications} disabled={alerts?.length < 1}>Clear Notifications</Button>
				<Button variant='contained' type='submit' fullWidth onClick={handleClickSubmit} disabled={!canSubmit}>Create Alert</Button>
			</Grid>
		</Grid>
	</Grid>

}

export default AlertExample