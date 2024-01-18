import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog, ActivePage, CreateDogDTO } from "../types";
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

  favoriteDog = (dog: Dog): Promise<unknown> => {
    this.setIsLoading(true);
    return Requests.updateDog(dog.id, true)
      .then(this.refetchDogs)
      .catch(() => {
        toast.error("Error favoriting dog.");
      })
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  unfavoriteDog = async (dog: Dog): Promise<unknown> => {
    this.setIsLoading(true);
    return Requests.updateDog(dog.id, false)
      .then(this.refetchDogs)
      .catch(() => {
        toast.error("Error unfavoriting dog.");
      })
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  createDog = (dog: CreateDogDTO): Promise<unknown> => {
    this.setIsLoading(true);
    return Requests.postDog(dog)
      .then(() => {
        return this.refetchDogs();
      })
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  deleteDog = (dog: Dog): Promise<unknown> => {
    this.setIsLoading(true);
    return Requests.deleteDog(dog.id)
      .then(this.refetchDogs)
      .catch(() => {
        toast.error("Error deleting dog.");
      })
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  refetchDogs = () => {
    this.setIsLoading(true);
    return Requests.getAllDogs()
      .then((res) => this.setDogs(res))
      .catch(() => {
        toast.error("Error getting dogs.");
      })
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  componentDidMount() {
    this.refetchDogs();
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
