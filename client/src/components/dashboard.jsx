// Dashboard.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Dashboard() {
  const navigate = useNavigate();

  const [isloading, setIsLoading] = useState(true);

  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios
      .get("http://localhost:8080/api/v1/logout")
      .then((res) => {
        navigate("/student/login");
      })
      .catch((err) => console.log(err));
  };

  const checkAuth = () => {
    axios
      .get("http://localhost:8080/api/v1/dashboard")
      .then((res) => {
        if (!res.data.success_jwt) {
          console.log(res.data);
          navigate("/student/login");
        }
        else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err.request.response);
        if (!err.request.response.success_jwt) {
          navigate("/student/login");
        }
        else {
          setIsLoading(false);
        }
      });
  };

  useEffect(() => {
    checkAuth();
  },[]);

  console.log(isloading);

  return (
    <div>
      {isloading && <h1>Loading...</h1>}

      <div>
      {!isloading && <div><h1>Welcome</h1>
      <button onClick={handleLogout}>Logout</button></div>}
    </div>
    </div>
    
  );
}

export default Dashboard;
