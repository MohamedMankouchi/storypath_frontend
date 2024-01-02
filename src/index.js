import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InfoPage, { checkUser } from "./pages/Infopage";
import ErrorPage from "./pages/ErrorPage";
import Scenario, {
  loader as ScenarioLoader,
} from "./components/Scenario/Scenario";
import Goals, { loader as GoalLoader } from "./components/Goals";
import Theory, { loader as TheoryLoader } from "./components/Theory";

import ScenariosPage, {
  loader as ScenariosLoader,
} from "./pages/ScenariosPage";
import Home from "./components/Home";
import Login from "./components/Login";
import { Profile } from "./pages/Profile";
import { EditScenario, getScenario } from "./components/EditScenario";
import { MakeScenario } from "./components/MakeScenario";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <InfoPage />,
      errorElement: <ErrorPage />,
      loader: checkUser,
      
      children: [
        {
          path: "/home",
          element: <Home />,
        },

        {
          path: "/login",
          element: <Login />,
        },

        {
          path: "/profile",
          element: <Profile />,
        },

        {
          path: "/editScenario/:id",
          element: <EditScenario />,
          loader: getScenario,
        },

        {
          path: "/makeScenario/:steps",
          element: <MakeScenario />,
        },

        {
          path: "/doelstellingen",
          element: <Goals />,
          loader: GoalLoader,
        },
        {
          path: "/theorie",
          element: <Theory />,
          loader: TheoryLoader,
        },
        {
          path: "/scenarios",
          element: <ScenariosPage />,
          loader: ScenariosLoader,
          children: [
            {
              path: "/scenarios/:id",
              element: <Scenario />,
              loader: ScenarioLoader,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/",
  }
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
