import { FC, useState } from "react"
import { useAuthUser } from "react-auth-kit"
import { Button } from "../../components/atoms"
import DeleteUserModal from "./DeleteUserModal"
import DetailUserModal from "./DetailUserModal"
import UserCard from "./UserCard"
import useUsers from "./hooks/useUsers"

const index: FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [modalType, setModalType] = useState<"detail" | "delete" | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<null | number>(null)

  const auth = useAuthUser()
  const { users } = useUsers()

  const handleDetail = (id: number) => {
    setModalType("detail")
    setSelectedUserId(id)
  }

  return (
    <>
      <div className="p-5 flex justify-end">
        <Button variant="blue" onClick={() => setShowCreateModal(true)}>
          Tambah
        </Button>
      </div>
      <div className="p-5 flex flex-wrap gap-3">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDetail={
              auth()?.username ? () => handleDetail(user.id) : undefined
            }
          />
        ))}
      </div>
      {/* <CreateUserModal show={showCreateModal} setShow={setShowCreateModal} /> */}
      {selectedUserId && modalType === "detail" && (
        <DetailUserModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
      {selectedUserId && modalType === "delete" && (
        <DeleteUserModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </>
  )
}

export default index
