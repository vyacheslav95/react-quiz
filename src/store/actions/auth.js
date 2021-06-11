import axios from "axios"
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes"

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email, password,
      returnSequreToken: true,
    }
    console.log(isLogin)
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkoRmieAtu0ZgAhj7k9CL81NqL8NrFSmE'

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAkoRmieAtu0ZgAhj7k9CL81NqL8NrFSmE'
    }

    const response = await axios.post(url, authData)
    const data = response.data
    data.expiresIn = '3600' // added because of absent the field in the response
    const {localId, idToken, expiresIn} = data;
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)

    localStorage.setItem('token', idToken)
    localStorage.setItem('userId', localId)
    localStorage.setItem('expirationDate', expirationDate)

    dispatch(authSuccess(idToken))
    dispatch(autoLogout(expiresIn))
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function logout() {
  return {
    type: AUTH_LOGOUT
  }
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}