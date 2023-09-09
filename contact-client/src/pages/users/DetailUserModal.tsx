import { AxiosError } from "axios"
import { FC, useEffect, useState } from "react"
import { useAuthHeader } from "react-auth-kit"
import { useNavigate } from "react-router-dom"
import { Button, Modal } from "../../components/atoms"
import axios from "../../libs/axios"

interface CreateUserModalProps {
  userId: number
  onClose: () => void
}

const DetailUserModal: FC<CreateUserModalProps> = ({ userId, onClose }) => {
  const [user, setUser] = useState<User | null>(null)
  const authHeader = useAuthHeader()
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    axios
      .get<ApiResponse<User>>(`/users/${userId}`, {
        signal: controller.signal,
        headers: {
          Authorization: authHeader(),
        },
      })
      .then((data) => {
        setUser(data.data.data)
      })
      .catch((e) => {
        if (e instanceof AxiosError && e.response?.status === 401) {
          navigate("/login")
        }
        console.log(e.response)
      })

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [userId])

  return (
    <Modal show={true}>
      <form className="bg-white w-[700px] m-auto p-5 rounded-md">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-xl font-semibold leading-7 text-gray-900 mb-5">
            Detail User
          </h2>

          {user ? (
            <>
              <div className="flex">
                <span className="mr-5">Name</span>
                <span className="font-bold">{user.name}</span>
              </div>
              <div className="flex">
                <span className="mr-5">Username</span>
                <span className="font-bold">{user.username}</span>
              </div>
              <div className="flex">
                <span className="mr-5">Contacts</span>
                <span className="font-bold">{user._count.contacts}</span>
              </div>
            </>
          ) : (
            <div>loading</div>
          )}
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-2">
          <Button type="reset" variant="red" onClick={onClose}>
            Close
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default DetailUserModal
