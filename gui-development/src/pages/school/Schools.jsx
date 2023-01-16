import { useEffect, useState } from "react";
import Notification from "../../components/Notification";
import http from "../../util/http";
import useLoading from "../../hooks/useLoading";
import useUpdateTitle from "../../hooks/useUpdateTitle";

export default function Schools({ ...props }) {
  useUpdateTitle("School");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({});
  useLoading(loading);
  useEffect(() => {
    http
      .get("/school")
      .then((data) => {
        setData(data["data"]["data"]);
      })
      .catch((error) => {
        setNotification({
          text: error.response.data.message[0],
          type: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div {...props}>
      school
      {notification.text && (
        <Notification
          type={notification.type}
          onClose={() => setNotification({})}
          closeOnBGClick={true}>
          {notification.text}
        </Notification>
      )}
    </div>
  );
}
