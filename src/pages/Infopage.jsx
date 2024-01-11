import React, { createContext, useEffect, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Home from "../components/Home";

export async function checkUser() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return false;
  }
  const res = await fetch("https://storypathapi.onrender.com/profile", {
    headers: {
      "Content-type": "application/json",
      token: token,
    },
  });
  const data = await res.json();

  if (data.error) {
    sessionStorage.clear();
    return false;
  }
  return data;
}

function InfoPage() {
  const user = useLoaderData();
  return (
    <div id="main">
      <div className="d-flex" id="wrapper">
        <Sidebar user={user} />
        <div id="page-content-wrapper" className="mx-5 mt-5">
          <Outlet context={user} />
        </div>
      </div>
    </div>
  );
}

export default InfoPage;
