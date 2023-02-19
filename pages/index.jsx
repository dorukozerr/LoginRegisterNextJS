import { useContext } from 'react'
import AuthContext from '@/context/AuthContext'

export default function Home() {
  const { isAuthorized } = useContext(AuthContext)

  return (
    <div className='rootPageContainer'>
      <h1>Root</h1>
      {isAuthorized ? (
        <>
          <h4>Authorized</h4>
        </>
      ) : (
        <>
          <h4>Unauthorized</h4>
        </>
      )}
    </div>
  )
}
