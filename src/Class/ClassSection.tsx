// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog, activePage } from "../types";

type MyProps = {
  children: ReactNode;
  favoritedDogs: Dog[];
  unfavoritedDogs: Dog[];
  activePage: activePage;
  setActivePage: (activePage: activePage) => void;
};

export class ClassSection extends Component<MyProps> {
  render() {
    const {
      children,
      favoritedDogs,
      unfavoritedDogs,
      activePage,
      setActivePage,
    } = this.props;

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={`selector ${
                activePage === "favorited" ? "active" : ""
              }`}
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
              className={`selector ${
                activePage === "createDog" ? "active" : ""
              }`}
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
  }
}
