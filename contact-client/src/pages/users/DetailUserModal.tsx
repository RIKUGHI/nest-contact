import { FC, useEffect, useState } from "react"
import { Button, Modal } from "../../components/atoms"

interface CreateUserModalProps {
  userId: number
  onClose: () => void
}

const DetailUserModal: FC<CreateUserModalProps> = ({ userId, onClose }) => {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    setTimeout(() => {
      setUser(1)
    }, 1000)
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
                <span className="font-bold">Test</span>
              </div>
              <div className="flex">
                <span className="mr-5">Name</span>
                <span className="font-bold">Test</span>
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
