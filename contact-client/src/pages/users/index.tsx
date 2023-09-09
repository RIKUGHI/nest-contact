import { FC, useEffect, useState } from "react"
import UserCard from "./UserCard"
import { Button, Modal } from "../../components/atoms"
import CreateUserModal from "./CreateUserModal"
import DetailUserModal from "./DetailUserModal"
import DeleteUserModal from "./DeleteUserModal"
import axios from "../../libs/axios"
import { useSignOut, useAuthUser, useAuthHeader } from "react-auth-kit"

const index: FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [modalType, setModalType] = useState<"detail" | "delete" | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<null | number>(null)
  const [isDeleteModal, setIsDeleteModal] = useState(false)

  const auth = useAuthUser()
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const res = await axios.get<ApiResponse<WithPagination<User[]>>>("/users")
      setUsers(res.data.data.data)
      console.log(res.data.data.data)
    } catch (error) {}
  }

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

        {/* <button onClick={() => setSelectedUserId(1)}>Test</button> */}
      </div>
      <CreateUserModal show={showCreateModal} setShow={setShowCreateModal} />
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
