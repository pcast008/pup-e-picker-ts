import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog } from "../types";
import { Requests } from "../api";

type MyState = {
  dogs: Dog[];
  isLoading: boolean;
  activePage: string;
};

export class ClassApp extends Component {
  state: MyState = {
    dogs: [],
    isLoading: false,
    activePage: "",
  };

  getFavoritedDogs = () => {
    return this.state.dogs.filter((dog) => dog.isFavorite);
  };

  getUnfavoritedDogs = () => {
    return this.state.dogs.filter((dog) => dog.isFavorite === false);
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    Requests.getAllDogs()
      .then((dogs) => {
        this.setState({ dogs: dogs });
      })
      .catch((e) => {
        alert(e.message);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  setIsLoading = (isLoading: boolean) => {
    this.setState({ isLoading: isLoading });
  };

  setActivePage = (activePage: string) => {
    this.setState({ activePage: activePage });
  };

  setDogs = (dogs: string) => {
    this.setState({ dogs: dogs });
  };

  RenderedDogs = () => {
    switch (this.state.activePage) {
      case "favorited":
        return (
          <ClassDogs
            data={this.getFavoritedDogs()}
            isLoading={this.state.isLoading}
            setIsLoading={this.setIsLoading}
            setDogs={this.setDogs}
          />
        );
      case "unfavorited":
        return (
          <ClassDogs
            data={this.getUnfavoritedDogs()}
            isLoading={this.state.isLoading}
            setIsLoading={this.setIsLoading}
            setDogs={this.setDogs}
          />
        );
      case "createDog":
        return (
          <ClassCreateDogForm
            isLoading={this.state.isLoading}
            setIsLoading={this.setIsLoading}
            setDogs={this.setDogs}
          />
        );
      default:
        return (
          <ClassDogs
            data={this.state.dogs}
            isLoading={this.state.isLoading}
            setIsLoading={this.setIsLoading}
            setDogs={this.setDogs}
          />
        );
    }
  };

  render() {
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          favoritedDogs={this.getFavoritedDogs()}
          unfavoritedDogs={this.getUnfavoritedDogs()}
          activePage={this.state.activePage}
          setActivePage={this.setActivePage}
        >
          {this.RenderedDogs()}
        </ClassSection>
        {/* should be inside of the ClassSection component using react children */}
      </div>
    );
  }
}
