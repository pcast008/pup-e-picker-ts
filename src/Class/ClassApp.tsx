import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { CreateDogFn, Dog, DogFunction, ActivePage } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type MyState = {
  dogs: Dog[];
  isLoading: boolean;
  activePage: ActivePage;
};

export class ClassApp extends Component<Record<string, never>, MyState> {
  state: MyState = {
    dogs: [],
    isLoading: false,
    activePage: "all",
  };

  getFavoritedDogs = () => {
    return this.state.dogs.filter((dog) => dog.isFavorite);
  };

  getUnfavoritedDogs = () => {
    return this.state.dogs.filter((dog) => dog.isFavorite === false);
  };

  favoriteDog: DogFunction = async (dog) => {
    this.setIsLoading(true);
    const response = await Requests.updateDog(dog.id, true);
    typeof response !== "string" && (await this.refetchDogs());
    return response;
  };

  unfavoriteDog: DogFunction = async (dog) => {
    this.setIsLoading(true);
    const response = await Requests.updateDog(dog.id, false);
    typeof response !== "string" && (await this.refetchDogs());
    return response;
  };

  createDog: CreateDogFn = async (dog) => {
    this.setIsLoading(true);
    const response = await Requests.postDog(dog);
    typeof response !== "string" && (await this.refetchDogs());
    return response;
  };

  deleteDog: DogFunction = async (dog) => {
    this.setIsLoading(true);
    const response = await Requests.deleteDog(dog.id);
    typeof response !== "string" && (await this.refetchDogs());
    return response;
  };

  refetchDogs = async () => {
    this.setState({ isLoading: true });
    const response = await Requests.getAllDogs();
    typeof response === "string"
      ? toast.error(response)
      : this.setDogs(response);
    this.setIsLoading(false);
  };

  componentDidMount() {
    this.setIsLoading(true);
    this.refetchDogs().catch(() => {
      toast.error("Server error.");
      this.setIsLoading(false);
    });
  }

  setIsLoading = (isLoading: boolean) => {
    this.setState({ isLoading: isLoading });
  };

  setActivePage = (activePage: ActivePage) => {
    this.setState({ activePage: activePage });
  };

  setDogs = (dogs: Dog[]) => {
    this.setState({ dogs: dogs });
  };

  render() {
    const filteredDogs = this.state.dogs.filter((dog) => {
      switch (this.state.activePage) {
        case "all":
          return true;
        case "favorited":
          return dog.isFavorite;
        case "unfavorited":
          return !dog.isFavorite;
        case "createDog":
          return false;
      }
    });

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
          {this.state.activePage === "createDog" && (
            <ClassCreateDogForm
              isLoading={this.state.isLoading}
              createDog={this.createDog}
              setIsLoading={this.setIsLoading}
            />
          )}

          {this.state.activePage !== "createDog" && (
            <ClassDogs
              dogs={filteredDogs}
              isLoading={this.state.isLoading}
              deleteDog={this.deleteDog}
              favoriteDog={this.favoriteDog}
              unfavoriteDog={this.unfavoriteDog}
              setIsLoading={this.setIsLoading}
            />
          )}
        </ClassSection>
        {/* should be inside of the ClassSection component using react children */}
      </div>
    );
  }
}
