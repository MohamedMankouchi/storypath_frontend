import { NavLink, Link } from "react-router-dom";

const Sidebar = (user) => {
  return (
    <div className="border-end bg-white" id="sidebar-wrapper">
      <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
        <div className="sidebar-heading border-bottom bg-light">
          Interactieve leerpaden
        </div>
      </Link>
      <div className="list-group list-group-flush">
        {user.user ? (
          <>
            <NavLink
              to={"/scenarios"}
              className="list-group-item list-group-item-action list-group-item-bold p-3"
              key={"scenarios"}
            >
              Scenario's
            </NavLink>
            <NavLink
              to={"/profile"}
              className="list-group-item list-group-item-action list-group-item-bold p-3"
              key={"profile"}
            >
              Mijn profiel{" "}
            </NavLink>
          </>
        ) : (
          <NavLink
            to={"/login"}
            className="list-group-item list-group-item-action list-group-item-bold p-3"
            key={"Aanmelden"}
          >
            Aanmelden{" "}
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
