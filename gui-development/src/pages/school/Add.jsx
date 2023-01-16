import { useState } from "react";
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

export default function AddSchool() {
  useUpdateTitle("Add new school");
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    admin: [],
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});
  useLoading(loading);

  const addSchool = async () => {
    if (
      isEmpty(data.name) ||
      isEmpty(data.email) ||
      isEmpty(data.phone) ||
      isEmpty(data.address) ||
      data.admin.length === 0
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

    try {
      setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
      <TextInput
        id="phone"
        value={data.phone}
        onInput={(e) => setData({ ...data, phone: e.target.value })}
      />

      <Label htmlFor="description">Description </Label>
      <Textarea
        id="description"
        defaultValue={data.description}
        onInput={(e) => setData({ ...data, description: e.target.value })}
      />

      <Label htmlFor="email">Email</Label>
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
      <ImageUpload id="image" />

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
