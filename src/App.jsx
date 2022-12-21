import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { AcademicCapIcon } from "@heroicons/react/20/solid";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Chart from "./pages/Chart";
import Profile from "./pages/Profile";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Protected from "./components/Protected";

export default function App() {
  const tokenLocalStorage = localStorage.getItem("token");
  const [token, setToken] = useState(tokenLocalStorage);
  return (
    <>
      <SkeletonTheme baseColor="#F5F5F5" highlightColor="#ffffff">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={
          <Protected token={token} setToken={setToken}>
            <Search />
          </Protected>
          }/>
          <Route path="/chart" element={<Chart />} />
        <Route path="/profile" element={<Profile />} />
        </Routes>
      </SkeletonTheme>
    </>
  );
}
