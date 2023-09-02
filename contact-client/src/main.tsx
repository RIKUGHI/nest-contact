import React, { FC, PropsWithChildren, Suspense, lazy } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom"
import "./index.css"
import { Navigation } from "./components/atoms"

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
