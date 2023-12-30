import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Requests } from "../api";
import { Dog } from "../types";

type MyProps = {
  data: Dog[];
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setDogs: (dogs: Dog[]) => void;
};
// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<MyProps> {
  render() {
    const { data, isLoading, setIsLoading, setDogs } = this.props;

    return (
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
              key={2}
              onTrashIconClick={() => {
                // alert("clicked trash");
                setIsLoading(true);
                Requests.deleteDog(dog.id)
                  .then(() => {
                    Requests.getAllDogs().then(setDogs);
                  })
                  .finally(() => {
                    setIsLoading(false);
                  });
              }}
              onHeartClick={() => {
                // alert("clicked heart");
                setIsLoading(true);
                Requests.updateDog(dog.id, false)
                  .then(() => {
                    Requests.getAllDogs().then(setDogs);
                  })
                  .finally(() => {
                    setIsLoading(false);
                  });
              }}
              onEmptyHeartClick={() => {
                // alert("clicked empty heart");
                setIsLoading(true);
                Requests.updateDog(dog.id, true)
                  .then(() => {
                    Requests.getAllDogs().then(setDogs);
                  })
                  .finally(() => {
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
