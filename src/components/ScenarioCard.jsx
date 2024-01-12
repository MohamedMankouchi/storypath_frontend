import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, NavLink, useOutletContext } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";

export const ScenarioCard = (scenarios) => {
  const { data } = scenarios;
  const { user } = useOutletContext();
  const handleDelete = (id) => {
    fetch(`https://storypathapi.onrender.com/scenario/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.status != 200) {
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
        await Toast.fire({
          icon: "success",
          title: data.message,
        });
        window.location.reload();
      });
  };
  return (
    <div>
      {data.map((el) => (
        <Card className="mt-3 mb-3" key={el.id}>
          <Card.Body>
            <Card.Title>{el.title}</Card.Title>
            <Card.Text>
              {" "}
              <div dangerouslySetInnerHTML={{ __html: el.description }}></div>
            </Card.Text>
            <Link to={`/scenarios/${el.id}`}>
              <Button variant="primary">Naar scenario</Button>
            </Link>

            {user.role == "Admin" || user.role == "Teacher" ? (
              <>
                <Link to={`/editScenario/${el.id}`}>
                  <Button style={{ marginLeft: "20px" }} variant="warning">
                    Wijzig scenario
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    Swal.fire({
                      title: "Ben jij zeker?",
                      text: "Deze actie is onomkeerbaar",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Ja, verwijder!",
                      cancelButtonText: "Nee",
                      showLoaderOnConfirm: true,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDelete(el.id);
                      }
                    });
                  }}
                  style={{ marginLeft: "20px" }}
                  variant="danger"
                >
                  Verwijder scenario
                </Button>
              </>
            ) : (
              ""
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
