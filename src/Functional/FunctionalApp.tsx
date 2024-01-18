import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { useEffect, useState } from "react";
import { Dog, ActivePage, CreateDogDTO } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

export function FunctionalApp() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState<ActivePage>("all");

  const favoritedDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoritedDogs = dogs.filter((dog) => dog.isFavorite === false);

  const createDog = (dog: CreateDogDTO): Promise<unknown> => {
    setIsLoading(true);
    return Requests.postDog(dog)
      .then(() => {
        return refetchDogs();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const unfavoriteDog = (dog: Dog): Promise<unknown> => {
    setIsLoading(true);
    return Requests.updateDog(dog.id, false)
      .then(refetchDogs)
      .catch(() => {
        toast.error("Error unfavoriting dog.");
      })
      .finally(() => setIsLoading(false));
  };

  const favoriteDog = (dog: Dog): Promise<unknown> => {
    setIsLoading(true);
    return Requests.updateDog(dog.id, true)
      .then(refetchDogs)
      .catch(() => {
        toast.error("Error favoriting dog.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteDog = (dog: Dog): Promise<unknown> => {
    setIsLoading(true);
    return Requests.deleteDog(dog.id)
      .then(refetchDogs)
      .catch(() => {
        toast.error("Error deleting dog.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const refetchDogs = (): Promise<unknown> => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((res) => setDogs(res))
      .catch(() => {
        toast.error("Error getting dogs.");
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
