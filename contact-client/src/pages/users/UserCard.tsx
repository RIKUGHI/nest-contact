import { Button } from "../../components/atoms"

const UserCard = () => {
  return (
    <div className="shadow-md p-2 rounded">
      <div className="flex">
        <span className="mr-5">Name</span>
        <span className="font-bold">Test</span>
      </div>
      <div className="mt-2 flex space-x-1">
        <Button>Detail</Button>
        <Button variant="blue">Edit</Button>
        <Button variant="red">Delete</Button>
      </div>
    </div>
  )
}

export default UserCard
