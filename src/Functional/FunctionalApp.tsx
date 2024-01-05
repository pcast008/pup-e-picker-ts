import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { useEffect, useState } from "react";
import { CreateDog, Dog, DogFunction, activePage } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

export function FunctionalApp() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState<activePage>("all");

  const favoritedDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoritedDogs = dogs.filter((dog) => dog.isFavorite === false);

  const createDog: CreateDog = (dog) => {
    setIsLoading(true);
    return Requests.postDog(dog)
      .then((response) => {
        if (typeof response === "string") {
          toast.error(response);
        } else {
          toast.success("Dog Created!");
          Requests.getAllDogs().then(setDogs);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const unfavoriteDog: DogFunction = (input) => {
    setIsLoading(true);
    return Requests.updateDog(input.id, false)
      .then(() => {
        Requests.getAllDogs().then(setDogs);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const favoriteDog: DogFunction = (input) => {
    setIsLoading(true);
    return Requests.updateDog(input.id, true)
      .then(() => {
        Requests.getAllDogs().then(setDogs);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteDog: DogFunction = (dog) => {
    setIsLoading(true);
    return Requests.deleteDog(dog.id)
      .then(() => {
        Requests.getAllDogs().then(setDogs);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const refetchDogs = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((dogs) => {
        setDogs(dogs);
        setIsLoading(false);
      })
      .catch((e) => {
        alert(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    refetchDogs();
  }, []);

  const filteredDogs = dogs.filter((dog) => {
    switch (activePage) {
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
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        favoritedDogs={favoritedDogs}
        unfavoritedDogs={unfavoritedDogs}
        activePage={activePage}
        setActivePage={setActivePage}
      >
        {activePage === "createDog" && (
          <FunctionalCreateDogForm
            isLoading={isLoading}
            createDog={createDog}
          />
        )}

        {activePage !== "createDog" && (
          <FunctionalDogs
            dogs={filteredDogs}
            isLoading={isLoading}
            deleteDog={deleteDog}
            favoriteDog={favoriteDog}
            unfavoriteDog={unfavoriteDog}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
