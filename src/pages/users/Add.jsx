import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmailInput from "../../components/input/EmailInput";
import Label from "../../components/input/Label";
import TextInput from "../../components/input/TextInput";
import RequiredMark from "../../components/Required-mark";
import useUpdateTitle from "../../hooks/useUpdateTitle";
import uppercaseFirstLetter from "../../util/text/uppercaseFirstLetter";
import PasswordInput from "../../components/input/PasswordInput";
import ImageUpload from "../../components/input/Image";
import Button from "../../components/button/Button";
import isEmpty from "../../util/isEmpty";
import isEmail from "../../util/isEmail";
import http from "../../util/http";
import useLoading from "../../hooks/useLoading";
import Notification from "../../components/Notification";
import Number from "../../components/input/Number";

export default function AddUser() {
  const { role } = useParams();
  useUpdateTitle("Add New " + uppercaseFirstLetter(role));

  const [data, setData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    password: "",
    c_password: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});
  useLoading(loading);
  const navigate = useNavigate();

  const addUser = async () => {
    console.log(data);
    if (
      isEmpty(data.name) ||
      isEmpty(data.email) ||
      isEmpty(data.mobile_number) ||
      isEmpty(data.password) ||
      isEmpty(data.c_password)
    ) {
      setNotification({
        text: "please fill all required field",
        type: "error",
      });
      return;
    }

    if (data.c_password !== data.password) {
      setNotification({
        text: "password doesn't match",
        type: "error",
      });
      return;
    }

    if (!isEmail(data.email)) {
      setNotification({
        text: "email is invalid",
        type: "error",
      });
      return;
    }
    setNotification({});

    if (!data.mobile_number.startsWith("+"))
      data.mobile_number = "+" + data.mobile_number;

    try {
      setLoading(true);

      if (data.image) {
        const response = await http.post(
          "/image",
          { image: data.image },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        data.image = response.data.data.name;
      }

      await http.post("/user/" + role, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setNotification({
        text: uppercaseFirstLetter(role) + " added successfully",
        type: "success",
      });
      navigate("/users/" + role);
    } catch (error) {
      console.log(error);
      setNotification({
        text: error.response.data.message[0],
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="border-b-2 mb-3 pb-2">
        <h2 className="text-2xl font-lato font-semibold">
          Add New {uppercaseFirstLetter(role)}
        </h2>
      </div>
      <Label htmlFor="name">
        Name <RequiredMark />
      </Label>
      <TextInput
        id="name"
        value={data.name}
        onInput={(e) => setData({ ...data, name: e.target.value })}
      />

      <Label htmlFor="email">
        Email <RequiredMark />
      </Label>
      <EmailInput
        id="email"
        value={data.email}
        onInput={(e) => setData({ ...data, email: e.target.value })}
      />

      <Label>
        Mobile Number
        <RequiredMark />
      </Label>
      <Number
        number={data.mobile_number}
        setNumber={(n) => setData({ ...data, mobile_number: n })}
      />

      <Label htmlFor="password">
        Password <RequiredMark />
      </Label>
      <PasswordInput
        id="password"
        value={data.password}
        onInput={(e) => setData({ ...data, password: e.target.value })}
      />

      <Label htmlFor="c_password">
        Confirm Password <RequiredMark />
      </Label>
      <PasswordInput
        id="c_password"
        value={data.c_password}
        onInput={(e) => setData({ ...data, c_password: e.target.value })}
      />

      <p className="mt-2"></p>
      <Label htmlFor="image">Select image</Label>
      <br />
      <ImageUpload
        id="image"
        setFile={(file) => setData({ ...data, image: file })}
      />

      <p className="mt-2"></p>
      <Button onClick={addUser}>Add new {role}</Button>

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
