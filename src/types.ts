// Add your own custom types in here
export type Dog = {
  id: number;
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
};

export type DogForCreate = {
  name: string;
  image: string;
  description: string;
};

export type SetDogs = (dogs: Dog[]) => void;

export type activePage = "all" | "favorited" | "unfavorited" | "createDog";

export type CreateDog = (dog: DogForCreate) => Promise<unknown>;

export type DogFunction = (input: Dog) => Promise<unknown>;
