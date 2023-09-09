import { FC, PropsWithChildren } from "react"
import { Link } from "react-router-dom"

const navigations = [
  {
    to: "/",
    label: "User",
  },
  {
    to: "contacts",
    label: "Contact",
  },
  {
    to: "login",
    label: "Login",
  },
  {
    to: "register",
    label: "Register",
  },
  {
    to: "auth-only",
    label: "Auth Only",
  },
]

const Navigation: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <nav className="flex justify-center space-x-2 p-2">
        {navigations.map((navigation, i) => (
          <Link
            key={i}
            to={navigation.to}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            {navigation.label}
          </Link>
        ))}
      </nav>
      <main>{children}</main>
    </div>
  )
}

export default Navigation
