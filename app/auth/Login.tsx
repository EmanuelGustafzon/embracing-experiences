'use client'
import { signIn } from 'next-auth/react'

const Login = () => {
  return (
    <div>
        <button onClick={() => signIn('google')}>Login</button>
    </div>
  )
}

export default Login