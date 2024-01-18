// Add your own custom types in here
export type Dog = {
  id: number;
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
};

export type CreateDogDTO = Omit<Dog, "id" | "isFavorite">;

// export type SetDogs = (dogs: Dog[]) => void;

export type ActivePage = "all" | "favorited" | "unfavorited" | "createDog";

// export type CreateDogFn = (dog: CreateDogDTO) => Promise<unknown>;

// export type DogFunction = (input: Dog) => Promise<string | number>;
