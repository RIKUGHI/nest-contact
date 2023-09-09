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
const LoginPage = lazy(() => import("./pages/login/index.tsx"))
const RegisterPage = lazy(() => import("./pages/register/index.tsx"))
import { AuthProvider, RequireAuth } from "react-auth-kit"
import AuthOnly from "./pages/AuthOnly.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider
      authType="cookie"
      authName="_auth"
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
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
              path="/login"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <LoginPage />
                </Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <RegisterPage />
                </Suspense>
              }
            />
            <Route
              path="/auth-only"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <RequireAuth loginPath="/login">
                    <AuthOnly />
                  </RequireAuth>
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
    </AuthProvider>
  </React.StrictMode>
)
