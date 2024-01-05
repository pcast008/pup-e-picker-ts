import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { CreateDog, Dog, DogFunction, activePage } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type MyState = {
  dogs: Dog[];
  isLoading: boolean;
  activePage: activePage;
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

  favoriteDog: DogFunction = (dog) => {
    this.setIsLoading(true);
    return Requests.updateDog(dog.id, true)
      .then(() => {
        Requests.getAllDogs().then(this.setDogs);
      })
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  unfavoriteDog: DogFunction = (dog) => {
    this.setIsLoading(true);
    return Requests.updateDog(dog.id, false)
      .then(() => {
        Requests.getAllDogs().then(this.setDogs);
      })
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  createDog: CreateDog = (dog) => {
    this.setIsLoading(true);
    return Requests.postDog({
      name: dog.name,
      description: dog.description,
      image: dog.image,
    })
      .then((response) => {
        if (typeof response === "string") {
          toast.error(response);
        } else {
          toast.success("Dog Created!");
          Requests.getAllDogs().then(this.setDogs);
        }
      })
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  deleteDog: DogFunction = (dog) => {
    this.setIsLoading(true);
    return Requests.deleteDog(dog.id)
      .then(() => {
        Requests.getAllDogs().then(this.setDogs);
      })
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  refetchDogs = () => {
    this.setState({ isLoading: true });
    return Requests.getAllDogs()
      .then((dogs) => {
        this.setState({ dogs: dogs });
      })
      .catch((e) => {
        alert(e.message);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  componentDidMount() {
    this.refetchDogs();
  }

  setIsLoading = (isLoading: boolean) => {
    this.setState({ isLoading: isLoading });
  };

  setActivePage = (activePage: activePage) => {
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
            />
          )}

          {this.state.activePage !== "createDog" && (
            <ClassDogs
              dogs={filteredDogs}
              isLoading={this.state.isLoading}
              deleteDog={this.deleteDog}
              favoriteDog={this.favoriteDog}
              unfavoriteDog={this.unfavoriteDog}
            />
          )}
        </ClassSection>
        {/* should be inside of the ClassSection component using react children */}
      </div>
    );
  }
}
