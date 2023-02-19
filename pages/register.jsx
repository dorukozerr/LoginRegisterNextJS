import Link from 'next/link'
import { useState, useContext } from 'react'
import { Puff } from 'react-loading-icons'
import AuthContext from '@/context/AuthContext'

export default function Register() {
  const {} = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [message, setMessage] = useState('')
  const [isPwVisible, setIsPwVisible] = useState(false)
  const [isPending, setIsPending] = useState(false)

  return (
    <div className='authPageContainer'>
      <form
        onSubmit={e => {
          e.preventDefault()

          const bodyObj = {
            username,
            email,
            password
          }

          if (message === '') {
            if (password === passwordConfirm) {
              setIsPending(true)

              fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyObj)
              })
                .then(res => res.json())
                .then(({ err, msg }) => {
                  console.log({ err, msg })

                  setMessage(msg)
                  setIsPending(false)

                  if (err) {
                    setTimeout(() => {
                      setMessage('')
                    }, 5000)
                  }
                })
                .catch(err => {
                  setMessage('Network Error')
                  setIsPending(false)
                  setTimeout(() => {
                    setMessage('')
                  }, 5000)
                  console.log(err)
                })
            } else {
              setMessage('Password does not match')
              setTimeout(() => {
                setMessage('')
              }, 5000)
            }
          }
        }}>
        <div className='inputContainer'>
          <input
            required
            placeholder='Username'
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className='inputContainer'>
          <input
            required
            placeholder='Email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='inputContainer'>
          <input
            required
            placeholder='Password'
            type={isPwVisible ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className='inputContainer'>
          <input
            required
            placeholder='Password Confirmation'
            type={isPwVisible ? 'text' : 'password'}
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div className='switchbox'>
          <span>Show Password</span>
          <div
            onClick={() => setIsPwVisible(!isPwVisible)}
            className={`${
              isPwVisible ? 'switchboxContainer active' : 'switchboxContainer'
            }`}>
            <div className='dot'></div>
          </div>
        </div>
        <button>{isPending ? <Puff /> : 'Register'}</button>
        {message === '' ? (
          <Link href='/login'>
            Have an account ? <br />
            Login instead.
          </Link>
        ) : (
          <p>{message}</p>
        )}
      </form>
    </div>
  )
}
