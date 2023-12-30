import { DogForCreate } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: () => {
    return fetch(`${baseUrl}/dogs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error occurred getting data...");
        } else {
          return response.json();
        }
      })
      .catch((e) => {
        return e.message;
      });
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: (dog: DogForCreate) => {
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
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error occurred creating new dog.");
        } else {
          return response.json();
        }
      })
      .catch((e) => {
        return e.message;
      });
  },

  // should delete a dog from the database
  deleteDog: (id: number) => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error occurred deleting dog.");
        } else {
          return response.json();
        }
      })
      .catch((e) => {
        return e.message;
      });
  },

  updateDog: (id: number, isFavorite: boolean) => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isFavorite: isFavorite,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error occurred updating dog");
        } else {
          return response.json();
        }
      })
      .catch((e) => {
        return e.message;
      });
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    // console.log("dummy stuff");
    // Requests.updateDog(17, false);
    // Requests.deleteDog(18);
    Requests.postDog({
      name: "test",
      description: "test",
      image: "/assets/dalmation.png",
    }).then((response) => {
      console.log(response);
    });
  },
};
