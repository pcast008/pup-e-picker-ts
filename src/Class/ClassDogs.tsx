import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog, DogFunction } from "../types";
import toast from "react-hot-toast";

type MyProps = {
  dogs: Dog[];
  isLoading: boolean;
  deleteDog: DogFunction;
  favoriteDog: DogFunction;
  unfavoriteDog: DogFunction;
  setIsLoading: (value: boolean) => void;
};
// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<MyProps> {
  render() {
    const {
      dogs,
      isLoading,
      deleteDog,
      favoriteDog,
      unfavoriteDog,
      setIsLoading,
    } = this.props;

    return (
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
                // alert("clicked trash");
                deleteDog(dog)
                  .then((response) => {
                    if (typeof response === "string") {
                      toast.error(response);
                      setIsLoading(false);
                    }
                  })
                  .catch(() => {
                    toast.error("Server error.");
                    setIsLoading(false);
                  });
              }}
              onHeartClick={() => {
                // alert("clicked heart");
                unfavoriteDog(dog)
                  .then((response) => {
                    if (typeof response === "string") {
                      toast.error(response);
                      setIsLoading(false);
                    }
                  })
                  .catch(() => {
                    toast.error("Server error.");
                    setIsLoading(false);
                  });
              }}
              onEmptyHeartClick={() => {
                // alert("clicked empty heart");
                favoriteDog(dog)
                  .then((response) => {
                    if (typeof response === "string") {
                      toast.error(response);
                      setIsLoading(false);
                    }
                  })
                  .catch(() => {
                    toast.error("Server error.");
                    setIsLoading(false);
                  });
              }}
              isLoading={isLoading}
            />
          );
        })}
      </>
    );
  }
}
