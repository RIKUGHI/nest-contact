import { FC, useState, useEffect } from "react"
import { Button } from "../../components/atoms"
import { useAuthUser, useAuthHeader, useIsAuthenticated } from "react-auth-kit"
import ContactCard from "./ContactCard"
import axios from "../../libs/axios"
import CreateContactModal from "./CreateContactModal"
import DeleteContactModal from "./DeleteContactModal"
import UpdateContactModal from "./UpdateContactModal"
import { AxiosError } from "axios"

interface indexProps {}

const index: FC<indexProps> = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [modalType, setModalType] = useState<"update" | "delete" | null>(null)
  const [selectedContactId, setSelectedContactId] = useState<null | number>(
    null
  )

  const auth = useAuthUser()
  const authHeader = useAuthHeader()
  const isAuthenticated = useIsAuthenticated()
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

  const handleSuccess = () => {
    setShowCreateModal(false)
    setSelectedContactId(null)
    fetchContact()
  }

  const handleUpdate = (id: number) => {
    setModalType("update")
    setSelectedContactId(id)
  }

  const handleDelete = (id: number) => {
    setModalType("delete")
    setSelectedContactId(id)
  }

  return (
    <>
      <div className="p-5 flex justify-end">
        {auth()?.username ? (
          <Button variant="blue" onClick={() => setShowCreateModal(true)}>
            Tambah
          </Button>
        ) : null}
      </div>
      <div className="p-5 flex flex-wrap gap-3">
        {isAuthenticated() ? (
          contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onUpdate={
                auth()?.username ? () => handleUpdate(contact.id) : undefined
              }
              onDelete={
                auth()?.username ? () => handleDelete(contact.id) : undefined
              }
            />
          ))
        ) : (
          <h1>login first</h1>
        )}
      </div>
      <CreateContactModal
        show={showCreateModal}
        setShow={setShowCreateModal}
        onSuccess={handleSuccess}
      />
      {selectedContactId && modalType === "update" && (
        <UpdateContactModal
          contactId={selectedContactId}
          onSuccess={handleSuccess}
          onClose={() => setSelectedContactId(null)}
        />
      )}
      {selectedContactId && modalType === "delete" && (
        <DeleteContactModal
          contactId={selectedContactId}
          onClose={() => setSelectedContactId(null)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  )
}

export default index
