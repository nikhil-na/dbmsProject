import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../partials/navbar";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/v1/student/signup", values)
      .then((res) => {
        if (res.data.status === "Success") {
          navigate("/dashboard");
        } else {
          console.log("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-200 h-screen">
      <Navbar role="student" />
      <div class="flex pt-28 flex-col justify-center px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            class="mx-auto h-15 w-auto"
            src="https://img.icons8.com/?size=80&id=m1yuWcowVSGK&format=png"
            alt="Know Why"
          />
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Signup in to your account
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                for="name"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Enter Username
              </label>
              <div class="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  autocomplete="email"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setValues({ ...values, name: e.target.value });
                  }}
                />
              </div>
            </div>
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setValues({ ...values, email: e.target.value });
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-10"
                  onChange={(e) => {
                    setValues({ ...values, password: e.target.value });
                  }}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 12a2 2 0 100-4 2 2 0 000 4zm-7.071-2.929a8 8 0 1111.314 0 8 8 0 01-11.314 0zm3.536-3.535a1 1 0 011.415 1.414 3 3 0 004.242 4.242 1 1 0 11-1.415 1.414 5 5 0 01-7.071 0 1 1 0 111.415-1.414 3 3 0 004.242-4.242 1 1 0 011.414-1.415z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 12a2 2 0 100-4 2 2 0 000 4zm7.071-2.929a8 8 0 111.414 1.414l-1.997 1.998a5.947 5.947 0 10-1.414-1.414l1.997-1.998zm-5.658-3.182a1 1 0 011.414 1.414 3 3 0 004.242 4.242 1 1 0 11-1.414 1.414 5 5 0 01-7.071 0 1 1 0 011.415-1.414 3 3 0 004.242-4.242 1 1 0 011.414-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p class="mt-10  text-center text-sm text-white-500">
            Already a registered member?
            <Link
              to="/student/login"
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
