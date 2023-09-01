import React, { Suspense, PropsWithChildren, FC, lazy } from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  BrowserRouter,
  Outlet,
  Route,
  Routes,
} from "react-router-dom"

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
    to: "addresses",
    label: "Address",
  },
]

const Navigation: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <nav className="flex justify-center space-x-2 p-2">
        {navigations.map((navigation) => (
          <Link
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

const LoadingPage = () => {
  return <h1 className="m-auto block">Loading...</h1>
}

const UserPage = lazy(() => import("./pages/users/index.tsx"))
const ContactPage = lazy(() => import("./pages/contacts/index.tsx"))
const AddressPage = lazy(() => import("./pages/addresses/index.tsx"))

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigation>
              <Outlet />
            </Navigation>
          }
        >
          <Route
            path="/"
            element={
              <Suspense fallback={<LoadingPage />}>
                <UserPage />
              </Suspense>
            }
          />
          <Route
            path="/contacts"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route
            path="/addresses"
            element={
              <Suspense fallback={<LoadingPage />}>
                <AddressPage />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingPage />}>
              <h1>Error</h1>
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
