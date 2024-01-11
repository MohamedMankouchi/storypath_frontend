import React, { useState } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import { checkUser } from "../pages/Infopage";
import { Navigate, useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
const Login = () => {
  const { user } = useOutletContext();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("https://storypathapi.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.status == 400 || data.error) {
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
            title: data.message || data.error,
          });
          return;
        }
        setLoginData({ email: "", password: "" });
        setRegisterData({
          email: "",
          password: "",
          fullName: "",
        });
        const token = data.token;
        sessionStorage.setItem("token", token);
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
        window.location.href = "/profile";
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    fetch("https://storypathapi.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 400 || data.error) {
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
            title: data.message || data.error,
          });
          return;
        }
        setLoginData({ email: "", password: "" });
        setRegisterData({
          email: "",
          password: "",
          fullName: "",
        });
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
          icon: "success",
          title: data.message,
        });
      });
  };

  return (
    <div>
      {user ? (
        <Navigate to={"/profile"} />
      ) : (
        <>
          {" "}
          <h1 style={{ marginBottom: "50px" }}>Aanmelden</h1>
          <form typeof="submit" method="POST">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <Form.Control
                placeholder="Email"
                name="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Wachtwoord</InputGroup.Text>
              <Form.Control
                placeholder="Wachtwoord"
                type="password"
                name="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </InputGroup>
            <br></br>
            <Button variant="primary" type="submit" onClick={handleLogin}>
              Aanmelden
            </Button>
          </form>
          <hr style={{ marginBottom: "50px", marginTop: "50px" }} />
          <h1 style={{ marginBottom: "50px", marginTop: "50px" }}>
            Registratie
          </h1>
          <form typeof="submit" method="POST">
            <InputGroup className="mb-3">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  Naam + Voornaam
                </InputGroup.Text>
                <Form.Control
                  placeholder="Naam + Voornaam"
                  name="fullName"
                  value={registerData.fullName}
                  onChange={(e) =>
                    setRegisterData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Form.Control
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Wachtwoord</InputGroup.Text>
                <Form.Control
                  placeholder="Wachtwoord"
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </InputGroup>
            </InputGroup>
            {alert}
            <br></br>
            <Button
              variant="primary"
              type="submit"
              className="mb-5"
              onClick={handleRegister}
            >
              Registreer
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
