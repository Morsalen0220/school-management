import { useEffect } from "react";
import http from "./../../util/http";
import useLoading from "./../../hooks/useLoading";
import useUpdateTitle from "./../../hooks/useUpdateTitle";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  useUpdateTitle("logout");
  useLoading(true);
  const navigate = useNavigate();
  useEffect(() => {
    http.get("/logout").finally(() => {
      navigate("/login");
    });
  }, [navigate]);
}
