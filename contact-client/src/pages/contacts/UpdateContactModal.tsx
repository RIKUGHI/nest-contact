import { FC, useState, FormEvent, useEffect } from "react"
import { Button, Modal } from "../../components/atoms"
import axios from "../../libs/axios"
import { useAuthHeader } from "react-auth-kit"
import { AxiosError } from "axios"

interface CreateUserModalProps {
  contactId: number
  onSuccess: () => void
  onClose: () => void
}

const UpdateContactModal: FC<CreateUserModalProps> = ({
  contactId,
  onSuccess,
  onClose,
}) => {
  const authHeader = useAuthHeader()

  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    axios
      .get<ApiResponse<Contact>>(`/contacts/${contactId}`, {
        signal: controller.signal,
        headers: {
          Authorization: authHeader(),
        },
      })
      .then((data) => {
        setFirstName(data.data.data.first_name)
        setLastName(data.data.data.last_name)
        setEmail(data.data.data.email)
        setPhone(data.data.data.phone)
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          console.log(error.response?.data.message)
        }
      })

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [contactId])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const res = await axios.patch(
        `/contacts/${contactId}`,
        {
          first_name,
          last_name,
          email,
          phone,
        },
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      )

      onSuccess()
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
      }
    }
  }

  return (
    <Modal show={true}>
      <form
        className="bg-white w-[700px] m-auto p-5 rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-xl font-semibold leading-7 text-gray-900 mb-5">
            Create Contact
          </h2>

          <Input
            label="First Name"
            name="first_name"
            value={first_name}
            onChange={(v) => setFirstName(v)}
          />
          <Input
            label="Last Name"
            name="last_name"
            value={last_name}
            onChange={(v) => setLastName(v)}
          />
          <Input
            label="email"
            name="email"
            value={email}
            onChange={(v) => setEmail(v)}
          />
          <Input
            label="phone"
            name="phone"
            value={phone}
            onChange={(v) => setPhone(v)}
          />
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-2">
          <Button type="reset" variant="red" onClick={onClose}>
            Cancel
          </Button>
          <Button>Save</Button>
        </div>
      </form>
    </Modal>
  )
}

interface InputProps {
  label: string
  name: string
  value: string
  onChange: (v: string) => void
}

const Input: FC<InputProps> = ({ label, name, value, onChange }) => {
  return (
    <div className="col-span-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type="text"
          name={name}
          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}

export default UpdateContactModal
