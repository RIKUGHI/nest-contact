import { FC, useEffect, useState } from "react"
import { Button, Modal } from "../../components/atoms"

interface CreateUserModalProps {
  userId: number
  onClose: () => void
}

const DeleteUserModal: FC<CreateUserModalProps> = ({ userId, onClose }) => {
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
          <div className="text-lg flex justify-center items-center flex-col">
            <h1>Apakah ingin menghapus</h1>
            <h1 className="font-bold">a?</h1>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-2">
          <Button type="reset" variant="blue" onClick={onClose}>
            Close
          </Button>
          <Button type="reset" variant="red" onClick={onClose}>
            Iya
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default DeleteUserModal
