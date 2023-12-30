import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { useEffect, useState } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

export function FunctionalApp() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState("");

  const favoritedDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoritedDogs = dogs.filter((dog) => dog.isFavorite === false);

  useEffect(() => {
    setIsLoading(true);
    Requests.getAllDogs()
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
  }, []);

  const RenderedDogs = () => {
    switch (activePage) {
      case "favorited":
        return (
          <FunctionalDogs
            data={favoritedDogs}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setDogs={setDogs}
          />
        );
      case "unfavorited":
        return (
          <FunctionalDogs
            data={unfavoritedDogs}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setDogs={setDogs}
          />
        );
      case "createDog":
        return (
          <FunctionalCreateDogForm
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setDogs={setDogs}
          />
        );
      default:
        return (
          <FunctionalDogs
            data={dogs}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setDogs={setDogs}
          />
        );
    }
  };

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
        <RenderedDogs />
      </FunctionalSection>
    </div>
  );
}
