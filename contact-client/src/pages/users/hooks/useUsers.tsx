import { useState, useEffect } from "react"
import axios from "../../../libs/axios"

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const res = await axios.get<ApiResponse<WithPagination<User[]>>>("/users")
      setUsers(res.data.data.data)
    } catch (error) {}
  }

  return {
    users,
  }
}

export default useUsers
