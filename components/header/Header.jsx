import Link from 'next/link'
import { useContext } from 'react'
import AuthContext from '@/context/AuthContext'

export default function Header() {
  const { isAuthorized, logout } = useContext(AuthContext)

  return (
    <header>
      <div className='left'>
        <Link href='/'>
          <h2>Logo</h2>
        </Link>
      </div>
      <div className='right'>
        {isAuthorized ? (
          <>
            <span onClick={logout}>Logout</span>
          </>
        ) : (
          <>
            <Link href='/login'>Login</Link>
            <Link href='/register'>Register</Link>
          </>
        )}
      </div>
    </header>
  )
}
