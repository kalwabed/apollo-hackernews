import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { AUTH_TOKEN } from '../constants'

const SIGNUP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!, $username: String!) {
    signup(email: $email, password: $password, name: $username) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const Login = () => {
  const history = useHistory()
  const [formState, setFormState] = useState({ login: true, email: '', password: '', username: '' })

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: { email: formState.email, password: formState.password },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token)
      history.push('/')
    }
  })

  const [signUp] = useMutation(SIGNUP_MUTATION, {
    variables: { email: formState.email, password: formState.password, name: formState.username },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signUp.token)
      history.push('/')
    }
  })

  const handleSubmit = e => {
    e.preventDefault()
    if (formState.login) {
      login()
    } else {
      signUp()
    }
  }

  return (
    <>
      <h4 className="mv3">{formState.login ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input
            value={formState.username}
            onChange={e => setFormState({ ...formState, username: e.target.value })}
            placeholder="Username"
          />
        )}
        <input
          value={formState.email}
          onChange={e => setFormState({ ...formState, email: e.target.value })}
          placeholder="Email"
        />
        <input
          value={formState.password}
          onChange={e => setFormState({ ...formState, password: e.target.value })}
          placeholder="Password"
          type="password"
        />
      </div>
      <div className="flex mt3">
        <button className="pointer mr2 button" onClick={handleSubmit}>
          {formState.login ? 'Login' : 'Create account'}
        </button>
        <button className="pointer button" onClick={e => setFormState({ ...formState, login: !formState.login })}>
          {formState.login ? 'need to create an account?' : 'already have an account'}
        </button>
      </div>
    </>
  )
}

export default Login
