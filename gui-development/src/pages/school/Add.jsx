import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button, { SecondaryButton } from "../../components/button/Button";
import EmailInput from "../../components/input/EmailInput";
import Label from "../../components/input/Label";
import TextInput from "../../components/input/TextInput";
import Select from "../../components/input/Select";
import Notification from "../../components/Notification";
import useLoading from "../../hooks/useLoading";
import useUpdateTitle from "../../hooks/useUpdateTitle";
import isEmpty from "../../util/isEmpty";
import isEmail from "../../util/isEmail";
import Textarea from "../../components/input/Textarea";
import ImageUpload from "../../components/input/Image";
import RequiredMark from "../../components/Required-mark";
import Number from "../../components/input/Number";
import http from "./../../util/http";

// TODO: Add admin functionality

export default function AddSchool() {
  useUpdateTitle("Add new school");
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    image: "",
    admin: [],
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});
  useLoading(loading);
  const navigate = useNavigate();

  const addSchool = async () => {
    if (
      isEmpty(data.name) ||
      isEmpty(data.email) ||
      isEmpty(data.phone) ||
      isEmpty(data.address)
    ) {
      setNotification({
        text: "please fill all required field",
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

    if (!data.phone.startsWith("+")) data.phone = "+" + data.phone;

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

      await http.post("/school", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setNotification({
        text: "School added successfully",
        type: "success",
      });
      navigate("/school");
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
        <h2 className="text-2xl font-lato font-semibold">Add New School</h2>
      </div>
      <Label htmlFor="name">
        School name <RequiredMark />
      </Label>
      <TextInput
        id="name"
        value={data.name}
        onInput={(e) => setData({ ...data, name: e.target.value })}
      />

      <Label htmlFor="address">
        Address <RequiredMark />
      </Label>
      <TextInput
        id="address"
        value={data.address}
        onInput={(e) => setData({ ...data, address: e.target.value })}
      />

      <Label htmlFor="phone">
        Phone number <RequiredMark />
      </Label>
      <Number
        number={data.phone}
        setNumber={(n) => setData({ ...data, phone: n })}
      />

      <Label htmlFor="description">Description </Label>
      <Textarea
        id="description"
        defaultValue={data.description}
        onInput={(e) => setData({ ...data, description: e.target.value })}
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
        Select Admin <RequiredMark />
      </Label>
      <Select>
        <option value="admin">admin</option>
      </Select>
      <p className="mt-1"></p>
      <SecondaryButton>add another admin</SecondaryButton>

      <p className="mt-2"></p>
      <Label htmlFor="image">Select image</Label>
      <br />
      <ImageUpload
        id="image"
        setFile={(file) => setData({ ...data, image: file })}
      />

      <p className="mt-2"></p>
      <Button onClick={addSchool}>Add new school</Button>

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
