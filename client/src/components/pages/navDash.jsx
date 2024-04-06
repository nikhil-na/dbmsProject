import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";

export default function NavbarDash({ role }) {
  const authtoken = localStorage.getItem("authtoken");
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .get("http://localhost:8080/api/v1/logout", {
        headers: {
          Authorization: `Bearer ${authtoken}`,
        },
      })
      .then((res) => {
        localStorage.removeItem("authtoken");
        navigate("/student/login");
      })
      .catch((err) => console.log(err));
  };
  const handleExpense = () => {
    axios
      .get("http://localhost:8080/api/v1/expenses", {
        headers: {
          Authorization: `Bearer ${authtoken}`,
        },
      })
      .then((res) => {
        navigate("/expenses");
      })
      .catch((err) => console.log(err));
  };
  const handleIncome = () => {
    axios
      .get("http://localhost:8080/api/v1/income", {
        headers: {
          Authorization: `Bearer ${authtoken}`,
        },
      })
      .then((res) => {
        navigate("/income");
      })
      .catch((err) => console.log(err));
  };
  return (
    <nav>
      <div className="max-w-screen-xxl flex flex-wrap items-center justify-between p-4 bg-slate-50">
        <Link to="/dashboard" className="flex items-center">
          <img
            src="https://img.icons8.com/?size=80&id=m1yuWcowVSGK&format=png"
            className="h-15 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-dark">
            Expense Tracker
          </span>
        </Link>
        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-multi-level"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 ">
            <li>
              <Link to="">
                <button
                  type="submit"
                  onClick={handleExpense}
                  className="bg-slate-300 w-40 uppercase text-dark py-3 font-semi-bold rounded-full tracking-widest hover:bg-slate-200 hover:text-dark"
                  style={{ fontSize: "15px" }}
                >
                  Expense
                </button>
              </Link>
            </li>
            <li>
              <Link to="">
                <button
                  type="submit"
                  onClick={handleIncome}
                  className="bg-slate-300 w-40 uppercase text-dark py-3 font-semi-bold rounded-full tracking-widest hover:bg-slate-200 hover:text-dark"
                  style={{ fontSize: "15px" }}
                >
                  Income
                </button>
              </Link>
            </li>
            <li>
              <Link to="">
                <button
                  type="submit"
                  onClick={handleLogout}
                  className="bg-slate-300 w-40 uppercase text-dark py-3 font-semi-bold rounded-full tracking-widest hover:bg-slate-200 hover:text-dark"
                  style={{ fontSize: "15px" }}
                >
                  Logout
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
