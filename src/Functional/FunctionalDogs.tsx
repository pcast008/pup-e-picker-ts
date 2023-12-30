import { DogCard } from "../Shared/DogCard";
// import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { Requests } from "../api";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  data,
  isLoading,
  setIsLoading,
}: {
  data: Dog[];
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}) => {
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {data.map((dog) => {
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
              setIsLoading(true);
              Requests.deleteDog(dog.id).finally(() => {
                setIsLoading(false);
              });
            }}
            onHeartClick={() => {
              //   alert("clicked heart");
              setIsLoading(true);
              Requests.updateDog(dog.id, !dog.isFavorite).finally(() => {
                setIsLoading(false);
              });
            }}
            onEmptyHeartClick={() => {
              //   alert("clicked empty heart");
              setIsLoading(true);
              Requests.updateDog(dog.id, !dog.isFavorite).finally(() => {
                setIsLoading(false);
              });
            }}
            isLoading={isLoading}
          />
        );
      })}
    </>
  );
};
