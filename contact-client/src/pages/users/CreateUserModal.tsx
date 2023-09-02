import { FC } from "react"
import { Button, Modal } from "../../components/atoms"

interface CreateUserModalProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateUserModal: FC<CreateUserModalProps> = ({ show, setShow }) => {
  return (
    <Modal show={show}>
      <form className="bg-white w-[700px] m-auto p-5 rounded-md">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-xl font-semibold leading-7 text-gray-900 mb-5">
            Create User
          </h2>

          <div className="col-span-full">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Street address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="street-address"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-2">
          <Button type="reset" variant="red" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button>Save</Button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateUserModal
