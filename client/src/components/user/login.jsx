import React, { useState } from "react";
import Navbar from "../partials/navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordFail, setPasswordFail] = useState("");
  const [emailFail, setEmailFail] = useState("");

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/v1/student/login", values)
      .then((res) => {
        console.log("Response from server:", res.data); // Log res data
        if (res.data.status === "Success") {
          localStorage.setItem("authtoken", res.data.token);
          navigate("/dashboard");
        } else {
          console.log("Error logging in");
        }
      })
      .catch((error) => {
        // console.log("Error");
        if (error.response.data.error === "User not found") {
          setEmailFail("User not found");
          setPasswordFail("");
        } else if (error.response.data.error === "Unauthorized") {
          setEmailFail("");
          setPasswordFail("Incorrect password");
        } else {
          console.log("Error");
        }
      });
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-200 h-screen">
      <Navbar role="student" />
      <div className="flex pt-36 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-15 w-auto"
            src="https://img.icons8.com/?size=80&id=m1yuWcowVSGK&format=png"
            alt="Know Why"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setValues({ ...values, email: e.target.value });
                  }}
                />
                {emailFail && <p className="text-red-700">{emailFail}</p>}
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
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setValues({ ...values, password: e.target.value });
                  }}
                />
                {passwordFail && <p className="text-red-900">{passwordFail}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10  text-center text-sm text-white-500">
            Don't have an account?
            <Link
              to="/student/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {" "}
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
