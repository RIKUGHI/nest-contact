import { FC, useEffect, useState } from "react"
import { Button, Modal } from "../../components/atoms"
import { useAuthHeader } from "react-auth-kit"
import { AxiosError } from "axios"
import axios from "../../libs/axios"

interface CreateUserModalProps {
  contactId: number
  onClose: () => void
  onSuccess: () => void
}

const DeleteContactModal: FC<CreateUserModalProps> = ({
  contactId,
  onClose,
  onSuccess,
}) => {
  const authHeader = useAuthHeader()

  const onYes = async () => {
    try {
      await axios.delete(`/contacts/${contactId}`, {
        headers: {
          Authorization: authHeader(),
        },
      })

      onSuccess()
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
      }
    }
  }

  return (
    <Modal show={true}>
      <form className="bg-white w-[700px] m-auto p-5 rounded-md">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="text-lg flex justify-center items-center flex-col">
            <h1>Apakah ingin menghapus</h1>
            <h1 className="font-bold">data ini?</h1>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-2">
          <Button type="reset" variant="blue" onClick={onClose}>
            Close
          </Button>
          <Button type="reset" variant="red" onClick={onYes}>
            Iya
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default DeleteContactModal
