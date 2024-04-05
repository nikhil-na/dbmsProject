import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ role }) {
  return (
    <nav>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img
            src="https://img.icons8.com/?size=80&id=m1yuWcowVSGK&format=png"
            className="h-15 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white">
            Expense Tracker
          </span>
        </Link>
        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-multi-level"
        ></div>
      </div>
    </nav>
  );
}
