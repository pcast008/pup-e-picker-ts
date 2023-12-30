import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import toast from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

type MyProps = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

type MyState = {
  dogName: string;
  dogDescription: string;
  dogImage: string;
};

export class ClassCreateDogForm extends Component<MyProps> {
  state: MyState = {
    dogName: "",
    dogDescription: "",
    dogImage: "",
  };

  resetForm = () => {
    this.setState({
      dogName: "",
      dogDescription: "",
      dogImage: "",
    });
  };

  render() {
    const { isLoading, setIsLoading } = this.props;
    const { dogName, dogDescription, dogImage } = this.state;

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          setIsLoading(true);
          Requests.postDog({
            name: this.state.dogName,
            description: this.state.dogDescription,
            image: this.state.dogImage,
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
          this.resetForm();
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
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          value={dogImage}
          onChange={(e) => {
            this.setState({ dogImage: e.target.value });
          }}
          disabled={isLoading}
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
