import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { useEffect, useState } from "react";
import { CreateDogFn, Dog, DogFunction, ActivePage } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

export function FunctionalApp() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState<ActivePage>("all");

  const favoritedDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoritedDogs = dogs.filter((dog) => dog.isFavorite === false);

  const createDog: CreateDogFn = async (dog) => {
    setIsLoading(true);
    const response = await Requests.postDog(dog);
    typeof response !== "string" && (await refetchDogs());
    return response;
  };

  const unfavoriteDog: DogFunction = async (input) => {
    setIsLoading(true);
    const response = await Requests.updateDog(input.id, false);
    typeof response !== "string" && (await refetchDogs());
    return response;
  };

  const favoriteDog: DogFunction = async (input) => {
    setIsLoading(true);
    const response = await Requests.updateDog(input.id, true);
    typeof response !== "string" && (await refetchDogs());
    return response;
  };

  const deleteDog: DogFunction = async (dog) => {
    setIsLoading(true);
    const response = await Requests.deleteDog(dog.id);
    typeof response !== "string" && (await refetchDogs());
    return response;
  };

  const refetchDogs = async () => {
    const response = await Requests.getAllDogs();
    typeof response === "string" ? toast.error(response) : setDogs(response);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    refetchDogs().catch(() => {
      toast.error("Server error.");
      setIsLoading(false);
    });
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
            setIsLoading={setIsLoading}
          />
        )}

        {activePage !== "createDog" && (
          <FunctionalDogs
            dogs={filteredDogs}
            isLoading={isLoading}
            deleteDog={deleteDog}
            favoriteDog={favoriteDog}
            unfavoriteDog={unfavoriteDog}
            setIsLoading={setIsLoading}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
