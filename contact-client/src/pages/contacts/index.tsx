import { QueryFunctionContext, useQuery } from "@tanstack/react-query"
import { FC, useState } from "react"
import { useAuthHeader, useAuthUser, useIsAuthenticated } from "react-auth-kit"
import { Button } from "../../components/atoms"
import axios from "../../libs/axios"
import ContactCard from "./ContactCard"
import CreateContactModal from "./CreateContactModal"
import DeleteContactModal from "./DeleteContactModal"
import UpdateContactModal from "./UpdateContactModal"

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

  // const { contacts, refresh } = useContacts()

  const fetchContacts = async (d: QueryFunctionContext) => {
    console.log(d)
    const res = await axios.get<ApiResponse<WithPagination<Contact[]>>>(
      "/contacts",
      {
        headers: {
          Authorization: authHeader(),
        },
      }
    )

    return res.data.data.data
  }

  const {
    isError,
    isLoading,
    data: contacts,
    error,
    refetch,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
    staleTime: 5000, // 5 sec
  })

  const handleSuccess = () => {
    setShowCreateModal(false)
    setSelectedContactId(null)
    refetch()
  }

  const handleUpdate = (id: number) => {
    setModalType("update")
    setSelectedContactId(id)
  }

  const handleDelete = (id: number) => {
    setModalType("delete")
    setSelectedContactId(id)
  }

  if (isLoading) return <h1>Loading contacts...</h1>
  if (isError) return <h1>Error: {(error as any)?.response?.data?.message}</h1>

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
          contacts?.map((contact) => (
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
