// Dashboard.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import NavbarDash from "./pages/navDash";
import ChartJs from "./chart/chart";

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

  return (
    <div>
      {isloading && <h1>.</h1>}
      {!isloading && (
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          {" "}
          <NavbarDash />
          <ChartJs />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
