import { memo } from 'react'
import AlertManager from './alerts/AlertManager'
import AlertExample from './pages/AlertExample'

function App() {
	return <>
		<AlertExample />
		<AlertManager />
	</>
}

export default memo(App)
