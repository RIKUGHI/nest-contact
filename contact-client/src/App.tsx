import { useRef } from "react"
import { Button, buttonVariants } from "./components/atoms/Button"

function App() {
  const ref = useRef<null | HTMLButtonElement>(null)
  return (
    <div>
      <ul className="flex justify-center space-x-2 p-2">
        <li className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
          User
        </li>
        <li className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
          Contact
        </li>
        <li className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
          Address
        </li>
      </ul>
      <Button ref={ref}>Test</Button>
    </div>
  )
}

export default App
