import { useState, useEffect } from "react"
import axios from "../../../libs/axios"

let didAuthenticate = false

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    if (didAuthenticate) fetchUser(controller.signal)

    didAuthenticate = true
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const fetchUser = async (signal: AbortSignal) => {
    try {
      const res = await axios.get<ApiResponse<WithPagination<User[]>>>(
        "/users",
        { signal }
      )
      setUsers(res.data.data.data)
    } catch (error) {}
  }

  return {
    users,
  }
}

export default useUsers
