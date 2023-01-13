import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard-parts/Sidebar";
import Header from "../components/dashboard-parts/Header";
import useLoading from "../hooks/useLoading";
import http from "../util/http";

export default function Dashboard({ children }) {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useLoading(loading);

  useEffect(() => {
    http
      .get("/user/me")
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch(() => {
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  return (
    userData !== {} && (
      <div>
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="bg-white w-full m-2 mr-0 mb-0 shadow-lg relative z-10 rounded-sm p-2">
            {children}
          </main>
        </div>
      </div>
    )
  );
}
