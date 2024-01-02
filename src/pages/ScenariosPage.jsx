import {
  Outlet,
  useLoaderData,
  Link,
  useOutletContext,
  Navigate,
} from "react-router-dom";
import { getScenarios } from "../services/scenarios";

export async function loader() {
  const data = await getScenarios();
  return { data };
}

const ScenariosPage = () => {
  const { data } = useLoaderData();
  const user = useOutletContext();
  return (
    <div>
      {!user ? (
        <Navigate to={"/login"} />
      ) : (
        <>
          {" "}
          <div className="row">
            <p>Kies hier je gewenste interactieve leerpad</p>
            {data.scenarios.map((e) => (
              <div className="col-2 me-2" key={`button${e.id}`}>
                <Link to={`/scenarios/${e.id}`}>
                  <button
                    className={`btn ${
                      e.finished ? "btn-success" : "btn-primary"
                    }`}
                  >
                    {e.title}
                  </button>
                </Link>
              </div>
            ))}
          </div>
          <br></br>
          <hr></hr>
          {/* the current scene */}
          <Outlet context={user} />
        </>
      )}
    </div>
  );
};

export default ScenariosPage;
