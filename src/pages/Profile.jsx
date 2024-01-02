import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Navigate, Outlet, redirect, useOutletContext } from "react-router-dom";
import { Teacher } from "../components/Teacher";
import { ScenarioProfile } from "../components/ScenarioProfile";
import { Admin } from "../components/Admin";
import Swal from "sweetalert2";
export const Profile = () => {
  const { user } = useOutletContext();
  const [show, setShow] = useState(false);

  const [userData, setUserData] = useState({
    password: "",
  });

  useEffect(() => {
    setUserData({
      fullName: user?.fullName,
      email: user?.email,
      password: user?.password,
    });
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdate = () => {
    fetch(`https://storypathapi.onrender.com/profile/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.status == 400) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "error",
            title: data.error,
          });
          return;
        }

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        await Toast.fire({
          icon: "success",
          title: data.message,
        });
        window.location.reload();
      });
  };
  return (
    <div>
      {!user ? (
        <Navigate to={"/login"} />
      ) : (
        <>
          {" "}
          <h1 className="mb-4">Mijn Profiel</h1>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Wijzig jouw wachtwoord</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <Form.Control
                className="mb-4"
                type="password"
                placeholder="Wachtwoord"
                name="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Sluiten
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Wijzig
              </Button>
            </Modal.Footer>
          </Modal>
          <label htmlFor="fullName">Naam + Voornaam</label>
          <Form.Control
            id="fullName"
            type="text"
            className="mb-4 mt-2"
            placeholder={user.fullName}
            disabled
            readOnly
          />
          <label htmlFor="email">Email</label>
          <Form.Control
            id="email"
            className="mb-4 mt-2"
            type="text"
            placeholder={user.email}
            disabled
            readOnly
          />
          <label htmlFor="password">Wachtwoord</label>
          <Form.Control
            className="mb-4 mt-2"
            id="password"
            type="text"
            placeholder={userData.password}
            disabled
            readOnly
          />
          <Button
            style={{ marginRight: "20px" }}
            variant="primary"
            onClick={handleShow}
          >
            Wijzig wachtwoord{" "}
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Afmelden
          </Button>
          {user.role == "Teacher" ? (
            <Teacher />
          ) : user.role == "Admin" ? (
            <Admin />
          ) : (
            ""
          )}
          <hr className="mb-3 mt-4" />
          <ScenarioProfile {...user} />
        </>
      )}
    </div>
  );
};
