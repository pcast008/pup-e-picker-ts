import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { CreateDogFn } from "../types";
import toast from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

type MyProps = {
  isLoading: boolean;
  createDog: CreateDogFn;
  setIsLoading: (value: boolean) => void;
};

type MyState = {
  dogName: string;
  dogDescription: string;
  dogImage: string;
};

export class ClassCreateDogForm extends Component<MyProps, MyState> {
  state = {
    dogName: "",
    dogDescription: "",
    dogImage: defaultSelectedImage,
  };

  resetForm = () => {
    this.setState({
      dogName: "",
      dogDescription: "",
      dogImage: defaultSelectedImage,
    });
  };

  render() {
    const { isLoading, createDog, setIsLoading } = this.props;
    const { dogName, dogDescription, dogImage } = this.state;

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
            .then((response) => {
              if (typeof response === "string") {
                toast.error(response);
                setIsLoading(false);
              } else {
                toast.success("Dog created!");
                this.resetForm();
              }
            })
            .catch(() => {
              toast.error("Server error.");
              setIsLoading(false);
            });
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          value={dogName}
          onChange={(e) => {
            this.setState({ dogName: e.target.value });
          }}
          disabled={isLoading}
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
          value={dogDescription}
          onChange={(e) => {
            this.setState({ dogDescription: e.target.value });
          }}
          disabled={isLoading}
          style={{
            opacity: isLoading ? 0.5 : 1,
            cursor: isLoading ? "not-allowed" : "",
          }}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          value={dogImage}
          onChange={(e) => {
            this.setState({ dogImage: e.target.value });
          }}
          disabled={isLoading}
          style={{
            opacity: isLoading ? 0.5 : 1,
            cursor: isLoading ? "not-allowed" : "",
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
  }
}
