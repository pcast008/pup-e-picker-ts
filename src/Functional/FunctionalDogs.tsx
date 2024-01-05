import { DogCard } from "../Shared/DogCard";
import { Dog, DogFunction } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  dogs,
  isLoading,
  deleteDog,
  favoriteDog,
  unfavoriteDog,
}: {
  dogs: Dog[];
  isLoading: boolean;
  deleteDog: DogFunction;
  favoriteDog: DogFunction;
  unfavoriteDog: DogFunction;
}) => {
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {dogs.map((dog) => {
        return (
          <DogCard
            dog={{
              id: dog.id,
              image: dog.image,
              description: dog.description,
              isFavorite: dog.isFavorite,
              name: dog.name,
            }}
            key={dog.id}
            onTrashIconClick={() => {
              //   alert("clicked trash");
              deleteDog(dog);
            }}
            onHeartClick={() => {
              //   alert("clicked heart");
              unfavoriteDog(dog);
            }}
            onEmptyHeartClick={() => {
              //   alert("clicked empty heart");
              favoriteDog(dog);
            }}
            isLoading={isLoading}
          />
        );
      })}
    </>
  );
};
