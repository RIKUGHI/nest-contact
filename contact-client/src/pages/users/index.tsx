import { FC, useState } from "react"
import UserCard from "./UserCard"
import { Button, Modal } from "../../components/atoms"
import CreateUserModal from "./CreateUserModal"
import DetailUserModal from "./DetailUserModal"
import DeleteUserModal from "./DeleteUserModal"

const index: FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<null | number>(null)
  const [isDeleteModal, setIsDeleteModal] = useState(false)

  return (
    <>
      <div className="p-5 flex justify-end">
        <Button variant="blue" onClick={() => setShowCreateModal(true)}>
          Tambah
        </Button>
      </div>
      <div className="p-5 flex flex-wrap gap-3">
        <UserCard />
        <button onClick={() => setSelectedUserId(1)}>Test</button>
      </div>
      <CreateUserModal show={showCreateModal} setShow={setShowCreateModal} />
      {selectedUserId && (
        <DetailUserModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
      {selectedUserId && (
        <DeleteUserModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </>
  )
}

export default index
