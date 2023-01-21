import { useState } from "react";
import Label from "./Label";

export default function ImageUpload({ setFile, ...props }) {
  const [previewImage, setPreviewImage] = useState("");
  const updateImage = (e) => {
    const [file] = e.target.files;
    setFile(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage("");
    }
  };
  return (
    <div>
      <input
        type="file"
        accept="image/jpeg,image/png,image/gif"
        className="bg-gray-50 w-full border-2 outline-none cursor-pointer rounded-sm"
        onChange={updateImage}
        {...props}
      />
      {previewImage && (
        <>
          <Label>Preview</Label>
          <div className="p-2 border-2 mt-2 rounded-sm">
            <img src={previewImage} alt="preview" />
          </div>
        </>
      )}
    </div>
  );
}
