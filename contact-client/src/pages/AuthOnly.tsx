import { useSignOut, useAuthUser, useAuthHeader } from "react-auth-kit"
import { useNavigate } from "react-router-dom"
import { AuthProvider, RequireAuth } from "react-auth-kit"

const AuthOnly = () => {
  const auth = useAuthUser()
  const authHeader = useAuthHeader()

  console.log(auth()?.username)
  console.log(authHeader())

  const signOut = useSignOut()
  const navigate = useNavigate()

  const logout = () => {
    signOut()
    navigate("/login")
  }

  return (
    <>
      <h1>Auth Only</h1>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default AuthOnly
