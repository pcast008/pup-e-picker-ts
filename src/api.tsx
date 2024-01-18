import { CreateDogDTO } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: () => {
    return fetch(`${baseUrl}/dogs`).then((res) => {
      if (!res.ok) {
        throw new Error("Error occurred getting dogs.");
      } else {
        return res.json();
      }
    });
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: (dog: CreateDogDTO): Promise<unknown> => {
    return fetch(`${baseUrl}/dogs`, {
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
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Error occurred creating dog.");
      } else {
        return res;
      }
    });
  },

  // should delete a dog from the database
  deleteDog: (id: number): Promise<unknown> => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Error occurred deleting dog.");
      } else {
        return res;
      }
    });
  },

  updateDog: (id: number, isFavorite: boolean): Promise<unknown> => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isFavorite: isFavorite,
      }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Error occurred updating dog.");
      } else {
        return res;
      }
    });
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    // console.log("dummy stuff");
    // Requests.updateDog(17, false);
    // Requests.deleteDog(18);
  },
};
