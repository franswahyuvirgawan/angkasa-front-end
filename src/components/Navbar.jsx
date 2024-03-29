import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import angkasaLogo from "../assets/angkasaLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import Buttom from "./Buttom";
import Notif from "./Notif";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authAction";
import axios from "axios";
import "./Notif.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, user } = useSelector((state) => state.auth);
  const [notif, setNotif] = useState([]);
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    redirect("/login");
  };

  const URL =
    process.env.REACT_APP_SERVER_URL || "https://angkasa-api.km3ggwp.com/api";

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(`${URL}/notifications/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotif(response.data.data.notifications);
      };
      fetchData();
    } catch (error) {}
  }, [user]);

  // console.log(notif);
  return (
    <div>
      <nav className="bg-white">
        <div className="flex items-center justify-between py-[14px] px-[24px] xl:px-[80px]">
          <div className="flex items-center justify-between w-full">
            <div className="flex-shrink-0">
              <Link to="/">
                {" "}
                <img
                  className="h-[40px]"
                  src={angkasaLogo}
                  alt="Angkasa Logo"
                />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="flex flex-row items-center gap-[24px]">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                {user?.role === "USER" && (
                  <Link
                    to="/check-order"
                    className="px-3 py-2 rounded-md text-sm font-medium"
                  >
                    History
                  </Link>
                )}
                {/* {token&&( */}
                {user?.role === "USER" && (
                  <Link
                    to="/profile"
                    className="px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Profile
                  </Link>
                )}
                {user?.role === "ADMIN" && (
                  <>
                    <Link
                      to="/admin/orders"
                      className="px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Transactions
                    </Link>
                  </>
                )}
                {token && <Notif notif={notif} />}
                {!token && (
                  <>
                    <Link
                      to="/login"
                      className="px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Login
                    </Link>
                    <Link to="/register">
                      <Buttom>Register</Buttom>
                    </Link>
                  </>
                )}
                {token && <Buttom onPress={handleLogout}>Log out</Buttom>}
              </div>
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div
              className="md:hidden bg-white py-[24px] px-[24px] "
              id="mobile-menu"
            >
              <div ref={ref} className="flex flex-col items-end gap-[16px]">
                {user?.role === "USER" && (
                  <>{token && <Notif notif={notif} />}</>
                )}
                {user?.role === "USER" && (
                  <Link
                    to="/check-order"
                    className="px-2 py-2 rounded-md text-sm font-medium"
                  >
                    History
                  </Link>
                )}
                {/* {token&&( */}
                {user?.role === "USER" && (
                  <Link
                    to="/profile"
                    className="px-2 py-2 rounded-md text-sm font-medium"
                  >
                    Profile
                  </Link>
                )}
                {user?.role === "ADMIN" && (
                  <Link
                    to="/admin/orders"
                    className="px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Transactions
                  </Link>
                )}
                {!token && (
                  <div className="flex flex-row gap-[8px] items-center">
                    <Link
                      to="/login"
                      className="hover:bg-blue-700 hover:text-white focus:ring-4 border-blue-700 border-2 border-solid font-medium rounded-lg text-sm px-[24px] py-2 focus:outline-none focus:ring-blue-800"
                    >
                      Login
                    </Link>
                    <Link to="/register">
                      <Buttom>Register</Buttom>
                    </Link>
                  </div>
                )}
                {token && <Buttom onPress={handleLogout}>Log out</Buttom>}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Navbar;
