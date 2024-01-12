import { CreateDogDTO, Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: async (): Promise<string | Dog[]> => {
    const response = await fetch(`${baseUrl}/dogs`);

    if (!response.ok) {
      const error = new Error("Error occurred getting dogs.");
      return error.message;
    } else {
      return response.json();
    }
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: async (dog: CreateDogDTO) => {
    const response = await fetch(`${baseUrl}/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: dog.name,
        image: dog.image,
        description: dog.description,
        isFavorite: false,
      }),
    });

    if (!response.ok) {
      const err = new Error("Error occurred creating dog.");
      return err.message;
    } else {
      return response.status;
    }
  },

  // should delete a dog from the database
  deleteDog: async (id: number) => {
    const response = await fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const err = new Error("Error occurred deleting dog.");
      return err.message;
    } else {
      return response.status;
    }
  },

  updateDog: async (id: number, isFavorite: boolean) => {
    const response = await fetch(`${baseUrl}/dogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isFavorite: isFavorite,
      }),
    });

    if (!response.ok) {
      const err = new Error("Error occurred updating dog.");
      return err.message;
    } else {
      return response.status;
    }
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    // console.log("dummy stuff");
    // Requests.updateDog(17, false);
    // Requests.deleteDog(18);
  },
};
