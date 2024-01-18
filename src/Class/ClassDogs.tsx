import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";

type MyProps = {
  dogs: Dog[];
  isLoading: boolean;
  deleteDog: (dog: Dog) => Promise<unknown>;
  favoriteDog: (dog: Dog) => Promise<unknown>;
  unfavoriteDog: (dog: Dog) => Promise<unknown>;
};
// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<MyProps> {
  render() {
    const { dogs, isLoading, deleteDog, favoriteDog, unfavoriteDog } =
      this.props;

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
                deleteDog(dog);
              }}
              onHeartClick={() => {
                // alert("clicked heart");
                unfavoriteDog(dog);
              }}
              onEmptyHeartClick={() => {
                // alert("clicked empty heart");
                favoriteDog(dog);
              }}
              isLoading={isLoading}
            />
          );
        })}
      </>
    );
  }
}
