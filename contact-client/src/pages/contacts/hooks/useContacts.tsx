import { useEffect, useState } from "react"
import { useAuthHeader } from "react-auth-kit"
import axios from "../../../libs/axios"

const useContacts = () => {
  const authHeader = useAuthHeader()

  const [contacts, setContacts] = useState<Contact[]>([])

  useEffect(() => {
    fetchContact()
  }, [])

  const fetchContact = async () => {
    try {
      const res = await axios.get<ApiResponse<WithPagination<Contact[]>>>(
        "/contacts",
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      )
      setContacts(res.data.data.data)
    } catch (error) {}
  }

  return {
    contacts,
    refresh: fetchContact,
  }
}

export default useContacts
