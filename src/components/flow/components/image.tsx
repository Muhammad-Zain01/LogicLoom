import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MdAddPhotoAlternate, MdDelete } from "react-icons/md";

const Image = ({ id }: { id: string }) => {
  const imageId = `${id}|image`;
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem(imageId);
    if (savedImage) {
      setImage(savedImage);
    }
  }, [imageId]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        localStorage.setItem(imageId, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    localStorage.removeItem(imageId);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      {image ? (
        <div className="relative w-full h-full">
          <div className="flex absolute w-full justify-end">
            <MdDelete onClick={handleDeleteImage} className="cursor-pointer" />
          </div>
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-full object-contain"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <label htmlFor={`image-upload-${id}`} className="cursor-pointer">
            <div className="flex items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center p-8">
                <MdAddPhotoAlternate className="mx-auto h-6 w-6 text-gray-400" />
                <p className="mt-1 text-sm text-gray-600">
                  Click to upload image
                </p>
              </div>
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id={`image-upload-${id}`}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default Image;
