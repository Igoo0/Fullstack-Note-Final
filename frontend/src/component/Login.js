import React, { useState } from "react";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../utils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/login", { username, password });
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/notes");  // navigasi ke frontend route /notes
    } catch (error) {
      if (error.response) setMsg(error.response.data.msg);
      else setMsg("Gagal login");
    }
  };

  return (
    <section className="hero is-fullheight is-fullwidth has-background-light">
      <div className="hero-body">
        <div className="container">
          <div className="box" style={{ maxWidth: "400px", margin: "auto" }}>
            <h1 className="title has-text-centered">Login</h1>

            {msg && <p className="has-text-danger has-text-centered">{msg}</p>}

            <form onSubmit={Auth}>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="field is-grouped is-grouped-centered mt-5">
                <div className="control">
                  <button type="submit" className="button is-link">
                    Login
                  </button>
                </div>
                <div className="control">
                  <button
                    type="button"
                    className="button is-light"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
