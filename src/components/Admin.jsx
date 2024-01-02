import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useOutletContext } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
export const Admin = () => {
  const [userList, setUserList] = useState([
    { id: "", fullName: "", email: "" },
  ]);
  const [show, setShow] = useState(false);

  const [userData, setUserData] = useState({
    password: "",
    fullName: "",
    email: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = (el) => {
    setUserData(el);
    setShow(true);
  };

  const { user } = useOutletContext();

  const handleUpdate = () => {
    fetch(`https://storypathapi.onrender.com/users/${userData.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        userid: user.id,
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.status == 400 || data.status == 400) {
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
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("https://storypathapi.onrender.com/users", {
      headers: {
        "Content-type": "application/json",
        userid: user.id,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 403 || data.status == 404) {
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
        const filteredArray = data.data.filter((el) => el.role != user.role);
        setUserList(filteredArray);
        setIsLoading(false);
      });
  }, []);
  const handleDelete = (userid) => {
    fetch(`https://storypathapi.onrender.com/profile/${userid}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        userid: user.id,
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.status == 403 || data.status == 404) {
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
      <hr className="mb-3 mt-4" />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wijzig gebruikers informatie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form.Control
            type="text"
            className="mb-4 mt-5"
            value={userData.fullName}
            name="fullName"
            placeholder="Naam + Voornaam"
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <Form.Control
            className="mb-4"
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
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
      <h1 className="mb-3">Lijst gebruikers</h1>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          {" "}
          <Table striped bordered hover size="xl">
            <thead>
              <tr>
                <th>Naam + Voornaam</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Wijzig informatie</th>
              </tr>
            </thead>
            <tbody>
              {userList?.map((el) => (
                <tr key={el.id}>
                  <td>{el.fullName}</td>
                  <td>{el.email}</td>
                  <td>{el.role}</td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Button onClick={() => handleShow(el)} variant="primary">
                      Wijzig
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(el.id)}
                    >
                      Verwijder
                    </Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};
