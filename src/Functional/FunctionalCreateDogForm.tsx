import { dogPictures } from "../dog-pictures";
import { useState } from "react";
import { CreateDogDTO } from "../types";
import toast from "react-hot-toast";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  isLoading,
  createDog,
}: {
  isLoading: boolean;
  createDog: (dog: CreateDogDTO) => Promise<unknown>;
}) => {
  const [dogName, setDogName] = useState("");
  const [dogDescription, setDogDescription] = useState("");
  const [dogImage, setDogImage] = useState(defaultSelectedImage);

  const resetForm = () => {
    setDogName("");
    setDogDescription("");
    setDogImage(defaultSelectedImage);
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        createDog({
          name: dogName,
          description: dogDescription,
          image: dogImage,
        })
          .then(() => {
            toast.success("Dog created!");
            resetForm();
          })
          .catch(() => {
            toast.error("Error creating dog.");
          });
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
        style={{
          opacity: isLoading ? 0.5 : 1,
          cursor: isLoading ? "not-allowed" : "",
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
        style={{
          opacity: isLoading ? 0.5 : 1,
          cursor: isLoading ? "not-allowed" : "",
        }}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        value={dogImage}
        onChange={(e) => {
          setDogImage(e.target.value);
          console.log(e.target.value);
        }}
        style={{
          opacity: isLoading ? 0.5 : 1,
          cursor: isLoading ? "not-allowed" : "",
        }}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
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
