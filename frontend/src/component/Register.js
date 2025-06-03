import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../utils";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const RegisterUser = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", { username, password });
      navigate("/");
    } catch (error) {
      if (error.response) setMsg(error.response.data.msg);
      else setMsg("Gagal registrasi");
    }
  };

  return (
    <section className="hero is-fullheight is-fullwidth has-background-light">
      <div className="hero-body">
        <div className="container">
          <div className="box" style={{ maxWidth: "400px", margin: "auto" }}>
            <h1 className="title has-text-centered">Register</h1>

            {msg && <p className="has-text-danger has-text-centered">{msg}</p>}

            <form onSubmit={RegisterUser}>
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
                    Register
                  </button>
                </div>
                <div className="control">
                  <button
                    type="button"
                    className="button is-light"
                    onClick={() => navigate("/")}
                  >
                    Back to Login
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

export default Register;
