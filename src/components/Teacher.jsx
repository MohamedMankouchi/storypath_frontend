import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button, Form, Modal } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";

export const Teacher = () => {
  const [studentList, setStudentList] = useState([
    { id: "", fullName: "", email: "" },
  ]);
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({
    id: "",
    fullName: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = (el) => {
    setUserData(el);
    setShow(true);
  };
  useEffect(() => {
    fetch("https://storypathapi.onrender.com/students", {
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 500 || data.status == 404) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
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
        setStudentList(data.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <hr className="mb-3 mt-4" />

      <h1 className="mb-3">Lijst studenten</h1>
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
              </tr>
            </thead>
            <tbody>
              {studentList?.map((el) => (
                <tr key={el.id}>
                  <td>{el.fullName}</td>
                  <td>{el.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};
