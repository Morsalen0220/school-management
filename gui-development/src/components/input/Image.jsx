import { useState } from "react";

export default function ImageUpload({ ...props }) {
  const [file, setFile] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const updateImage = (e) => {
    if (e.target.files.length === 0) return;
    setFile(e.target.value);
  };
  return (
    <div>
      <input
        type="file"
        accept="image/jpeg,image/png,image/gif"
        className="bg-gray-50 w-full border-2 outline-none cursor-pointer rounded-sm"
        defaultValue={file}
        onChange={updateImage}
        {...props}
      />
      {previewImage !== "" && <img src={previewImage} alt="preview" />}
    </div>
  );
}
