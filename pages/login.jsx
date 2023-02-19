import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import AuthContext from '@/context/AuthContext'
import { Puff } from 'react-loading-icons'

export default function Login() {
  const router = useRouter()
  const { verified } = router.query
  const {} = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isPwVisible, setIsPwVisible] = useState(false)
  const [isPending, setIsPending] = useState(false)

  console.log(typeof verified, verified)

  return (
    <div className='authPageContainer'>
      <form
        onSubmit={e => {
          e.preventDefault()

          const bodyObj = {
            email,
            password
          }

          fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyObj)
          })
            .then(res => res.json())
            .then(({ err, msg }) => {
              if (err) {
                setError(msg)
                setTimeout(() => {
                  setError('')
                }, 5000)
              } else {
                localStorage.setItem('user', JSON.stringify(msg))
                router.push('/')
              }
            })
            .catch(err => {
              setError('Network Error')
              setTimeout(() => {
                setError('')
              }, 5000)
              console.log(err)
            })
        }}>
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
        <button>{isPending ? <Puff /> : 'Login'}</button>
        {error === '' ? (
          <>
            {verified !== 'true' ? (
              <Link href='/register'>
                Don&apos;t you have an account ? <br />
                Register instead.
              </Link>
            ) : (
              <p>Email Verified...</p>
            )}
          </>
        ) : (
          <>
            <p>{error}</p>
          </>
        )}
      </form>
    </div>
  )
}
