import { SignNavBar } from "../shared/SignNavBar/SignNavBar.js";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Registration.css";
import ModelViewer from "../threeD/Modelrenderer";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [flag, setFlag] = useState(false);
  const [registration, setRegistration] = useState(false);
  const history2 = useHistory();

  function handleFormSubmit(e) {
    e.preventDefault();

    if(!name || !email || !password) {
      setFlag(true);
    } else {
      setFlag(false);
      const registerdata = {
        name: name,
        email: email,
        password: password,
      };
      const requestOptions = {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerdata),
      };

      console.log(registerdata);
      fetch("http://localhost:8080/register", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if(data.message == 'User already Present'){
            console.log(data);
            setRegistration(true);
          }
          else{
            console.log(data)
            setRegistration(false);
            history2.push("/Login");
          }
        });
    }
  }

  function navigateToLogin() {
    history2.push("/Login");
  }

  return (
    <>
      <div>
        <SignNavBar />
      </div>
      <div className="swatch1">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="gridStyle">
        <div
          style={{
            margin: "90px",
            backgroundColor: "rgba(25, 0, 155, 0.3)",
            padding: "20px",
            width: "500px",
          }}
        >
          <form onSubmit={handleFormSubmit}>
            <h3 style={{ color: "white" }}>Register</h3>
            <div className="form-group">
              <label style={{ color: "white" }}>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Full Name"
                name="name"
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label style={{ color: "white" }}>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label style={{ color: "white" }}>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <button
              style={{
                background:
                  "radial-gradient(523px at 7.1% 19.3%, rgb(147, 15, 255) 2%, rgb(5, 49, 255) 100.7%)",
              }}
              type="submit"
              className="btn btn-dark btn-lg btn-block"
            >
              Register
            </button>
            {registration && (
              <div className="alert alert-danger" role="alert">
                User already registered
              </div>
            )}
            <p
              style={{ color: "white" }}
              onClick={navigateToLogin}
              className="forgot-password text-right"
            >
              Already registered log in?
            </p>
            {flag && (
              <Alert color="primary" variant="danger">
                ALL FIELDS ARE MANDATORY
              </Alert>
            )}
          </form>
        </div>
        <div id="threedcomp" style={{ width: "640px", height: "640px" }}>
          <ModelViewer scale="0.09" modelPath={"minecraft4.glb"} />
        </div>
      </div>
    </>
  );
}

export default Registration;
