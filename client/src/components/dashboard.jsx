// Dashboard.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import NavbarDash from "./pages/navDash";

function Dashboard() {
  const navigate = useNavigate();

  const [isloading, setIsLoading] = useState(true);

  axios.defaults.withCredentials = true;
  const checkAuth = () => {
    const authtoken = localStorage.getItem("authtoken");
    axios
      .get("http://localhost:8080/api/v1/dashboard", {
        headers: {
          Authorization: `Bearer ${authtoken}`,
        },
      })
      .then((res) => {
        if (!res.data.success_jwt) {
          navigate("/student/login");
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!err.request.response.success_jwt) {
          navigate("/student/login");
        } else {
          setIsLoading(false);
        }
      });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  console.log(isloading);

  return (
    <div>
      {isloading && <h1>.</h1>}

      {!isloading && (
        <div>
          {" "}
          <NavbarDash />
          <div className="h-screen bg-slate-100 flex flex-col items-center">
            <h1 className="text-3xl mt-5 font-bold mb-4">Welcome, Nikhil</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
