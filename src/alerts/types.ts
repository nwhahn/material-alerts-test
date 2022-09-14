import { AlertColor } from '@mui/material'
import React from 'react'

export interface IAlert {
  alertType?: AlertColor,
  id?: string,
  alertTitle?: string,
  text: string,
  timeout?: number,
  link?: string
}

export interface AlertState {
  alerts: IAlert[]
}

export enum AlertActions {
  ADD_ALERT = 'ADD_ALERT',
  REMOVE_ALERT = 'REMOVE_ALERT',
  CLEAR_ALL = 'CLEAR_ALL'
}


export interface AddAlertAction {
  type: AlertActions.ADD_ALERT,
  payload: IAlert
}

export interface RemoveAlertAction {
  type: AlertActions.REMOVE_ALERT,
  payload: { id: string }
}

export interface ClearAlertsAction {
  type: AlertActions.CLEAR_ALL
}


export type AlertAction = AddAlertAction | RemoveAlertAction | ClearAlertsAction

export interface IAlertContext {
  state: AlertState,
  dispatch: React.Dispatch<AlertAction>,
}
