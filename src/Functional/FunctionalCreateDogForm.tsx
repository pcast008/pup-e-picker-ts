import { dogPictures } from "../dog-pictures";
import { useState } from "react";
import { Requests } from "../api";
import toast from "react-hot-toast";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}) => {
  const [dogName, setDogName] = useState("");
  const [dogDescription, setDogDescription] = useState("");
  const [dogImage, setDogImage] = useState("");

  const resetForm = () => {
    setDogName("");
    setDogDescription("");
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        setIsLoading(true);
        Requests.postDog({
          name: dogName,
          description: dogDescription,
          image: dogImage,
        })
          .then((response) => {
            if (typeof response === "string") {
              toast.error(response);
            } else {
              toast.success("Dog Created!");
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
        resetForm();
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={isLoading}
        value={dogName}
        onChange={(e) => {
          setDogName(e.target.value);
        }}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={isLoading}
        value={dogDescription}
        onChange={(e) => {
          setDogDescription(e.target.value);
        }}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        value={dogImage}
        onChange={(e) => {
          setDogImage(e.target.value);
        }}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option
              defaultValue={defaultSelectedImage}
              value={pictureValue}
              key={pictureValue}
            >
              {label}
            </option>
          );
        })}
      </select>
      <input
        type="submit"
        style={{
          opacity: isLoading ? 0.5 : 1,
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
        disabled={isLoading}
      />
    </form>
  );
};
