import { useEffect, useState } from "react";
import { UploadIcon } from "../icons/index";

interface ActivityImageInputProps {
  isFormSent?: boolean;
}

function ActivityImageInput({ isFormSent }: ActivityImageInputProps) {
  const [imagePreview, setImagePreview] = useState<any>("");

  useEffect(() => {
    if (isFormSent) setImagePreview("");
  }, [isFormSent]);

  const onActivityImagePhotoUpload = (event: any) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-center w-[calc(50vw-1rem)]">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col justify-center items-center w-full h-[calc(20vh-1rem)] bg-white rounded-[20px] border-[1px] border-cerBlue cursor-pointer "
      >
        {imagePreview === "" ? (
          <div className="flex flex-col justify-center items-center pt-5 pb-6">
            <UploadIcon />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Faça upload</span> de imagens aqui
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
        ) : (
          <img
            src={imagePreview}
            className="flex justify-center items-center w-full h-full"
          />
        )}
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          name="image"
          accept=".jpeg, .png, .jpg"
          src={imagePreview}
          onChange={onActivityImagePhotoUpload}
        />
      </label>
    </div>
  );
}

export default ActivityImageInput;
