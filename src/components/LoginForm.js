import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken, show, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      console.log(token)
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password }})
    setPage('authors')
  }

  if (!show) {
    return null
  }

  return(
    <form onSubmit={submit}>
      <label>
        Username:
        <input value={username} type="text" onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}

export default LoginForm