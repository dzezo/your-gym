import { Suspense, lazy } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Loading from "./components/Loading";
import AuthGuard from "./guards/AuthGuard";
import Layout from "components/Layout";

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Members = lazy(() => import("./pages/Members/Members"));
const Member = lazy(() => import("./pages/Member/Member"));
const Pricelist = lazy(() => import("./pages/Pricelist/Pricelist"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AuthGuard />}>
          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<Loading />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="/pricelist"
              element={
                <Suspense fallback={<Loading />}>
                  <Pricelist />
                </Suspense>
              }
            />
            <Route
              path="/members"
              element={
                <Suspense fallback={<Loading />}>
                  <Members />
                </Suspense>
              }
            />
            <Route
              path="/member/:id"
              element={
                <Suspense fallback={<Loading />}>
                  <Member />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
