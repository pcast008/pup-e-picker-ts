// you can use this type for react children if you so choose
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog, ActivePage } from "../types";

export const FunctionalSection = ({
  children,
  favoritedDogs,
  unfavoritedDogs,
  activePage,
  setActivePage,
}: {
  children: ReactNode;
  favoritedDogs: Dog[];
  unfavoritedDogs: Dog[];
  activePage: ActivePage;
  setActivePage: (input: ActivePage) => void;
}) => {
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${activePage === "favorited" ? "active" : ""}`}
            onClick={() => {
              activePage === "favorited"
                ? setActivePage("all")
                : setActivePage("favorited");
            }}
          >
            favorited ( {favoritedDogs.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              activePage === "unfavorited" ? "active" : ""
            }`}
            onClick={() => {
              activePage === "unfavorited"
                ? setActivePage("all")
                : setActivePage("unfavorited");
            }}
          >
            unfavorited ( {unfavoritedDogs.length} )
          </div>
          <div
            className={`selector ${activePage === "createDog" ? "active" : ""}`}
            onClick={() => {
              activePage === "createDog"
                ? setActivePage("all")
                : setActivePage("createDog");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
