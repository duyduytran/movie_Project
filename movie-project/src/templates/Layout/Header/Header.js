import React from "react";
import { history } from "../../../App";
import _ from "lodash";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { TOKEN, USER_LOGIN } from "../../../util/setting/confiq";

export default function Header(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const signInButton = () => {
    if (_.isEmpty(localStorage.getItem(USER_LOGIN))) {
      return (
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <button
            onClick={() => {
              history.push("login");
            }}
            className="self-center px-8 py-3 rounded"
          >
            Đăng nhập
          </button>
          <button
            onClick={() => {
              history.push("register");
            }}
            className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900"
          >
            Đăng ký
          </button>
        </div>
      );
    } else {
      return (
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <button
            onClick={() => {
              history.push("/login");
            }}
            className="self-center px-8 py-3 rounded"
          >
            Hello! {userLogin.hoTen}
          </button>
          <button
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              window.location.reload();
            }}
            className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900"
          >
            Đăng xuất
          </button>
        </div>
      );
    }
  };

  return (
    <header className="p-4 dark:bg-coolGray-800 dark:text-coolGray-100 bg-opacity-40 bg-black text-white fixed w-full z-10">
      <div className="container flex justify-between h-16 mx-auto">
        <a
          href="#"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img
            src="https://cybersoft.edu.vn/wp-content/uploads/2017/03/MIN-OP1.png"
            alt="CyberSoft.edu.vn logo"
            class="cyberlogo"
            width={150}
            height={150}
          />
        </a>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              to="/home"
              className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-white"
              activeClassName="border-b-2 border-white"
            >
              Home
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/contact"
              className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-white"
              activeClassName="border-b-2 border-white"
            >
              Contact
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/news"
              className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-white"
              activeClassName="border-b-2 border-white"
            >
              News
            </NavLink>
          </li>
        </ul>
        {signInButton()}
        {/* <div className="items-center flex-shrink-0 hidden lg:flex">
          <button
            onClick={() => {
              history.push("login");
            }}
            className="self-center px-8 py-3 rounded"
          >
            Đăng nhập
          </button>
          <button
            onClick={() => {
              history.push("register");
            }}
            className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900"
          >
            Đăng ký
          </button>
        </div> */}

        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-coolGray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
